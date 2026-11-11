<script setup lang="ts">
import type { WorkRequest } from '../types/types'

defineProps<{
	item: WorkRequest
}>()
</script>

<template>
	<NuxtLink
		:to="`/requests/${item.id}`"
		class="self-stretch px-4 py-3 bg-color-bg-surface hover:bg-color-bg-subtle flex flex-col justify-start items-start gap-1.5 wf-focus-ring"
	>
		<div
			class="justify-start text-color-text-secondary text-xs font-medium font-['Montserrat'] leading-4"
		>
			{{ item.number }}
		</div>
		<div
			class="self-stretch flex-1 justify-start text-color-text-primary text-sm font-medium font-['Montserrat'] leading-5"
		>
			{{ item.title }}
		</div>
		<div class="inline-flex justify-start items-start gap-2 overflow-hidden">
			<div
				class="justify-start text-color-text-primary text-xs font-medium font-['Montserrat'] leading-4"
			>
				{{ item.client }}
			</div>
			<div
				class="justify-start text-color-text-primary text-xs font-medium font-['Montserrat'] leading-4"
			>
				{{ item.assignee }}
			</div>
		</div>
		<div class="inline-flex justify-start items-center gap-2 overflow-hidden">
			<StatusBadge :status="item.status" />
			<PriorityBadge :priority="item.priority" />
		</div>
	</NuxtLink>
</template>
