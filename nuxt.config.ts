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
	devServer: {
		host: process.env.SERVER_HOST,
		port: Number(process.env.SERVER_PORT) || undefined
	},
	devtools: {
		enabled: true
	},
	experimental: {
		payloadExtraction: false
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'@vueuse/nuxt',
		'nuxt-purgecss'
	],
	nitro: {
		compressPublicAssets: true
	},
	purgecss: {
		enabled: true,
		safelist: {
			deep: [
				/nuxt-devtools/
			],
			standard: [
				'body',
				'html'
			]
		}
	},
	ssr: false,
	tailwindcss: {},
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
		]
	}
});
