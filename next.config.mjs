import { withAxiom } from 'next-axiom';

/** @type {import('next').NextConfig} */
let nextConfig = {
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

if(process.env.NODE_ENV === 'production') {
	nextConfig = withAxiom(nextConfig);
}

export default nextConfig;
