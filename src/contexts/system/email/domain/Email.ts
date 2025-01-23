import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { EmailAddress } from "../../../shared/domain/EmailAddress";
import { EmailHTMLBody } from "./EmailHTMLBody";
import { EmailId } from "./EmailId";
import { EmailSubject } from "./EmailSubject";
import { EmailTextBody } from "./EmailTextBody";

export abstract class Email extends AggregateRoot {
	protected constructor(
		protected readonly id: EmailId,
		protected readonly from: EmailAddress,
		protected readonly to: EmailAddress,
		protected readonly subject: EmailSubject,
		protected readonly html: EmailHTMLBody,
		protected readonly text: EmailTextBody
	) {
		super();
	}

	abstract toPrimitives(): Record<string, unknown>;
}
