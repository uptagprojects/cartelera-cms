import amqplib from "amqplib";
import { Service } from "diod";

export type Settings = {
	username: string;
	password: string;
	vhost: string;
	connection: {
		hostname: string;
		port: number;
	};
};

@Service()
export class RabbitMQConnection {
	private amqpConnection?: amqplib.Connection;
	private amqpChannel?: amqplib.ConfirmChannel;
	private readonly settings: Settings = {
		username: process.env.RABBITMQ_USERNAME ?? "cartelera",
		password: process.env.RABBITMQ_PASSWORD ?? "cartelera",
		vhost: process.env.RABBITMQ_VHOST ?? "/",
		connection: {
			hostname: process.env.RABBITMQ_HOSTNAME ?? "localhost",
			port: parseInt(process.env.RABBITMQ_PORT ?? "5672", 10)
		}
	};

	async connect(): Promise<void> {
		this.amqpConnection = await this.amqpConnect();
		this.amqpChannel = await this.amqpChannelConnect();
	}

	async close(): Promise<void> {
		await this.channel().close();
		await this.connection().close();
	}

	async publish(
		exchange: string,
		routingKey: string,
		content: Buffer,
		options: amqplib.Options.Publish
	): Promise<void> {
		if (!this.amqpChannel) {
			await this.connect();
		}

		return new Promise<void>((resolve: Function, reject: Function) => {
			this.channel().publish(exchange, routingKey, content, options, (error: unknown) =>
				error ? reject(error) : resolve()
			);
		});
	}

	async declareQueue(name: string, exchangeName: string, bindingKeys: string[]): Promise<void> {
		await this.channel().assertQueue(name, {
			exclusive: false,
			durable: true,
			autoDelete: false
		});

		await Promise.all(
			bindingKeys.map(bindingKey => this.channel().bindQueue(name, exchangeName, bindingKey))
		);
	}

	async declareExchange(name: string): Promise<void> {
		await this.channel().assertExchange(name, "topic", { durable: true });
	}

	private connection(): amqplib.Connection {
		if (!this.amqpConnection) {
			throw new Error("RabbitMQ connection not established");
		}

		return this.amqpConnection;
	}

	private channel(): amqplib.ConfirmChannel {
		if (!this.amqpChannel) {
			throw new Error("RabbitMQ channel not established");
		}

		return this.amqpChannel;
	}

	private async amqpConnect(): Promise<amqplib.Connection> {
		const connection = await amqplib.connect({
			protocol: "amqp",
			hostname: this.settings.connection.hostname,
			port: this.settings.connection.port,
			username: this.settings.username,
			password: this.settings.password,
			vhost: this.settings.vhost
		});

		connection.on("error", (error: unknown) => {
			// TO DO: Add logger
			throw error;
		});

		return connection;
	}

	private async amqpChannelConnect(): Promise<amqplib.ConfirmChannel> {
		const channel = await this.connection().createConfirmChannel();
		await channel.prefetch(1);

		return channel;
	}
}
