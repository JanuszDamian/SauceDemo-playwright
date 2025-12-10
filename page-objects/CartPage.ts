import { expect, Locator, Page } from '@playwright/test'
import { Logger } from '../utils/logger'

export class CartPage {
    // Define Selectors
    readonly page: Page
    readonly titleSpan: Locator
    readonly productDiv: Locator



    // Init selectros using constructor
    constructor(page: Page, private logger: Logger) {
        this.page = page
        this.titleSpan = page.locator("span[data-test='title']")
        this.productDiv = page.locator("div[data-test='inventory-item']")

    }
    // Define page methods

    async cartPageAssert() {
        await this.titleSpan.waitFor({state: 'visible'})
        expect(this.titleSpan).toHaveText('Your Cart')
        this.logger.log('Checking the entry to the cartPage completed successfully.')
    }

    async countProductsInCart() {
        await this.productDiv.nth(0).waitFor({state: 'visible'})
        const numberOfProductsInCartInt = await this.productDiv.count()
        this.logger.log('Counting products in the cart, completed successfully.')

        return numberOfProductsInCartInt
    }

    async assertNumberOfProductsInCart(numberOfProductsInCart: number, numberOfProductsInProductList: number) {
        expect(numberOfProductsInCart).toBe(numberOfProductsInProductList)
        this.logger.log('checking the number of products in the cart with the number of products added to the cart was completed successfully')
    }


}