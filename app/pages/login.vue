<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

definePageMeta({
	layout: 'public'
})

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const email = ref('0000@mail.demo')
const password = ref('••••••••••')
const showExpired = ref(
	route.query.expired === '1' || authStore.sessionExpiredBanner
)

const handleLogin = async () => {
	await authStore.login(email.value, password.value)
	router.push('/requests')
}

const onKeydown = (e: KeyboardEvent) => {
	const tag = (e.target as HTMLElement)?.tagName
	if (tag === 'INPUT' || tag === 'TEXTAREA') return
	if (e.key === '2') showExpired.value = !showExpired.value
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
	<div
		class="self-stretch px-4 md:px-8 lg:px-16 py-16 flex flex-col justify-start items-center gap: 6"
	>
		<form
			class="w-full md:w-96 lg:w-[440px]"
			style="
				padding: 24px;
				background: var(--color-bg-surface, #23204d);
				border-radius: 4px;
				outline: 1px var(--color-border-default, #413e74) solid;
				outline-offset: -1px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 16px;
				display: flex;
			"
			@submit.prevent="handleLogin"
		>
			<div
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 28px;
					font-family: Montserrat;
					font-weight: 700;
					line-height: 36px;
				"
			>
				С возвращением
			</div>
			<div
				style="
					align-self: stretch;
					color: var(--color-text-secondary, #b9b3d4);
					font-size: 14px;
					font-family: Montserrat;
					font-weight: 400;
					line-height: 20px;
				"
			>
				Войдите для работы с заявками
			</div>

			<div
				v-if="showExpired"
				style="
					align-self: stretch;
					padding: 24px;
					background: var(--color-bg-surface, #23204d);
					border-radius: 4px;
					outline: 1px var(--color-border-default, #413e74) solid;
					outline-offset: -1px;
					flex-direction: column;
					justify-content: flex-start;
					align-items: flex-start;
					gap: 16px;
					display: flex;
				"
			>
				<div
					style="
						align-self: stretch;
						color: var(--color-text-primary, #e8e7ec);
						font-size: 16px;
						font-family: Montserrat;
						font-weight: 600;
						line-height: 24px;
					"
				>
					Сессия истекла. Войдите снова, чтобы продолжить работу.
				</div>
			</div>

			<div
				class="w-full lg:w-[392px]"
				style="
					height: 80px;
					flex-direction: column;
					justify-content: flex-start;
					align-items: flex-start;
					gap: 8px;
					display: flex;
				"
			>
				<label
					for="login-email"
					style="
						align-self: stretch;
						color: var(--color-text-primary, #e8e7ec);
						font-size: 12px;
						font-family: Montserrat;
						font-weight: 600;
						line-height: 16px;
					"
				>
					Электронная почта
				</label>
				<input
					id="login-email"
					v-model="email"
					type="email"
					style="
						align-self: stretch;
						width: 100%;
						padding: 14px;
						background: var(--color-bg-surface, #23204d);
						border-radius: 4px;
						outline: 1px var(--color-border-default, #413e74) solid;
						outline-offset: -1px;
						color: var(--color-text-secondary, #b9b3d4);
						font-size: 14px;
						font-family: Montserrat;
						font-weight: 400;
						line-height: 20px;
					"
				/>
			</div>

			<div
				class="w-full lg:w-[392px]"
				style="
					height: 80px;
					flex-direction: column;
					justify-content: flex-start;
					align-items: flex-start;
					gap: 8px;
					display: flex;
				"
			>
				<label
					for="login-pass"
					style="
						align-self: stretch;
						color: var(--color-text-primary, #e8e7ec);
						font-size: 12px;
						font-family: Montserrat;
						font-weight: 600;
						line-height: 16px;
					"
				>
					Пароль
				</label>
				<input
					id="login-pass"
					v-model="password"
					type="password"
					style="
						align-self: stretch;
						width: 100%;
						padding: 14px;
						background: var(--color-bg-surface, #23204d);
						border-radius: 4px;
						outline: 1px var(--color-border-default, #413e74) solid;
						outline-offset: -1px;
						color: var(--color-text-secondary, #b9b3d4);
						font-size: 14px;
						font-family: Montserrat;
						font-weight: 400;
						line-height: 20px;
					"
				/>
			</div>

			<button
				type="submit"
				data-state="default"
				data-variant="primary"
				class="w-full md:w-auto"
				style="
					height: 40px;
					padding-left: 16px;
					padding-right: 16px;
					background: linear-gradient(90deg, #635bff 0%, #c548ab 100%);
					border-radius: 4px;
					justify-content: center;
					align-items: center;
					gap: 8px;
					display: inline-flex;
					cursor: pointer;
				"
			>
				<span
					style="
						color: var(--color-text-inverse, white);
						font-size: 14px;
						font-family: Montserrat;
						font-weight: 500;
						line-height: 20px;
					"
				>
					Войти
				</span>
			</button>

			<NuxtLink
				to="/register"
				style="
					align-self: stretch;
					color: var(--color-text-accent, #79cee8);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 500;
					line-height: 16px;
				"
				class="hover:underline"
			>
				Нет аккаунта? Зарегистрироваться
			</NuxtLink>
		</form>
	</div>
</template>
