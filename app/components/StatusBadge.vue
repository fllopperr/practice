<script setup lang="ts">
import { STATUS_LABELS } from '~/utils/mockData'
import type { RequestStatus } from '~/utils/types'

defineProps<{
	status: RequestStatus
}>()

const styles: Record<RequestStatus, { bg: string; dot: string; text: string }> =
	{
		new: {
			bg: 'bg-[#282654]',
			dot: 'bg-[#9b8cff]',
			text: 'text-[#b8b8ff]'
		},
		assigned: {
			bg: 'bg-[#173642]',
			dot: 'bg-[#4ad2d6]',
			text: 'text-[#6ce5e8]'
		},
		progress: {
			bg: 'bg-[#3a2e21]',
			dot: 'bg-[#f7b955]',
			text: 'text-[#f7b955]'
		},
		waiting: {
			bg: 'bg-[#2b2b3c]',
			dot: 'bg-[#94a3b8]',
			text: 'text-[#cbd5e1]'
		},
		escalated: {
			bg: 'bg-[#3e202d]',
			dot: 'bg-[#ff5c77]',
			text: 'text-[#ff7a90]'
		},
		resolved: {
			bg: 'bg-[#173a2e]',
			dot: 'bg-[#38d379]',
			text: 'text-[#5ce092]'
		},
		closed: {
			bg: 'bg-[#252636]',
			dot: 'bg-[#64748b]',
			text: 'text-[#94a3b8]'
		}
	}
</script>

<template>
	<div
		:data-status="status"
		class="px-2.5 py-1 rounded-[999px] inline-flex justify-start items-center gap-1.5"
		:class="styles[status].bg"
	>
		<div class="size-1.5 rounded-full" :class="styles[status].dot" />
		<div
			class="justify-start text-xs font-semibold font-['Montserrat'] leading-4 whitespace-nowrap"
			:class="styles[status].text"
		>
			{{ STATUS_LABELS[status] }}
		</div>
	</div>
</template>
