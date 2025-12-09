import { expect, Locator, Page } from '@playwright/test'

export class LoginPage {
    // Define Selectors
    readonly page: Page
    readonly userNameInput: Locator
    readonly userPasswordInput: Locator
    readonly loginButton: Locator


    // Init selectros using constructor
    constructor(page: Page) {
        this.page = page
        this.userNameInput = page.locator("input[id='user-name']")
        this.userPasswordInput = page.locator("input[id='password']")
        this.loginButton = page.locator("id='login-button'")
    }
    // Define page methods
    async visit() {
        await this.page.goto('')
        await this.userNameInput.waitFor({state: 'visible'})
    }

}