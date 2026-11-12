<script setup lang="ts">
import type { Priority } from '~/types/types'
import { PRIORITY_LABELS } from '~/utils/mockData'

defineProps<{
	priority: Priority
}>()
</script>

<template>
	<div
		:data-priority="priority"
		style="
			justify-content: flex-start;
			align-items: center;
			gap: 6px;
			display: inline-flex;
		"
	>
		<template v-if="priority === 'high'">
			<svg
				style="width: 16px; height: 16px; color: var(--priority-high, #ffd482)"
				viewBox="0 0 16 16"
				fill="none"
			>
				<path
					d="M4.67 8L8 4.67L11.33 8M4.67 11.33L8 8L11.33 11.33"
					stroke="currentColor"
					stroke-width="1.67"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<div
				style="
					color: var(--priority-high, #ffd482);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 500;
					line-height: 16px;
					white-space: nowrap;
				"
			>
				{{ PRIORITY_LABELS[priority] }}
			</div>
		</template>

		<template v-else-if="priority === 'critical'">
			<svg
				style="
					width: 16px;
					height: 16px;
					color: var(--priority-critical, #ff91ae);
				"
				viewBox="0 0 16 16"
				fill="none"
			>
				<path
					d="M8 6V8.67M8 11.33H8.01M6.86 2.57L1.21 12A1.33 1.33 0 002.35 14H13.65A1.33 1.33 0 0014.79 12L9.14 2.57a1.33 1.33 0 00-2.28 0z"
					stroke="currentColor"
					stroke-width="1.67"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<div
				style="
					color: var(--priority-critical, #ff91ae);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 500;
					line-height: 16px;
					white-space: nowrap;
				"
			>
				{{ PRIORITY_LABELS[priority] }}
			</div>
		</template>

		<template v-else-if="priority === 'normal'">
			<svg
				style="
					width: 16px;
					height: 16px;
					color: var(--priority-normal, #bbb6ff);
				"
				viewBox="0 0 16 16"
				fill="none"
			>
				<path
					d="M3.33 6H12.67M3.33 10H12.67"
					stroke="currentColor"
					stroke-width="1.67"
					stroke-linecap="round"
				/>
			</svg>
			<div
				style="
					color: var(--priority-normal, #bbb6ff);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 500;
					line-height: 16px;
					white-space: nowrap;
				"
			>
				{{ PRIORITY_LABELS[priority] }}
			</div>
		</template>

		<template v-else>
			<svg
				style="width: 16px; height: 16px; color: var(--priority-low, #b9b3d4)"
				viewBox="0 0 16 16"
				fill="none"
			>
				<path
					d="M4.67 6.67L8 10L11.33 6.67"
					stroke="currentColor"
					stroke-width="1.67"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<div
				style="
					color: var(--priority-low, #b9b3d4);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 500;
					line-height: 16px;
					white-space: nowrap;
				"
			>
				{{ PRIORITY_LABELS[priority] }}
			</div>
		</template>
	</div>
</template>
