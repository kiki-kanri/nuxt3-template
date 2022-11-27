import removeConsole from 'vite-plugin-remove-console';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			link: [
				{ rel: 'icon', href: '/favicon.svg' }
			],
			noscript: [
				{ children: 'Javascript is required.' }
			]
		},
		keepalive: true
	},
	compression: {
		viteCompression: {
			algorithm: 'gzip',
			threshold: 513
		}
	},
	css: [
	],
	imports: {
		dirs: [
			'composables',
			'composables/*/*.{ts,js,mjs,mts}'
		]
	},
	modules: [
		'@averjs/nuxt-compression',
		'nuxt-purgecss'
	],
	purgecss: {
		enabled: true,
		safelist: {
			deep: [
			],
			standard: [
			]
		}
	},
	ssr: false,
	vite: {
		build: {
			chunkSizeWarningLimit: 1024,
			manifest: false,
			rollupOptions: {
				output: {
					manualChunks: {
					}
				}
			},
			ssr: false
		},
		plugins: [
			removeConsole()
		]
	}
});
