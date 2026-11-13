import { expect, test } from '@playwright/test'

test.describe('WorkFlow E2E: полный пользовательский сценарий', () => {
	test('login -> create request -> assign -> change status -> comment -> logout', async ({
		page
	}) => {
		await page.goto('/login')
		await expect(page.getByText('С возвращением')).toBeVisible()
		await page.getByRole('button', { name: 'Войти' }).click()
		await expect(page).toHaveURL(/\/requests/)

		await page.getByRole('button', { name: 'Создать заявку' }).first().click()
		await expect(page.getByTestId('create-request-modal')).toBeVisible()
		await page.getByTestId('submit-create-request').click()
		await expect(page.getByTestId('create-request-modal')).toBeHidden()

		await page.goto('/requests/1042')
		await expect(page.getByText('#1042')).toBeVisible()

		const commentBox = page.getByPlaceholder('Напишите сообщение…')
		await commentBox.fill('Уточнила детали заявки.')
		await page.getByRole('button', { name: 'Отправить комментарий' }).click()
		await expect(page.getByText('Комментарий отправлен')).toBeVisible()

		await page.goto('/profile')
		await page.getByTestId('logout-button').click()
		await expect(page).toHaveURL(/\/login/)

		await page.goto('/requests')
		await expect(page).toHaveURL(/\/login\?expired=1/)
		await expect(
			page.getByText('Сессия истекла. Войдите снова, чтобы продолжить работу.')
		).toBeVisible()
	})
})
