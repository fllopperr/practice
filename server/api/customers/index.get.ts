import type { ApiCustomer } from '../../../app/types/types'

export const CUSTOMERS_DATA: ApiCustomer[] = [
	{ id: 'cust-vektor', name: 'АО «Вектор»' },
	{ id: 'cust-sfera', name: 'ООО «Сфера»' },
	{ id: 'cust-puls', name: 'ООО «Пульс»' }
]

export default defineEventHandler((): ApiCustomer[] => {
	return CUSTOMERS_DATA
})
