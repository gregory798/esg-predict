<template>
	<n-form ref="formRef" :model="model" :rules="rules">
		<n-form-item path="email" label="Email">
			<n-input v-model:value="model.email" size="large" placeholder="Example@email.com" @keydown.enter="signUp" />
		</n-form-item>
		<n-form-item path="password" label="Password">
			<n-input
				v-model:value="model.password"
				type="password"
				size="large"
				show-password-on="click"
				placeholder="At least 8 characters"
				@keydown.enter="signUp"
			/>
		</n-form-item>
		<n-form-item path="confirmPassword" label="Confirm Password" first>
			<n-input
				v-model:value="model.confirmPassword"
				type="password"
				:disabled="!model.password"
				size="large"
				show-password-on="click"
				placeholder="At least 8 characters"
				@keydown.enter="signUp"
			/>
		</n-form-item>
		<div class="flex flex-col items-end">
			<div class="w-full">
				<n-button type="primary" class="!w-full" size="large" @click="signUp">Create an account</n-button>
			</div>
		</div>
	</n-form>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth"
import {
	type FormInst,
	type FormItemRule,
	type FormRules,
	type FormValidationError,
	NButton,
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
	confirmPassword: string | null
}

const router = useRouter()
const formRef = ref<FormInst | null>(null)
const message = useMessage()
const model = ref<ModelType>({
	email: "admin@admin.com",
	password: "password",
	confirmPassword: "password"
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
	],
	confirmPassword: [
		{
			required: true,
			trigger: ["blur"],
			message: "confirmPassword is required"
		},
		{
			validator: (rule: FormItemRule, value: string): boolean => {
				return value === model.value.password
			},
			message: "Password is not same as re-entered password!",
			trigger: ["blur", "password-input"]
		}
	]
}

const authStore = useAuthStore()

function signUp(e: Event) {
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
