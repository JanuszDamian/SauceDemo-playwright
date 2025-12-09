import { expect, Locator, Page } from '@playwright/test'

export class ProductListPage {
    // Define Selectors
    readonly page: Page
    readonly productContainerDiv: Locator


    // Init selectros using constructor
    constructor(page: Page) {
        this.page = page
        this.productContainerDiv = page.locator("div[id='inventory_container'][data-test='inventory-container']")

    }
    // Define page methods

    async loginAssert() {
        await this.productContainerDiv.waitFor({state: 'visible'})
        expect(this.productContainerDiv).toBeVisible()
    }



}