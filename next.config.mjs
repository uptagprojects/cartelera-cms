/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve = {
				...config.resolve,
				fallback: {
					net: false,
					dns: false,
					tls: false,
					fs: false,
					request: false
				}
			};
		}

		return config;
	}
};

export default nextConfig;
