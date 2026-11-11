<script setup lang="ts">
import { PRIORITY_LABELS } from '~/utils/mockData'
import type { Priority } from '~/utils/types'

defineProps<{
	priority: Priority
}>()
</script>

<template>
	<div
		:data-priority="priority"
		class="inline-flex justify-start items-center gap-1.5"
	>
		<template v-if="priority === 'high'">
			<svg class="size-4 text-[#f6b856]" viewBox="0 0 16 16" fill="none">
				<path
					d="M4.67 8L8 4.67L11.33 8M4.67 11.33L8 8L11.33 11.33"
					stroke="currentColor"
					stroke-width="1.67"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<div
				class="justify-start text-[#f6b856] text-xs font-medium font-['Montserrat'] leading-4"
			>
				{{ PRIORITY_LABELS[priority] }}
			</div>
		</template>

		<template v-else-if="priority === 'critical'">
			<svg class="size-4 text-[#ff6b8b]" viewBox="0 0 16 16" fill="none">
				<path
					d="M8 6V8.67M8 11.33H8.01M6.86 2.57L1.21 12A1.33 1.33 0 002.35 14H13.65A1.33 1.33 0 0014.79 12L9.14 2.57a1.33 1.33 0 00-2.28 0z"
					stroke="currentColor"
					stroke-width="1.67"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<div
				class="justify-start text-[#ff6b8b] text-xs font-medium font-['Montserrat'] leading-4"
			>
				{{ PRIORITY_LABELS[priority] }}
			</div>
		</template>

		<template v-else-if="priority === 'normal'">
			<svg class="size-4 text-[#94a3b8]" viewBox="0 0 16 16" fill="none">
				<path
					d="M3.33 6H12.67M3.33 10H12.67"
					stroke="currentColor"
					stroke-width="1.67"
					stroke-linecap="round"
				/>
			</svg>
			<div
				class="justify-start text-[#cbd5e1] text-xs font-medium font-['Montserrat'] leading-4"
			>
				{{ PRIORITY_LABELS[priority] }}
			</div>
		</template>

		<template v-else>
			<svg class="size-4 text-[#818cf8]" viewBox="0 0 16 16" fill="none">
				<path
					d="M4.67 6.67L8 10L11.33 6.67"
					stroke="currentColor"
					stroke-width="1.67"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<div
				class="justify-start text-[#94a3b8] text-xs font-medium font-['Montserrat'] leading-4"
			>
				{{ PRIORITY_LABELS[priority] }}
			</div>
		</template>
	</div>
</template>
