<script setup lang="ts">
const metrics = [
	{ title: 'Новые заявки', value: '6', sub: 'Ожидают назначения' },
	{ title: 'В работе', value: '4', sub: 'Назначены исполнителям' },
	{ title: 'Ожидают ответа', value: '4', sub: 'Нужна информация' },
	{ title: 'Решены', value: '2', sub: 'За эту неделю' }
]
</script>

<template>
	<div class="self-stretch grid grid-cols-2 md:grid-cols-4 gap-4">
		<div
			v-for="m in metrics"
			:key="m.title"
			class="p-6 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default inline-flex flex-col justify-start items-start gap-4"
		>
			<div
				class="self-stretch justify-start text-color-text-secondary text-xs font-medium font-['Montserrat'] leading-4"
			>
				{{ m.title }}
			</div>
			<div
				class="self-stretch justify-start text-color-text-primary text-2xl md:text-3xl font-bold font-['Montserrat'] leading-8 md:leading-10"
			>
				{{ m.value }}
			</div>
			<div
				class="self-stretch justify-start text-color-text-secondary text-xs font-medium font-['Montserrat'] leading-4"
			>
				{{ m.sub }}
			</div>
		</div>
	</div>
</template>
