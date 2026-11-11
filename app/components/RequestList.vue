<script setup lang="ts">
import { AlertCircle, Inbox } from 'lucide-vue-next'
import type { MockViewState } from '../composable/useRequests'
import { useRequests } from '../composable/useRequests'
import type { WorkRequest } from '../utils/types'

withDefaults(
	defineProps<{
		items: WorkRequest[]
		state?: MockViewState
		showPagination?: boolean
	}>(),
	{
		state: 'normal',
		showPagination: false
	}
)

const emit = defineEmits<{
	create: []
	retry: []
}>()

const router = useRouter()
const { density } = useRequests()

const goToRequest = (id: string) => {
	router.push(`/requests/${id}`)
}
</script>

<template>
	<div
		v-if="state === 'loading'"
		class="self-stretch px-6 py-10 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default flex flex-col justify-center items-center gap-4"
	>
		<div
			class="self-stretch text-center justify-start text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
		>
			Загружаем заявки…
		</div>
		<div
			v-for="n in 6"
			:key="n"
			class="self-stretch p-4 bg-color-bg-subtle inline-flex justify-start items-start gap-3"
		>
			<div
				class="justify-start text-color-text-disabled text-sm font-normal font-['Montserrat'] leading-5 whitespace-pre"
			>
				— — —
			</div>
		</div>
	</div>

	<div
		v-else-if="state === 'error'"
		class="self-stretch px-6 py-10 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default flex flex-col justify-center items-center gap-4"
	>
		<AlertCircle class="size-5 text-color-text-secondary stroke-[1.67]" />
		<div
			class="self-stretch text-center justify-start text-color-text-primary text-xl font-semibold font-['Montserrat'] leading-7"
		>
			Не удалось загрузить заявки
		</div>
		<div
			class="self-stretch text-center justify-start text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
		>
			Сервис временно недоступен. Попробуйте ещё раз.
		</div>
		<button
			type="button"
			class="h-10 px-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-sm inline-flex justify-center items-center gap-2 text-color-text-inverse text-sm font-medium font-['Montserrat'] leading-5 wf-focus-ring"
			@click="emit('retry')"
		>
			Повторить загрузку
		</button>
	</div>

	<div
		v-else-if="items.length === 0"
		class="self-stretch px-6 py-10 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default flex flex-col justify-center items-center gap-4"
	>
		<Inbox class="size-5 text-color-text-secondary stroke-[1.67]" />
		<div
			class="self-stretch text-center justify-start text-color-text-primary text-xl font-semibold font-['Montserrat'] leading-7"
		>
			Заявок пока нет
		</div>
		<div
			class="self-stretch text-center justify-start text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
		>
			Обращения появятся здесь после создания.
		</div>
		<button
			type="button"
			class="h-10 px-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-sm inline-flex justify-center items-center gap-2 text-color-text-inverse text-sm font-medium font-['Montserrat'] leading-5 wf-focus-ring"
			@click="emit('create')"
		>
			Создать заявку
		</button>
	</div>

	<template v-else>
		<div
			class="hidden md:flex self-stretch bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default flex-col justify-start items-start"
		>
			<div
				class="self-stretch p-4 bg-color-bg-subtle inline-flex justify-start items-start gap-3"
			>
				<div
					class="w-16 justify-start text-color-text-secondary text-xs font-semibold font-['Montserrat'] leading-4"
				>
					Номер
				</div>
				<div
					class="flex-1 justify-start text-color-text-secondary text-xs font-semibold font-['Montserrat'] leading-4"
				>
					Заявка
				</div>
				<div
					class="w-36 hidden lg:block justify-start text-color-text-secondary text-xs font-semibold font-['Montserrat'] leading-4"
				>
					Клиент
				</div>
				<div
					class="w-28 hidden lg:block justify-start text-color-text-secondary text-xs font-semibold font-['Montserrat'] leading-4"
				>
					Исполнитель
				</div>
				<div
					class="w-28 justify-start text-color-text-secondary text-xs font-semibold font-['Montserrat'] leading-4"
				>
					Статус
				</div>
				<div
					class="w-32 justify-start text-color-text-secondary text-xs font-semibold font-['Montserrat'] leading-4"
				>
					Приоритет
				</div>
			</div>

			<div
				v-for="item in items"
				:key="item.id"
				tabindex="0"
				role="link"
				:class="density === 'compact' ? 'h-11' : 'h-14'"
				class="self-stretch px-4 bg-color-bg-surface hover:bg-color-bg-subtle inline-flex justify-start items-center gap-3 cursor-pointer wf-focus-ring"
				@click="goToRequest(item.id)"
				@keydown.enter.prevent="goToRequest(item.id)"
				@keydown.space.prevent="goToRequest(item.id)"
			>
				<div
					class="w-16 justify-start text-color-text-secondary text-xs font-medium font-['Montserrat'] leading-4"
				>
					{{ item.number }}
				</div>
				<div
					class="flex-1 justify-start text-color-text-primary text-sm font-medium font-['Montserrat'] leading-5"
				>
					{{ item.title }}
				</div>
				<div
					class="w-36 hidden lg:block justify-start text-color-text-primary text-xs font-medium font-['Montserrat'] leading-4"
				>
					{{ item.client }}
				</div>
				<div
					class="w-28 hidden lg:block justify-start text-color-text-primary text-xs font-medium font-['Montserrat'] leading-4"
				>
					{{ item.assignee }}
				</div>
				<div class="w-28 flex justify-start items-center overflow-hidden">
					<StatusBadge :status="item.status" />
				</div>
				<div class="w-32 flex justify-start items-center overflow-hidden">
					<PriorityBadge :priority="item.priority" />
				</div>
			</div>
		</div>

		<div
			class="md:hidden self-stretch bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default flex flex-col justify-start items-start"
		>
			<RequestCard v-for="item in items" :key="item.id" :item="item" />
		</div>

		<div
			v-if="showPagination"
			class="self-stretch inline-flex justify-start items-center gap-3 flex-wrap content-center"
		>
			<div
				class="w-80 md:flex-1 justify-start text-color-text-secondary text-xs font-medium font-['Montserrat'] leading-4"
			>
				Показано 1–{{ items.length }} из 24
			</div>
			<button
				type="button"
				disabled
				class="h-10 px-4 bg-color-bg-subtle rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default flex justify-center items-center gap-2 text-color-text-disabled text-sm font-medium font-['Montserrat'] leading-5"
			>
				Назад
			</button>
			<button
				type="button"
				class="h-10 px-4 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-strong flex justify-center items-center gap-2 text-color-text-primary text-sm font-medium font-['Montserrat'] leading-5 wf-focus-ring"
			>
				1
			</button>
			<button
				type="button"
				class="h-10 px-4 rounded-sm flex justify-center items-center gap-2 text-color-text-accent hover:bg-color-bg-accent-soft text-sm font-medium font-['Montserrat'] leading-5 wf-focus-ring"
			>
				2
			</button>
			<button
				type="button"
				class="h-10 px-4 bg-color-bg-surface hover:bg-color-bg-subtle rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-strong flex justify-center items-center gap-2 text-color-text-primary text-sm font-medium font-['Montserrat'] leading-5 wf-focus-ring"
			>
				Далее
			</button>
		</div>
	</template>
</template>
