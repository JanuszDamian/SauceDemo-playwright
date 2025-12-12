import { expect, Locator, Page } from '@playwright/test'

export class CheckoutOverviewPage {
    // Define Selectors
    readonly page: Page
    readonly checkoutOverviewPageTitle: Locator
    readonly cancelButton: Locator
    readonly finishButton: Locator


    // Init selectros using constructor
    constructor(page: Page) {
        this.page = page
        this.checkoutOverviewPageTitle = page.locator("span[data-test='title']")
        this.cancelButton = page.locator("button[data-test='cancel']")
        this.finishButton = page.locator("button[data-test='finish']")


    }
    // Define page methods

    async checkoutOverviewPageAssertTitle() {
        await this.checkoutOverviewPageTitle.waitFor({state: 'visible'})
        expect(this.checkoutOverviewPageTitle).toHaveText('Checkout: Overview')
        console.log('I am on the saucedemo checkout overview page.')
    }

    async finishOrder() {
        await this.finishButton.waitFor({state: 'visible'})
        await this.finishButton.click()
        console.log('Finish Button has been pressed.')
    }


}