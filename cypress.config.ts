import { defineConfig } from "cypress"

export default defineConfig({
	component: {
		devServer: {
			framework: "nuxt",
			bundler: "webpack"
		}
	},
	e2e: {
		specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
		baseUrl: "http://localhost:3000"
	}
})
