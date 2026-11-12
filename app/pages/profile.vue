<script setup lang="ts">
import { usePreferencesStore, type ListDensity } from '~/store/preferences'

const preferencesStore = usePreferencesStore()

const name = ref(preferencesStore.operatorName)
const email = ref(preferencesStore.operatorEmail)

const handleSelectDensity = (e: Event) => {
	const val = (e.target as HTMLSelectElement).value as ListDensity
	preferencesStore.setDensity(val)
}

const handleSaveProfile = () => {
	preferencesStore.saveProfile(name.value, email.value)
}
</script>

<template>
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
		Профиль
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
		Ваши данные и настройки интерфейса
	</div>

	<div
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
				width: 32px;
				height: 32px;
				background: var(--color-bg-accent-soft, #302b69);
				border-radius: 999px;
				justify-content: center;
				align-items: center;
				display: inline-flex;
			"
		>
			<div
				style="
					color: var(--color-text-accent, #79cee8);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 16px;
				"
			>
				АК
			</div>
		</div>

		<div
			class="w-full md:w-[480px]"
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
				for="pr-name"
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
				id="pr-name"
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
			class="w-full md:w-[480px]"
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
				for="pr-email"
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
				id="pr-email"
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
			style="
				align-self: stretch;
				color: var(--color-text-secondary, #b9b3d4);
				font-size: 14px;
				font-family: Montserrat;
				font-weight: 400;
				line-height: 20px;
			"
		>
			Роль: оператор
		</div>

		<button
			type="button"
			data-state="default"
			data-variant="primary"
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
			class="wf-focus-ring"
			@click="handleSaveProfile"
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
				Сохранить изменения
			</span>
		</button>
	</div>

	<div
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
				font-size: 20px;
				font-family: Montserrat;
				font-weight: 600;
				line-height: 28px;
			"
		>
			Настройки интерфейса
		</div>
		<div
			class="w-full md:w-[480px]"
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
				for="pr-density"
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 16px;
				"
			>
				Плотность списка
			</label>
			<select
				id="pr-density"
				:value="preferencesStore.density"
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
				@change="handleSelectDensity"
			>
				<option value="comfortable">Комфортная ▾</option>
				<option value="compact">Компактная ▾</option>
			</select>
		</div>
	</div>

	<NuxtLink
		to="/login"
		data-state="default"
		data-variant="secondary"
		style="
			height: 40px;
			padding-left: 16px;
			padding-right: 16px;
			background: var(--color-bg-surface, #23204d);
			border-radius: 4px;
			outline: 1px var(--color-border-strong, #615b94) solid;
			outline-offset: -1px;
			justify-content: center;
			align-items: center;
			gap: 8px;
			display: inline-flex;
		"
		class="wf-focus-ring"
	>
		<span
			style="
				color: var(--color-text-primary, #e8e7ec);
				font-size: 14px;
				font-family: Montserrat;
				font-weight: 500;
				line-height: 20px;
			"
		>
			Выйти из аккаунта
		</span>
	</NuxtLink>
</template>
