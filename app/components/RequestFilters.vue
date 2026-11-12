<script setup lang="ts">
import { useRequests } from '~/composable/useRequests'
import type { Priority, RequestStatus } from '~/types/types'
import {
	ASSIGNEE_OPTIONS,
	PRIORITY_LABELS,
	STATUS_LABELS
} from '~/utils/mockData'

defineProps<{
	threeColumnsOnly?: boolean
}>()

const { searchQuery, statusFilter, priorityFilter, assigneeFilter, sortBy } =
	useRequests()

const statusList = Object.entries(STATUS_LABELS) as [RequestStatus, string][]
const priorityList = Object.entries(PRIORITY_LABELS) as [Priority, string][]
</script>

<template>
	<div
		v-if="threeColumnsOnly"
		class="self-stretch flex flex-col md:flex-row justify-start items-start gap-3"
	>
		<div
			class="w-full md:flex-1 h-20 inline-flex flex-col justify-start items-start gap-2"
		>
			<label
				for="s-3"
				class="self-stretch justify-start text-color-text-primary text-xs font-semibold font-['Montserrat'] leading-4"
			>
				Поиск
			</label>
			<input
				id="s-3"
				v-model="searchQuery"
				type="text"
				placeholder="Номер или название заявки"
				class="self-stretch w-full p-3.5 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default focus:outline-2 focus:outline-indigo-500 text-color-text-primary placeholder:text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
			/>
		</div>

		<div
			class="w-full md:w-44 h-20 inline-flex flex-col justify-start items-start gap-2"
		>
			<label
				for="st-3"
				class="self-stretch justify-start text-color-text-primary text-xs font-semibold font-['Montserrat'] leading-4"
			>
				Статус
			</label>
			<select
				id="st-3"
				v-model="statusFilter"
				class="self-stretch w-full p-3.5 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default focus:outline-2 focus:outline-indigo-500 text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
			>
				<option value="all">Все статусы</option>
				<option v-for="[val, label] in statusList" :key="val" :value="val">
					{{ label }}
				</option>
			</select>
		</div>

		<div
			class="w-full md:w-44 h-20 inline-flex flex-col justify-start items-start gap-2"
		>
			<label
				for="pr-3"
				class="self-stretch justify-start text-color-text-primary text-xs font-semibold font-['Montserrat'] leading-4"
			>
				Приоритет
			</label>
			<select
				id="pr-3"
				v-model="priorityFilter"
				class="self-stretch w-full p-3.5 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default focus:outline-2 focus:outline-indigo-500 text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
			>
				<option value="all">Все приоритеты</option>
				<option v-for="[val, label] in priorityList" :key="val" :value="val">
					{{ label }}
				</option>
			</select>
		</div>
	</div>

	<div
		v-else
		class="self-stretch flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap justify-start items-start gap-3"
	>
		<div
			class="w-full md:w-80 lg:flex-1 h-20 inline-flex flex-col justify-start items-start gap-2"
		>
			<label
				for="f-search"
				class="self-stretch justify-start text-color-text-primary text-xs font-semibold font-['Montserrat'] leading-4"
			>
				Поиск
			</label>
			<input
				id="f-search"
				v-model="searchQuery"
				type="text"
				placeholder="Номер или название заявки"
				class="self-stretch w-full p-3.5 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default hover:outline-slate-500 focus:outline-2 focus:outline-indigo-500 text-color-text-primary placeholder:text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
			/>
		</div>

		<div
			class="w-full md:w-80 lg:w-44 h-20 inline-flex flex-col justify-start items-start gap-2"
		>
			<label
				for="f-status"
				class="self-stretch justify-start text-color-text-primary text-xs font-semibold font-['Montserrat'] leading-4"
			>
				Статус
			</label>
			<select
				id="f-status"
				v-model="statusFilter"
				class="self-stretch w-full p-3.5 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default hover:outline-slate-500 focus:outline-2 focus:outline-indigo-500 text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
			>
				<option value="all">Все статусы</option>
				<option v-for="[val, label] in statusList" :key="val" :value="val">
					{{ label }}
				</option>
			</select>
		</div>

		<div
			class="w-full md:w-80 lg:w-44 h-20 inline-flex flex-col justify-start items-start gap-2"
		>
			<label
				for="f-priority"
				class="self-stretch justify-start text-color-text-primary text-xs font-semibold font-['Montserrat'] leading-4"
			>
				Приоритет
			</label>
			<select
				id="f-priority"
				v-model="priorityFilter"
				class="self-stretch w-full p-3.5 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default hover:outline-slate-500 focus:outline-2 focus:outline-indigo-500 text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
			>
				<option value="all">Все приоритеты</option>
				<option v-for="[val, label] in priorityList" :key="val" :value="val">
					{{ label }}
				</option>
			</select>
		</div>

		<div
			class="w-full md:w-80 lg:w-52 h-20 inline-flex flex-col justify-start items-start gap-2"
		>
			<label
				for="f-assignee"
				class="self-stretch justify-start text-color-text-primary text-xs font-semibold font-['Montserrat'] leading-4"
			>
				Назначение
			</label>
			<select
				id="f-assignee"
				v-model="assigneeFilter"
				class="self-stretch w-full p-3.5 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default hover:outline-slate-500 focus:outline-2 focus:outline-indigo-500 text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
			>
				<option value="all">Все заявки</option>
				<option v-for="a in ASSIGNEE_OPTIONS" :key="a" :value="a">
					{{ a }}
				</option>
			</select>
		</div>

		<div
			class="w-full md:w-80 lg:w-64 h-20 inline-flex flex-col justify-start items-start gap-2"
		>
			<label
				for="f-sort"
				class="self-stretch justify-start text-color-text-primary text-xs font-semibold font-['Montserrat'] leading-4"
			>
				Сортировка
			</label>
			<select
				id="f-sort"
				v-model="sortBy"
				class="self-stretch w-full p-3.5 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default hover:outline-slate-500 focus:outline-2 focus:outline-indigo-500 text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
			>
				<option value="newest">Сначала новые</option>
				<option value="oldest">Сначала старые</option>
			</select>
		</div>
	</div>
</template>
