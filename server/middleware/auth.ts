export default defineEventHandler(event => {
	const cookieVal = getCookie(event, 'wf_session_user')
	event.context.sessionToken = cookieVal || 'u-anna'
})
