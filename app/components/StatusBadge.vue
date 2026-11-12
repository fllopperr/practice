<script setup lang="ts">
import type { RequestStatus } from '~/types/types'
import { STATUS_LABELS } from '~/utils/mockData'

defineProps<{
	status: RequestStatus
}>()

const badgeMap: Record<RequestStatus, { bg: string; fg: string }> = {
	new: {
		bg: 'var(--status-new-bg, #353060)',
		fg: 'var(--status-new-fg, #BBB6FF)'
	},
	assigned: {
		bg: 'var(--status-assigned-bg, #203F57)',
		fg: 'var(--status-assigned-fg, #79CEE8)'
	},
	progress: {
		bg: 'var(--status-in-progress-bg, #443955)',
		fg: 'var(--status-in-progress-fg, #FFD482)'
	},
	waiting: {
		bg: 'var(--status-waiting-bg, #37324E)',
		fg: 'var(--status-waiting-fg, #C8C3DE)'
	},
	escalated: {
		bg: 'var(--status-escalated-bg, #4A253B)',
		fg: 'var(--status-escalated-fg, #FF91AE)'
	},
	resolved: {
		bg: 'var(--status-resolved-bg, #214544)',
		fg: 'var(--status-resolved-fg, #80E1B3)'
	},
	closed: {
		bg: 'var(--status-closed-bg, #37324E)',
		fg: 'var(--status-closed-fg, #BFB9D6)'
	}
}
</script>

<template>
	<div
		:data-status="status"
		:style="{
			paddingLeft: '10px',
			paddingRight: '10px',
			paddingTop: '4px',
			paddingBottom: '4px',
			background: badgeMap[status].bg,
			borderRadius: '999px',
			justifyContent: 'flex-start',
			alignItems: 'center',
			gap: '6px',
			display: 'inline-flex'
		}"
	>
		<div
			:style="{
				width: '6px',
				height: '6px',
				background: badgeMap[status].fg,
				borderRadius: '9999px'
			}"
		/>
		<div
			:style="{
				color: badgeMap[status].fg,
				fontSize: '12px',
				fontFamily: 'Montserrat',
				fontWeight: 600,
				lineHeight: '16px',
				whiteSpace: 'nowrap'
			}"
		>
			{{ STATUS_LABELS[status] }}
		</div>
	</div>
</template>
