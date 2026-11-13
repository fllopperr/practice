import { getServerSessionUser } from '../../utils/auth'

export default defineEventHandler(event => {
	return getServerSessionUser(event)
})
