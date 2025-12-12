import { expect, Locator, Page } from '@playwright/test'
import { CheckoutDataType } from '../data/types/checkoutDataTypes'

export class CheckoutPage {
    // Define Selectors
    readonly page: Page
    readonly checkoutPageTitle: Locator
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly postalCodeInput: Locator
    readonly cancelButton: Locator
    readonly continueButton: Locator


    // Init selectros using constructor
    constructor(page: Page) {
        this.page = page
        this.checkoutPageTitle = page.locator("span[data-test='title']")
        this.firstNameInput = page.locator("input[data-test='firstName']")
        this.lastNameInput = page.locator("input[data-test='lastName']")
        this.postalCodeInput = page.locator("input[data-test='postalCode']")
        this.cancelButton = page.locator("button[data-test='cancel']")
        this.continueButton = page.locator("input[data-test='continue']")

    }
    // Define page methods

    async checkoutPageAssertTitle() {
        await this.checkoutPageTitle.waitFor({state: 'visible'})
        expect(this.checkoutPageTitle).toHaveText('Checkout: Your Information')
        console.log('I am on the saucedemo checkout page.')
    }

    async fillCheckoutForm(data: CheckoutDataType) {
        await this.firstNameInput.waitFor({state: 'visible'})
        await this.firstNameInput.fill(data.firstName)
        await this.lastNameInput.fill(data.lastName)
        await this.postalCodeInput.fill(data.postalCode)
        console.log(`Checkout form has been filled valu: ${data.firstName}, ${data.lastName}, ${data.postalCode}`)
    }

    async goToCheckoutOverviewPage() {
        await this.continueButton.click()
        console.log('Continue Button has been pressed.')
    }

}