export type UserRole = 'Client' | 'Operator' | 'Agent' | 'Admin'

export type RequestStatus =
	| 'new'
	| 'assigned'
	| 'progress'
	| 'waiting'
	| 'escalated'
	| 'resolved'
	| 'closed'

export type Priority = 'critical' | 'high' | 'normal' | 'low'

export interface SessionUser {
	id: string
	name: string
	fullName: string
	email: string
	role: UserRole
	roleLabel: string
	initials: string
	customerId: string | null
	isActive: boolean
}

export interface ApiUser {
	id: string
	name: string
	fullName?: string
	email?: string
	role: string
	userRole?: UserRole
	initials: string
	isActive: boolean
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

export interface ApiAttachment {
	id: string
	fileName: string
	sizeText: string
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
	resolutionText?: string | null
	waitingReason?: string | null
	closeReason?: string | null
	comments?: ApiComment[]
	history?: ApiHistoryItem[]
	attachments?: ApiAttachment[]
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
	customerId: string | null
	category: string
	assignee: string
	assigneeId: string | null
	status: RequestStatus
	priority: Priority
	createdAtText: string
	dueDateText: string
	resolutionText: string | null
	comments: ApiComment[]
	history: ApiHistoryItem[]
	attachments: ApiAttachment[]
	isMissingOptionalFields: boolean
}

export interface LookupDictionaries {
	users: ApiUser[]
	customers: ApiCustomer[]
	categories: ApiCategory[]
}
