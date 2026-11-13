export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	future: {
		compatibilityVersion: 4
	},
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
	ssr: true,
	routeRules: {
		'/': { ssr: true, swr: 3600 },
		'/faq': { ssr: true, swr: 3600 },
		'/help': { ssr: true, swr: 3600 },
		'/articles': { ssr: true, swr: 3600 },
		'/articles/**': { ssr: true, swr: 3600 },
		'/dashboard': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
		'/requests': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
		'/requests/**': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
		'/profile': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } }
	},
	app: {
		head: {
			titleTemplate: '%s',
			htmlAttrs: { lang: 'ru' },
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' }
			],
			link: [
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{
					rel: 'preconnect',
					href: 'https://fonts.gstatic.com',
					crossorigin: ''
				},
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Nunito+Sans:wght@400;600&display=swap'
				}
			]
		}
	}
})
