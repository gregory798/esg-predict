<template>
	<n-form ref="formRef" :model="model" :rules="rules">
		<n-form-item path="email" label="Email">
			<n-input
				v-model:value="model.email"
				placeholder="Example@email.com"
				size="large"
				autocomplete="on"
				@keydown.enter="signIn"
			/>
		</n-form-item>
		<n-form-item path="password" label="Password">
			<n-input
				v-model:value="model.password"
				type="password"
				show-password-on="click"
				placeholder="At least 8 characters"
				autocomplete="on"
				size="large"
				@keydown.enter="signIn"
			/>
		</n-form-item>
		<div class="flex flex-col items-end gap-6">
			<div class="flex w-full justify-between">
				<n-checkbox size="large">Remember me</n-checkbox>
				<n-button text type="primary" @click="emit('forgot-password')">Forgot Password?</n-button>
			</div>
			<div class="w-full">
				<n-button type="primary" class="!w-full" size="large" @click="signIn">Sign in</n-button>
			</div>
		</div>
	</n-form>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth"
import {
	type FormInst,
	type FormRules,
	type FormValidationError,
	NButton,
	NCheckbox,
	NForm,
	NFormItem,
	NInput,
	useMessage
} from "naive-ui"
import { ref } from "vue"
import { useRouter } from "vue-router"

interface ModelType {
	email: string | null
	password: string | null
}

const emit = defineEmits<{
	(e: "forgot-password"): void
}>()

const router = useRouter()
const formRef = ref<FormInst | null>(null)
const message = useMessage()
const model = ref<ModelType>({
	email: "admin@admin.com",
	password: "password"
})

const rules: FormRules = {
	email: [
		{
			required: true,
			trigger: ["blur"],
			message: "Email is required"
		}
	],
	password: [
		{
			required: true,
			trigger: ["blur"],
			message: "Password is required"
		}
	]
}

const authStore = useAuthStore()

function signIn(e: Event) {
	e.preventDefault()
	formRef.value?.validate((errors: Array<FormValidationError> | undefined) => {
		if (!errors) {
			if (model.value.email === "admin@admin.com" && model.value.password === "password") {
				authStore.setLogged()
				router.push({ path: "/", replace: true })
			} else {
				message.error("Invalid credentials")
			}
		} else {
			message.error("Invalid credentials")
		}
	})
}
</script>
