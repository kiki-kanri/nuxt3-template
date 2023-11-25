import removeConsole from 'vite-plugin-remove-console';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			link: [{ rel: 'icon', href: '/favicon.ico' }],
			noscript: [{ children: 'Javascript is required.' }],
			title: ''
		},
		keepalive: true
	},
	devServer: {
		host: process.env.DEV_SERVER_HOST,
		port: Number(process.env.DEV_SERVER_PORT) || undefined
	},
	devtools: { enabled: false },
	experimental: {
		headNext: true,
		inlineSSRStyles: false
	},
	imports: {
		dirs: ['./composables/**/*.ts']
	},
	modules: [
		'@unocss/nuxt',
		'@vueuse/nuxt',
		'nuxt-purgecss'
	],
	nitro: { compressPublicAssets: true },
	purgecss: {
		enabled: true,
		safelist: {
			deep: [],
			standard: [
				/-(appear|enter|leave)(|-(active|from|to))$/,
				/--unocss--/,
				/-\[\S+\]/,
				/.*data-v-.*/,
				/:deep/,
				/:global/,
				/:slotted/,
				/^(?!cursor-move).+-move$/,
				/^nuxt-link(|-exact)-active$/,
				/__uno_hash_(\w{6})/,
				'__nuxt',
				'body',
				'html',
				'nuxt-progress'
			]
		}
	},
	ssr: true,
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
		plugins: [removeConsole()]
	}
});
