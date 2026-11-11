<script setup lang="ts">
import { useRequests } from '~/composable/useRequests'

const { density } = useRequests()
const name = ref('Данил Горбунов')
const email = ref('0000@mail.demo')
</script>

<template>
	<div
		class="self-stretch justify-start text-color-text-primary text-2xl md:text-3xl font-bold font-['Montserrat'] leading-8 md:leading-9"
	>
		Профиль
	</div>
	<div
		class="self-stretch justify-start text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
	>
		Ваши данные и настройки интерфейса
	</div>

	<div
		class="self-stretch p-6 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default flex flex-col justify-start items-start gap-4"
	>
		<div
			class="size-8 bg-color-bg-accent-soft rounded-[999px] inline-flex justify-center items-center"
		>
			<div
				class="justify-start text-color-text-accent text-xs font-semibold font-['Montserrat'] leading-4"
			>
				АК
			</div>
		</div>

		<div
			class="w-full md:w-[480px] h-20 flex flex-col justify-start items-start gap-2"
		>
			<label
				for="pr-name"
				class="self-stretch justify-start text-color-text-primary text-xs font-semibold font-['Montserrat'] leading-4"
			>
				Имя
			</label>
			<input
				id="pr-name"
				v-model="name"
				type="text"
				class="self-stretch w-full p-3.5 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default focus:outline-2 focus:outline-indigo-500 text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
			/>
		</div>

		<div
			class="w-full md:w-[480px] h-20 flex flex-col justify-start items-start gap-2"
		>
			<label
				for="pr-email"
				class="self-stretch justify-start text-color-text-primary text-xs font-semibold font-['Montserrat'] leading-4"
			>
				Электронная почта
			</label>
			<input
				id="pr-email"
				v-model="email"
				type="email"
				class="self-stretch w-full p-3.5 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default focus:outline-2 focus:outline-indigo-500 text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
			/>
		</div>

		<div
			class="self-stretch justify-start text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
		>
			Роль: оператор
		</div>

		<button
			type="button"
			class="w-full md:w-auto h-10 px-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-sm inline-flex justify-center items-center gap-2 text-color-text-inverse text-sm font-medium font-['Montserrat'] leading-5 wf-focus-ring"
		>
			Сохранить изменения
		</button>
	</div>

	<div
		class="self-stretch p-6 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default flex flex-col justify-start items-start gap-4"
	>
		<div
			class="self-stretch justify-start text-color-text-primary text-xl font-semibold font-['Montserrat'] leading-7"
		>
			Настройки интерфейса
		</div>
		<div
			class="w-full md:w-[480px] h-20 flex flex-col justify-start items-start gap-2"
		>
			<label
				for="pr-density"
				class="self-stretch justify-start text-color-text-primary text-xs font-semibold font-['Montserrat'] leading-4"
			>
				Плотность списка
			</label>
			<select
				id="pr-density"
				v-model="density"
				class="self-stretch w-full p-3.5 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default focus:outline-2 focus:outline-indigo-500 text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
			>
				<option value="comfortable">Комфортная</option>
				<option value="compact">Компактная</option>
			</select>
		</div>
	</div>

	<NuxtLink
		to="/login"
		class="w-full md:w-auto h-10 px-4 bg-color-bg-surface hover:bg-color-bg-subtle rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-strong inline-flex justify-center items-center gap-2 text-color-text-primary text-sm font-medium font-['Montserrat'] leading-5 wf-focus-ring"
	>
		Выйти из аккаунта
	</NuxtLink>
</template>
