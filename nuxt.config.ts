import removeConsole from 'vite-plugin-remove-console';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			link: [
				{ rel: 'icon', href: '/favicon.ico' }
			],
			noscript: [
				{ children: 'Javascript is required.' }
			],
			title: ''
		},
		keepalive: true
	},
	experimental: {
		payloadExtraction: false
	},
	modules: [
		'@vueuse/nuxt',
		'nuxt-purgecss'
	],
	nitro: {
		compressPublicAssets: true
	},
	purgecss: {
		enabled: true,
		safelist: {
			deep: [],
			standard: [
				'body',
				'html'
			]
		}
	},
	ssr: false,
	typescript: {
		tsConfig: {
			compilerOptions: {
				noImplicitOverride: true,
				noUncheckedIndexedAccess: true,
				noUnusedLocals: true,
				noUnusedParameters: true
			}
		},
		typeCheck: true
	},
	vite: {
		build: {
			chunkSizeWarningLimit: 1024
		},
		plugins: [
			removeConsole()
		],
		server: {
			hmr: {
				clientPort: Number(process.env.HMR_CLIENT_PORT) || undefined,
				path: process.env.HMR_PATH,
				port: Number(process.env.HMR_PORT) || undefined,
				protocol: process.env.HMR_PROTOCOL
			}
		}
	}
});
