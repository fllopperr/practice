<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

definePageMeta({
	layout: 'public'
})

const router = useRouter()
const authStore = useAuthStore()

const name = ref('Мария Смирнова')
const company = ref('АО «Вектор»')
const email = ref('0000@mail.demo')
const password = ref('••••••••••')
const errorMsg = ref('')

const handleRegister = async () => {
	errorMsg.value = ''
	try {
		await authStore.register({
			name: name.value,
			company: company.value,
			email: email.value,
			password: password.value
		})
		router.push('/requests')
	} catch (e: unknown) {
		errorMsg.value =
			(e as { statusMessage?: string })?.statusMessage || 'Ошибка регистрации'
	}
}
</script>

<template>
	<div
		class="self-stretch px-4 md:px-8 lg:px-16 py-16 flex flex-col justify-start items-center gap-6"
	>
		<form
			class="w-full md:w-[440px]"
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
			@submit.prevent="handleRegister"
		>
			<div
				class="text-[24px] leading-[31px] md:text-[28px] md:leading-[36px]"
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-family: Montserrat;
					font-weight: 700;
				"
			>
				Создать аккаунт
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
				Зарегистрируйтесь, чтобы отправлять заявки
			</div>

			<div
				class="w-full md:w-[392px]"
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
					for="reg-name"
					style="
						align-self: stretch;
						color: var(--color-text-primary, #e8e7ec);
						font-size: 12px;
						font-family: Montserrat;
						font-weight: 600;
						line-height: 16px;
					"
				>
					Имя
				</label>
				<input
					id="reg-name"
					v-model="name"
					type="text"
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
				class="w-full md:w-[392px]"
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
					for="reg-company"
					style="
						align-self: stretch;
						color: var(--color-text-primary, #e8e7ec);
						font-size: 12px;
						font-family: Montserrat;
						font-weight: 600;
						line-height: 16px;
					"
				>
					Компания
				</label>
				<input
					id="reg-company"
					v-model="company"
					type="text"
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
				class="w-full md:w-[392px]"
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
					for="reg-email"
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
					id="reg-email"
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
				class="w-full md:w-[392px]"
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
					for="reg-pass"
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
					id="reg-pass"
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

			<div
				v-if="errorMsg"
				style="color: #ff80a3; font-size: 12px; font-family: Montserrat"
			>
				{{ errorMsg }}
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
					Зарегистрироваться
				</span>
			</button>

			<NuxtLink
				to="/login"
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
				Уже есть аккаунт? Войти
			</NuxtLink>
		</form>
	</div>
</template>
