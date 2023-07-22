import removeConsole from 'vite-plugin-remove-console';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			link: [
				{ rel: 'icon', href: '/favicon.ico' },
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' }
			],
			noscript: [
				{ children: 'Javascript is required.' }
			],
			title: ''
		},
		keepalive: true
	},
	compression: {
		viteCompression: {
			algorithm: 'gzip',
			threshold: 513
		}
	},
	experimental: {
		payloadExtraction: false
	},
	modules: [
		'@averjs/nuxt-compression',
		'@vueuse/nuxt',
		'nuxt-purgecss'
	],
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
