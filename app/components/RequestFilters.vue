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
	fourColumnsWithoutAssignee?: boolean
}>()

const { searchQuery, statusFilter, priorityFilter, assigneeFilter, sortBy } =
	useRequests()

const statusList = Object.entries(STATUS_LABELS) as [RequestStatus, string][]
const priorityList = Object.entries(PRIORITY_LABELS) as [Priority, string][]
</script>

<template>
	<div
		v-if="threeColumnsOnly"
		style="
			align-self: stretch;
			justify-content: flex-start;
			align-items: flex-start;
			gap: 12px;
			display: inline-flex;
			flex-wrap: wrap;
		"
	>
		<div
			style="
				flex: 1 1 0;
				min-width: 240px;
				height: 80px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 8px;
				display: inline-flex;
			"
		>
			<label
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 16px;
				"
				>Поиск</label
			>
			<input
				v-model="searchQuery"
				type="text"
				placeholder="Номер или название заявки"
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
				width: 180px;
				height: 80px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 8px;
				display: inline-flex;
			"
		>
			<label
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 16px;
				"
				>Статус</label
			>
			<select
				v-model="statusFilter"
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
			>
				<option value="all">Все статусы ▾</option>
				<option v-for="[val, label] in statusList" :key="val" :value="val">
					{{ label }}
				</option>
			</select>
		</div>
		<div
			style="
				width: 180px;
				height: 80px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 8px;
				display: inline-flex;
			"
		>
			<label
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 16px;
				"
				>Приоритет</label
			>
			<select
				v-model="priorityFilter"
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
			>
				<option value="all">Все приоритеты ▾</option>
				<option v-for="[val, label] in priorityList" :key="val" :value="val">
					{{ label }}
				</option>
			</select>
		</div>
	</div>

	<div
		v-else-if="fourColumnsWithoutAssignee"
		style="
			align-self: stretch;
			justify-content: flex-start;
			align-items: flex-start;
			gap: 12px;
			display: inline-flex;
			flex-wrap: wrap;
		"
	>
		<div
			style="
				flex: 1 1 0;
				min-width: 240px;
				height: 80px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 8px;
				display: inline-flex;
			"
		>
			<label
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 16px;
				"
				>Поиск</label
			>
			<input
				v-model="searchQuery"
				type="text"
				placeholder="Номер или название заявки"
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
				width: 180px;
				height: 80px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 8px;
				display: inline-flex;
			"
		>
			<label
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 16px;
				"
				>Статус</label
			>
			<select
				v-model="statusFilter"
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
			>
				<option value="all">Все статусы</option>
				<option v-for="[val, label] in statusList" :key="val" :value="val">
					{{ label }}
				</option>
			</select>
		</div>
		<div
			style="
				width: 180px;
				height: 80px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 8px;
				display: inline-flex;
			"
		>
			<label
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 16px;
				"
				>Приоритет</label
			>
			<select
				v-model="priorityFilter"
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
			>
				<option value="all">Все приоритеты</option>
				<option v-for="[val, label] in priorityList" :key="val" :value="val">
					{{ label }}
				</option>
			</select>
		</div>
		<div
			style="
				width: 276px;
				height: 80px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 8px;
				display: inline-flex;
			"
		>
			<label
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 16px;
				"
				>Сортировка</label
			>
			<select
				v-model="sortBy"
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
			>
				<option value="newest">Сначала новые ▾</option>
				<option value="oldest">Сначала старые ▾</option>
			</select>
		</div>
	</div>

	<div
		v-else
		style="
			align-self: stretch;
			justify-content: flex-start;
			align-items: flex-start;
			gap: 12px;
			display: inline-flex;
			flex-wrap: wrap;
		"
	>
		<div
			style="
				flex: 1 1 0;
				min-width: 220px;
				height: 80px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 8px;
				display: inline-flex;
			"
		>
			<label
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 16px;
				"
				>Поиск</label
			>
			<input
				v-model="searchQuery"
				type="text"
				placeholder="Номер или название заявки"
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
				width: 180px;
				height: 80px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 8px;
				display: inline-flex;
			"
		>
			<label
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 16px;
				"
				>Статус</label
			>
			<select
				v-model="statusFilter"
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
			>
				<option value="all">Все статусы ▾</option>
				<option v-for="[val, label] in statusList" :key="val" :value="val">
					{{ label }}
				</option>
			</select>
		</div>
		<div
			style="
				width: 180px;
				height: 80px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 8px;
				display: inline-flex;
			"
		>
			<label
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 16px;
				"
				>Приоритет</label
			>
			<select
				v-model="priorityFilter"
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
			>
				<option value="all">Все приоритеты ▾</option>
				<option v-for="[val, label] in priorityList" :key="val" :value="val">
					{{ label }}
				</option>
			</select>
		</div>
		<div
			style="
				width: 212px;
				height: 80px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 8px;
				display: inline-flex;
			"
		>
			<label
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 16px;
				"
				>Назначение</label
			>
			<select
				v-model="assigneeFilter"
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
			>
				<option value="all">Все заявки ▾</option>
				<option v-for="a in ASSIGNEE_OPTIONS" :key="a" :value="a">
					{{ a }}
				</option>
			</select>
		</div>
		<div
			style="
				width: 268px;
				height: 80px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 8px;
				display: inline-flex;
			"
		>
			<label
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 16px;
				"
				>Сортировка</label
			>
			<select
				v-model="sortBy"
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
			>
				<option value="newest">Сначала новые ▾</option>
				<option value="oldest">Сначала старые ▾</option>
			</select>
		</div>
	</div>
</template>
