import { expect, Locator, Page } from '@playwright/test'

export class CheckoutCompletePage {
    // Define Selectors
    readonly page: Page
    readonly checkoutCompletePageTitle: Locator
    readonly completeHeader: Locator
    readonly backHomeButton: Locator


    // Init selectros using constructor
    constructor(page: Page) {
        this.page = page
        this.checkoutCompletePageTitle = page.locator("span[data-test='title']")
        this.backHomeButton = page.locator("button[data-test='back-to-products']")
        this.completeHeader = page.locator("h2[data-test='complete-header']")


    }
    // Define page methods

    async checkoutCompletePageAssertTitle() {
        await this.checkoutCompletePageTitle.waitFor({state: 'visible'})
        expect(this.checkoutCompletePageTitle).toHaveText('Checkout: Complete!')
        console.log('I am on the saucedemo checkout complete page.')
        expect(this.completeHeader).toHaveText('Thank you for your order!')
        console.log('There is a notification on the website: Thank you for your order!')
    }

    async backToHome() {
        await this.backHomeButton.waitFor({state: 'visible'})
        await this.backHomeButton.click()
        console.log('BackHome button has been pressed.')
    }


}