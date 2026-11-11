<script setup lang="ts">
import { useRequests } from '~/composable/useRequests'

const { requests } = useRequests()
const latestRequests = computed(() => requests.value.slice(0, 3))
</script>

<template>
	<div
		class="self-stretch justify-start text-color-text-primary text-2xl md:text-3xl font-bold font-['Montserrat'] leading-8 md:leading-9"
	>
		Обзор
	</div>
	<div
		class="self-stretch justify-start text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
	>
		Обзор работы поддержки
	</div>

	<StatsGrid />

	<div
		class="self-stretch inline-flex justify-start items-center gap-3 overflow-hidden"
	>
		<div
			class="flex-1 self-stretch justify-start text-color-text-primary text-xl font-semibold font-['Montserrat'] leading-7"
		>
			Последние заявки
		</div>
	</div>

	<NuxtLink
		to="/requests"
		class="w-full md:w-auto h-10 px-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-sm inline-flex justify-center items-center gap-2 text-color-text-inverse text-sm font-medium font-['Montserrat'] leading-5 wf-focus-ring"
	>
		Все заявки
	</NuxtLink>

	<RequestList :items="latestRequests" />
</template>
