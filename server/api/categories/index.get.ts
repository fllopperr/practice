import type { ApiCategory } from '../../../app/types/types'

export const CATEGORIES_DATA: ApiCategory[] = [
	{ id: 'cat-access', name: 'Доступ и учётные записи' },
	{ id: 'cat-infra', name: 'Инфраструктура' },
	{ id: 'cat-reports', name: 'Отчётность и аналитика' },
	{ id: 'cat-hardware', name: 'Оборудование' },
	{ id: 'cat-integrations', name: 'Интеграции' }
]

export default defineEventHandler((): ApiCategory[] => {
	return CATEGORIES_DATA
})
