<template>
	<div class="form-wrap">
		<Logo mini :dark="isDark" class="mb-4" />
		<div class="title mb-4">{{ title }}</div>
		<div class="text mb-12">
			Today is a new day. It's your day. You shape it. Sign in to start managing your projects.
		</div>

		<div class="form">
			<transition name="form-fade" mode="out-in" appear>
				<SignIn v-if="typeRef === 'signin'" key="signin" @forgot-password="gotoForgotPassword()" />
				<ForgotPassword v-else-if="typeRef === 'forgotpassword'" key="forgotpassword" />
				<SignUp v-else-if="typeRef === 'signup'" key="signup" />
			</transition>
		</div>

		<n-divider title-placement="center">Or</n-divider>

		<div class="social-btns mb-12 flex flex-col gap-4">
			<n-button strong secondary size="large">
				<template #icon>
					<img alt="google-icon" src="@/assets/images/google-icon.svg?url" />
				</template>
				<span class="px-2">Sign in with Google</span>
			</n-button>
			<n-button strong secondary size="large">
				<template #icon>
					<img alt="facebook-icon" src="@/assets/images/facebook-icon.svg?url" />
				</template>
				<span class="px-2">Sign in with Facebook</span>
			</n-button>
		</div>

		<div class="sign-text text-center">
			<div v-if="typeRef === 'signin'" class="sign-text">
				Don't you have an account?
				<n-button text type="primary" size="large" @click="gotoSignUp()">Sign up</n-button>
			</div>
			<div v-if="typeRef === 'forgotpassword'" class="sign-text">
				<n-button text type="primary" size="large" @click="gotoSignIn()">Back to Sign in</n-button>
			</div>
			<div v-if="typeRef === 'signup'" class="sign-text">
				Do you have an account?
				<n-button text type="primary" size="large" @click="gotoSignIn()">Sign in</n-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { FormType } from "./types.d"
import Logo from "@/app-layouts/common/Logo.vue"
import { useThemeStore } from "@/stores/theme"
import { NButton, NDivider } from "naive-ui"
import { computed, onBeforeMount, ref } from "vue"
import { useRouter } from "vue-router"
import ForgotPassword from "./ForgotPassword.vue"
import SignIn from "./SignIn.vue"
import SignUp from "./SignUp.vue"

const props = defineProps<{
	type?: FormType
	useOnlyRouter?: boolean
}>()

const typeRef = ref<FormType>("signin")
const router = useRouter()
const themeStore = useThemeStore()
const isDark = computed<boolean>(() => themeStore.isThemeDark)
const title = computed<string>(() =>
	typeRef.value === "signin" ? "Welcome Back" : typeRef.value === "signup" ? "Hello" : "Forgot Password"
)

function gotoSignIn() {
	if (!props.useOnlyRouter) {
		typeRef.value = "signin"
	}
	router.replace({ name: "Login" })
}

function gotoSignUp() {
	if (!props.useOnlyRouter) {
		typeRef.value = "signup"
	}
	router.replace({ name: "Register" })
}

function gotoForgotPassword() {
	if (!props.useOnlyRouter) {
		typeRef.value = "forgotpassword"
	}
	router.replace({ name: "ForgotPassword" })
}

onBeforeMount(() => {
	if (props.type) {
		typeRef.value = props.type
	}
})
</script>

<style lang="scss" scoped>
.form-wrap {
	width: 100%;
	min-width: 270px;
	max-width: 400px;

	.logo {
		:deep(img) {
			max-height: 37px;
		}
	}

	.title {
		font-size: 36px;
		font-family: var(--font-family-display);
		line-height: 1.2;
		font-weight: 700;
	}
	.text {
		font-size: 18px;
		line-height: 1.3;
		color: var(--fg-secondary-color);
	}

	.social-btns {
		img {
			display: block;
			height: 20px;
		}
	}
}

.form-fade-enter-active,
.form-fade-leave-active {
	transition:
		opacity 0.2s ease-in-out,
		transform 0.3s ease-in-out;
}
.form-fade-enter-from {
	opacity: 0;
	transform: translateX(10px);
}
.form-fade-leave-to {
	opacity: 0;
	transform: translateX(-10px);
}
</style>
