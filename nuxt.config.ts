import type { NuxtPage } from "nuxt/schema"
import process from "node:process"
import { pagesGenerateExclude } from "./pages-exclude"
import { pagesExtend } from "./pages-extend"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		"@pinia/nuxt",
		"pinia-plugin-persistedstate/nuxt",
		"@nuxtjs/i18n",
		"@nuxtjs/device",
		"nuxt-svgo",
		"@nuxtjs/tailwindcss",
		"@nuxt/test-utils/module",
		"nuxtjs-naive-ui",
		"@nuxt/eslint"
	],
	app: {
		rootId: "app"
	},
	eslint: {
		config: {
			standalone: false
		}
	},
	components: [
		{
			path: "~/components/common",
			pathPrefix: false
		}
	],
	svgo: {
		defaultImport: "component"
	},
	i18n: {
		vueI18n: "./i18n.config.ts"
	},
	piniaPluginPersistedstate: {
		key: "__persisted__%id"
	},
	build: {
		transpile:
			process.env.NODE_ENV === "production"
				? ["naive-ui", "vueuc", "@css-render/vue3-ssr", "@juggle/resize-observer", "date-fns"]
				: ["@juggle/resize-observer"]
	},
	vite: {
		vue: {
			script: {
				defineModel: true
			}
		},
		optimizeDeps: {
			include:
				/* eslint no-mixed-spaces-and-tabs: "off" */
				process.env.NODE_ENV === "development"
					? ["naive-ui", "vueuc", "date-fns-tz/formatInTimeZone", "fast-deep-equal"]
					: ["fast-deep-equal"]
		},
		css: {
			preprocessorOptions: {
				scss: {
					silenceDeprecations: ["legacy-js-api", "import"],
					api: "modern-compiler"
				}
			}
		}
	},
	hooks: {
		"pages:extend": (pages: NuxtPage[]) => pagesExtend(pages)
	},
	nitro: {
		prerender: {
			ignore: pagesGenerateExclude,
			routes: ["/"]
		}
	},
	compatibilityDate: "2024-11-07"
})
