export type RequestStatus =
	| 'new'
	| 'assigned'
	| 'progress'
	| 'waiting'
	| 'escalated'
	| 'resolved'
	| 'closed'

export type Priority = 'critical' | 'high' | 'normal' | 'low'

export interface CommentItem {
	id: string
	author: string
	time: string
	text: string
}

export interface HistoryItem {
	id: string
	time: string
	text: string
}

export interface WorkRequest {
	id: string
	number: string
	title: string
	description: string
	client: string
	category: string
	assignee: string
	status: RequestStatus
	priority: Priority
	createdAtText: string
	dueDateText: string
	comments: CommentItem[]
	history: HistoryItem[]
}
