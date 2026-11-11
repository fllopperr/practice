import type { ApiUser } from '../../../app/types/types'

export const USERS_DATA: ApiUser[] = [
	{
		id: 'u-brungilda',
		name: 'Брунгильда Б.',
		fullName: 'Александра Константиновна Рождественская-Соколова',
		role: 'Исполнитель',
		initials: 'ББ'
	},
	{
		id: 'u-oleg',
		name: 'Олег С.',
		fullName: 'Олег Смирнов',
		role: 'Исполнитель',
		initials: 'ОС'
	},
	{
		id: 'u-danil',
		name: 'Данил Г.',
		fullName: 'Горбунов Данил',
		role: 'Оператор',
		initials: 'АК'
	}
]

export default defineEventHandler((): ApiUser[] => {
	return USERS_DATA
})
