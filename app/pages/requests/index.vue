<script setup lang="ts">
import { useRequests } from '~/composable/useRequests'

const { filteredRequests, viewState, resetFilters } = useRequests()

const isSpecialState = computed(() => viewState.value !== 'normal')

const onKeydown = (e: KeyboardEvent) => {
	const tag = (e.target as HTMLElement)?.tagName
	if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
	if (e.key === '1') viewState.value = 'normal'
	if (e.key === '2') viewState.value = 'loading'
	if (e.key === '3') viewState.value = 'empty'
	if (e.key === '4') viewState.value = 'error'
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
	<template v-if="isSpecialState">
		<div
			class="self-stretch justify-start text-color-text-primary text-3xl font-bold font-['Montserrat'] leading-9"
		>
			Заявки
		</div>
		<div
			class="self-stretch justify-start text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
		>
			Все обращения в одном месте
		</div>
		<button
			type="button"
			class="h-10 px-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-sm inline-flex justify-center items-center gap-2 text-color-text-inverse text-sm font-medium font-['Montserrat'] leading-5 wf-focus-ring"
			@click="resetFilters"
		>
			Создать заявку
		</button>

		<RequestFilters three-columns-only />

		<RequestList
			:items="filteredRequests"
			:state="viewState"
			@create="resetFilters"
			@retry="resetFilters"
		/>
	</template>

	<template v-else>
		<div
			class="self-stretch justify-start text-color-text-primary text-2xl md:text-3xl font-bold font-['Montserrat'] leading-8 md:leading-9"
		>
			Рабочий день под контролем
		</div>
		<div
			class="self-stretch justify-start text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
		>
			Заявки, которые требуют вашего внимания
		</div>

		<StatsGrid />

		<div
			class="self-stretch inline-flex justify-start items-center gap-3 overflow-hidden"
		>
			<div
				class="flex-1 self-stretch justify-start text-color-text-primary text-xl font-semibold font-['Montserrat'] leading-7"
			>
				Заявки
			</div>
		</div>

		<button
			type="button"
			class="w-full md:w-auto h-10 px-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-sm inline-flex justify-center items-center gap-2 text-color-text-inverse text-sm font-medium font-['Montserrat'] leading-5 wf-focus-ring"
			@click="viewState = 'empty'"
		>
			Создать заявку
		</button>

		<RequestFilters />

		<RequestList
			:items="filteredRequests"
			:state="viewState"
			show-pagination
			@create="resetFilters"
			@retry="resetFilters"
		/>
	</template>
</template>
