<script setup lang="ts">
import { useRequests } from '~/composable/useRequests'
import { ASSIGNEE_OPTIONS } from '~/utils/mockData'
import type { Priority } from '~/utils/types'

const route = useRoute()
const id = computed(() => String(route.params.id))

const { getById, addComment, updateRequestParams } = useRequests()
const request = getById(id.value)

const commentText = ref('')
const selectedAssignee = ref('Не назначен')
const selectedPriority = ref<Priority>('high')

watch(
	request,
	val => {
		if (val) {
			selectedAssignee.value = val.assignee
			selectedPriority.value = val.priority
		}
	},
	{ immediate: true }
)

const handleSendComment = () => {
	if (!commentText.value.trim()) return
	addComment(id.value, commentText.value)
	commentText.value = ''
}

const handleAssign = () => {
	updateRequestParams(id.value, {
		assignee: selectedAssignee.value,
		priority: selectedPriority.value
	})
}
</script>

<template>
	<template v-if="request">
		<NuxtLink
			to="/requests"
			class="h-10 px-4 rounded-sm inline-flex justify-center items-center gap-2 text-color-text-accent hover:bg-color-bg-accent-soft text-sm font-medium font-['Montserrat'] leading-5 wf-focus-ring"
		>
			← К списку заявок
		</NuxtLink>

		<div
			class="self-stretch justify-start text-color-text-primary text-2xl md:text-3xl font-bold font-['Montserrat'] leading-8 md:leading-9"
		>
			{{ request.title }}
		</div>

		<div
			class="self-stretch justify-start text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
		>
			{{ request.number }} · {{ request.createdAtText }}
		</div>

		<div class="self-stretch inline-flex justify-start items-start gap-3">
			<StatusBadge :status="request.status" />
			<PriorityBadge :priority="request.priority" />
		</div>

		<div
			class="self-stretch flex flex-col md:flex-row justify-start items-start gap-6"
		>
			<div
				class="w-full md:flex-1 inline-flex flex-col justify-start items-start gap-5"
			>
				<div
					class="self-stretch p-6 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default flex flex-col justify-start items-start gap-4"
				>
					<div
						class="self-stretch justify-start text-color-text-primary text-xl font-semibold font-['Montserrat'] leading-7"
					>
						Описание проблемы
					</div>
					<div
						class="self-stretch justify-start text-color-text-primary text-sm font-normal font-['Montserrat'] leading-5"
					>
						{{ request.description }}
					</div>
				</div>

				<div
					class="self-stretch p-6 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default flex flex-col justify-start items-start gap-4"
				>
					<div
						class="self-stretch justify-start text-color-text-primary text-xl font-semibold font-['Montserrat'] leading-7"
					>
						Комментарии · {{ request.comments.length }}
					</div>

					<div
						v-for="c in request.comments"
						:key="c.id"
						class="self-stretch flex flex-col justify-start items-start gap-2"
					>
						<div
							class="self-stretch justify-start text-color-text-secondary text-xs font-semibold font-['Montserrat'] leading-4"
						>
							{{ c.author }} · {{ c.time }}
						</div>
						<div
							class="self-stretch justify-start text-color-text-primary text-sm font-normal font-['Montserrat'] leading-5"
						>
							{{ c.text }}
						</div>
					</div>

					<div
						class="self-stretch flex flex-col justify-start items-start gap-2"
					>
						<label
							for="c-box"
							class="self-stretch justify-start text-color-text-primary text-xs font-semibold font-['Montserrat'] leading-4"
						>
							Ваш комментарий
						</label>
						<textarea
							id="c-box"
							v-model="commentText"
							placeholder="Напишите сообщение…"
							class="self-stretch w-full min-h-28 p-3.5 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default focus:outline-2 focus:outline-indigo-500 text-color-text-primary placeholder:text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
						/>
					</div>

					<button
						type="button"
						:disabled="!commentText.trim()"
						class="w-full md:w-auto h-10 px-4 rounded-sm inline-flex justify-center items-center gap-2 text-sm font-medium font-['Montserrat'] leading-5 wf-focus-ring"
						:class="
							commentText.trim()
								? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-color-text-inverse'
								: 'bg-color-bg-subtle text-color-text-disabled'
						"
						@click="handleSendComment"
					>
						Отправить комментарий
					</button>
				</div>

				<div
					class="self-stretch p-6 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default flex flex-col justify-start items-start gap-4"
				>
					<div
						class="self-stretch justify-start text-color-text-primary text-xl font-semibold font-['Montserrat'] leading-7"
					>
						История заявки
					</div>
					<div
						v-for="h in request.history"
						:key="h.id"
						class="self-stretch justify-start text-color-text-secondary text-xs font-medium font-['Montserrat'] leading-4"
					>
						{{ h.time }}  {{ h.text }}
					</div>
				</div>
			</div>

			<div
				class="w-full md:w-80 p-6 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default inline-flex flex-col justify-start items-start gap-4"
			>
				<div
					class="self-stretch justify-start text-color-text-primary text-xl font-semibold font-['Montserrat'] leading-7"
				>
					Параметры
				</div>

				<div
					class="self-stretch justify-start text-color-text-secondary text-xs font-semibold font-['Montserrat'] leading-4"
				>
					Клиент
				</div>
				<div
					class="self-stretch justify-start text-color-text-primary text-sm font-medium font-['Montserrat'] leading-5"
				>
					{{ request.client }}
				</div>

				<div
					class="self-stretch justify-start text-color-text-secondary text-xs font-semibold font-['Montserrat'] leading-4"
				>
					Категория
				</div>
				<div
					class="self-stretch justify-start text-color-text-primary text-sm font-medium font-['Montserrat'] leading-5"
				>
					{{ request.category }}
				</div>

				<div class="self-stretch flex flex-col justify-start items-start gap-2">
					<label
						for="p-assign"
						class="self-stretch justify-start text-color-text-primary text-xs font-semibold font-['Montserrat'] leading-4"
					>
						Исполнитель
					</label>
					<select
						id="p-assign"
						v-model="selectedAssignee"
						class="self-stretch w-full p-3.5 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default focus:outline-2 focus:outline-indigo-500 text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
					>
						<option v-for="a in ASSIGNEE_OPTIONS" :key="a" :value="a">
							{{ a }}
						</option>
					</select>
				</div>

				<div class="self-stretch flex flex-col justify-start items-start gap-2">
					<label
						for="p-prio"
						class="self-stretch justify-start text-color-text-primary text-xs font-semibold font-['Montserrat'] leading-4"
					>
						Приоритет
					</label>
					<select
						id="p-prio"
						v-model="selectedPriority"
						class="self-stretch w-full p-3.5 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default focus:outline-2 focus:outline-indigo-500 text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
					>
						<option value="critical">Критический</option>
						<option value="high">Высокий</option>
						<option value="normal">Обычный</option>
						<option value="low">Низкий</option>
					</select>
				</div>

				<div
					class="self-stretch justify-start text-color-text-secondary text-xs font-semibold font-['Montserrat'] leading-4"
				>
					Срок решения
				</div>
				<div
					class="self-stretch justify-start text-color-text-accent text-sm font-medium font-['Montserrat'] leading-5"
				>
					{{ request.dueDateText }}
				</div>

				<button
					type="button"
					class="self-stretch h-10 px-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-sm inline-flex justify-center items-center gap-2 text-color-text-inverse text-sm font-medium font-['Montserrat'] leading-5 wf-focus-ring"
					@click="handleAssign"
				>
					Назначить исполнителя
				</button>
			</div>
		</div>
	</template>
</template>
