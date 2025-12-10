import { expect, Locator, Page } from '@playwright/test'


export class CartPage {
    // Define Selectors
    readonly page: Page
    readonly titleSpan: Locator
    readonly productDiv: Locator



    // Init selectros using constructor
    constructor(page: Page) {
        this.page = page
        this.titleSpan = page.locator("span[data-test='title']")
        this.productDiv = page.locator("div[data-test='inventory-item']")

    }
    // Define page methods

    async cartPageAssert() {
        await this.titleSpan.waitFor({state: 'visible'})
        expect(this.titleSpan).toHaveText('Your Cart')
    }

    async countProductsInCart() {
        await this.productDiv.waitFor({state: 'visible'})
        const numberOfProductsInCartInt = await this.productDiv.count()

        return numberOfProductsInCartInt
    }

    async assertNumberOfProductsInCart(numberOfProductsInCart: number, numberOfProductsInProductList: number) {
        expect(numberOfProductsInCart).toBe(numberOfProductsInProductList)
    }


}