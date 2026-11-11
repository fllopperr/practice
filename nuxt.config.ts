export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss'],
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	future: {
		compatibilityVersion: 4
	},
	app: {
		head: {
			title: 'WorkFlow',
			htmlAttrs: { lang: 'ru' },
			meta: [
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
