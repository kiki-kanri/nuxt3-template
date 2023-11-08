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
		host: process.env.DEV_SERVER_HOST,
		port: Number(process.env.DEV_SERVER_PORT) || undefined
	},
	devtools: {
		enabled: false
	},
	experimental: {
		headNext: true,
		inlineSSRStyles: false
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
			deep: [/-(enter|leave)-active/],
			standard: [
				'body',
				'html'
			]
		}
	},
	ssr: true,
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
		plugins: [
			removeConsole()
		]
	}
});
