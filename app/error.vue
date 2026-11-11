<script setup lang="ts">
const handleClearError = () => clearError({ redirect: '/requests' })
</script>

<template>
	<div
		class="w-full min-h-screen wf-bg-radial inline-flex flex-col justify-center items-center"
	>
		<div
			class="w-full max-w-[720px] p-8 md:p-16 flex flex-col justify-start items-center gap-6"
		>
			<div
				class="self-stretch text-center justify-start text-color-text-accent text-3xl font-bold font-['Montserrat'] leading-10"
			>
				404
			</div>
			<div
				class="self-stretch text-center justify-start text-color-text-primary text-3xl font-bold font-['Montserrat'] leading-9"
			>
				Страница не найдена
			</div>
			<div
				class="self-stretch text-center justify-start text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
			>
				Проверьте адрес или вернитесь к заявкам.
			</div>
			<button
				type="button"
				class="h-10 px-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-sm inline-flex justify-center items-center gap-2 text-color-text-inverse text-sm font-medium font-['Montserrat'] leading-5 wf-focus-ring"
				@click="handleClearError"
			>
				Вернуться к заявкам
			</button>
		</div>
	</div>
</template>
