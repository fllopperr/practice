export type RequestStatus =
	| 'new'
	| 'assigned'
	| 'progress'
	| 'waiting'
	| 'escalated'
	| 'resolved'
	| 'closed'

export type Priority = 'critical' | 'high' | 'normal' | 'low'

export interface ApiUser {
	id: string
	name: string
	fullName?: string
	role: string
	initials: string
}

export interface ApiCustomer {
	id: string
	name: string
}

export interface ApiCategory {
	id: string
	name: string
}

export interface ApiComment {
	id: string
	author: string
	time: string
	text: string
}

export interface ApiHistoryItem {
	id: string
	time: string
	text: string
}

export interface ApiRequestDto {
	id: string
	number: string
	title?: string | null
	description?: string | null
	customerId?: string | null
	categoryId?: string | null
	assigneeId?: string | null
	status: RequestStatus
	priority: Priority
	createdAt: string
	dueDate: string
	comments?: ApiComment[]
	history?: ApiHistoryItem[]
}

export interface ApiRequestsListResponse {
	items: ApiRequestDto[]
	total: number
	page: number
	pageSize: number
	hasPartialDataMissing: boolean
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
	comments: ApiComment[]
	history: ApiHistoryItem[]
	isMissingOptionalFields: boolean
}

export interface LookupDictionaries {
	users: ApiUser[]
	customers: ApiCustomer[]
	categories: ApiCategory[]
}
