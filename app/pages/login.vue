<script setup lang="ts">
definePageMeta({
	layout: 'public'
})

const router = useRouter()
const email = ref('0000@mail.demo')
const password = ref('••••••••••')

const handleLogin = () => {
	router.push('/dashboard')
}
</script>

<template>
	<div
		class="self-stretch px-4 md:px-8 lg:px-16 py-16 flex flex-col justify-start items-center gap-6"
	>
		<form
			class="w-full md:w-96 lg:w-[440px] p-6 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default flex flex-col justify-start items-start gap-4"
			@submit.prevent="handleLogin"
		>
			<div
				class="self-stretch justify-start text-color-text-primary text-2xl md:text-3xl font-bold font-['Montserrat'] leading-8 md:leading-9"
			>
				С возвращением
			</div>
			<div
				class="self-stretch justify-start text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
			>
				Войдите для работы с заявками
			</div>

			<div
				class="self-stretch h-20 flex flex-col justify-start items-start gap-2"
			>
				<label
					for="login-email"
					class="self-stretch justify-start text-color-text-primary text-xs font-semibold font-['Montserrat'] leading-4"
				>
					Электронная почта
				</label>
				<input
					id="login-email"
					v-model="email"
					type="email"
					class="self-stretch w-full p-3.5 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default focus:outline-2 focus:outline-indigo-500 text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
				/>
			</div>

			<div
				class="self-stretch h-20 flex flex-col justify-start items-start gap-2"
			>
				<label
					for="login-pass"
					class="self-stretch justify-start text-color-text-primary text-xs font-semibold font-['Montserrat'] leading-4"
				>
					Пароль
				</label>
				<input
					id="login-pass"
					v-model="password"
					type="password"
					class="self-stretch w-full p-3.5 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default focus:outline-2 focus:outline-indigo-500 text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
				/>
			</div>

			<button
				type="submit"
				class="w-full md:w-auto h-10 px-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-sm inline-flex justify-center items-center gap-2 text-color-text-inverse text-sm font-medium font-['Montserrat'] leading-5 wf-focus-ring"
			>
				Войти
			</button>

			<NuxtLink
				to="/dashboard"
				class="self-stretch justify-start text-color-text-accent text-xs font-medium font-['Montserrat'] leading-4 hover:underline"
			>
				Нет аккаунта? Зарегистрироваться
			</NuxtLink>
		</form>
	</div>
</template>
