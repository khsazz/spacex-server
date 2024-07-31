// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	modules: ['@pinia/nuxt', '@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],
	axios: {
		baseURL: '/'
	},
	tailwindcss: {
		cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
		configPath: 'tailwind.config',
		exposeConfig: {
			level: 2
		},
		config: {},
		viewer: false
	},
	eslint: {
		lintOnStart: false
	}
});
