import { expect, Locator, Page } from '@playwright/test'
import { UserDataType } from '../data/types/userDataTypes'

export class LoginPage {
    // Define Selectors
    readonly page: Page
    readonly userNameInput: Locator
    readonly userPasswordInput: Locator
    readonly loginButton: Locator
    readonly errorNotification: Locator


    // Init selectros using constructor
    constructor(page: Page) {
        this.page = page
        this.userNameInput = page.locator("input[id='user-name']")
        this.userPasswordInput = page.locator("input[id='password']")
        this.loginButton = page.locator("input[id='login-button']")
        this.errorNotification = page.locator("h3[data-test='error']")
    }
    // Define page methods
    async visit() {
        await this.page.goto('')
        await this.userNameInput.waitFor({state: 'visible'})
    }

    async fillLoginForm(data: UserDataType, password: string) {
        await this.userNameInput.waitFor({state: 'visible'})
        await this.userNameInput.fill(data.userName)
        await this.userPasswordInput.waitFor({state: 'visible'})
        await this.userPasswordInput.fill(password)
        await this.loginButton.waitFor({state: 'visible'})
        await this.loginButton.click()
    }

    async assertErrorNotyfication() {
        await this.errorNotification.waitFor({state: 'visible'})
        expect(this.errorNotification).toHaveText('Epic sadface: Username and password do not match any user in this service')
    }

}