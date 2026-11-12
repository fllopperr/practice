import type { ApiComment } from '~/types/types'
import { REQUESTS_DB } from '../../../utils/db'

interface PostCommentBody {
	text: string
	author?: string
	simulateError?: boolean
}

export default defineEventHandler(async (event): Promise<ApiComment> => {
	const id = getRouterParam(event, 'id')
	const body = await readBody<PostCommentBody>(event)

	await new Promise(resolve => setTimeout(resolve, 450))

	if (body.simulateError) {
		throw createError({
			statusCode: 500,
			statusMessage:
				'Не удалось отправить комментарий. Текст сохранён — попробуйте ещё раз.'
		})
	}

	const target = REQUESTS_DB.find(r => r.id === id)
	if (!target) {
		throw createError({ statusCode: 404, statusMessage: 'Заявка не найдена' })
	}

	const newComment: ApiComment = {
		id: `c-${Date.now()}`,
		author: body.author || 'Брунгильда Брунгильдовна',
		time: '10:12',
		text: body.text.trim()
	}

	if (!target.comments) target.comments = []
	target.comments.push(newComment)

	return newComment
})
