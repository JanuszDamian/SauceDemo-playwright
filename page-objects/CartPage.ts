import { expect, Locator, Page } from '@playwright/test'

export class CartPage {
    // Define Selectors
    readonly page: Page
    readonly titleSpan: Locator
    readonly productDiv: Locator
    readonly productInCartPriceDiv: Locator
    readonly checkoutButton: Locator
    readonly continueShoppingButton: Locator

    // Init selectros using constructor
    constructor(page: Page) {
        this.page = page
        this.titleSpan = page.locator("span[data-test='title']")
        this.productDiv = page.locator("div[data-test='inventory-item']")
        this.productInCartPriceDiv = page.locator("div[data-test='inventory-item']>>div[data-test='inventory-item-price']")
        this.checkoutButton = page.locator("button[data-test='checkout']")
        this.continueShoppingButton = page.locator("button[data-test='continue-shopping']")
    }
    // Define page methods

    async cartPageAssert() {
        await this.titleSpan.waitFor({state: 'visible'})
        expect(this.titleSpan).toHaveText('Your Cart')
        console.log('Checking the entry to the cartPage completed successfully.')
    }

    async countProductsInCart() {
        await this.productDiv.nth(0).waitFor({state: 'visible'})
        const numberOfProductsInCartInt = await this.productDiv.count()
        console.log('Counting products in the cart, completed successfully.')

        return numberOfProductsInCartInt
    }

    async assertNumberOfProductsInCart(numberOfProductsInCart: number, numberOfProductsInProductList: number) {
        expect(numberOfProductsInCart).toBe(numberOfProductsInProductList)
        console.log('checking the number of products in the cart with the number of products added to the cart was completed successfully')
    }

    async assertSumOfPricesInCart(priceSumFromProductList: number, numberOfProductAddedToCart: number) {
        let sumOfPricesInCartInt = 0

        for(let i = 0; i< numberOfProductAddedToCart; i++) {

            let priceInCartText = await this.productInCartPriceDiv.nth(i).innerText()
            let priceInCartInt = Number(priceInCartText.replace("$", "").trim())

            sumOfPricesInCartInt += priceInCartInt
        }
        expect(sumOfPricesInCartInt).toBe(priceSumFromProductList)
        console.log(`The sum of prices in the product list is: ${sumOfPricesInCartInt}`)
    }

    async goToCheckoutPage() {
        await this.checkoutButton.waitFor({state: 'visible'})
        await this.checkoutButton.click()
        console.log('Checkout Button has been pressed')
    }

    async goToProductList() {
        await this.continueShoppingButton.waitFor({state: 'visible'})
        await this.continueShoppingButton.click()
    }
        


}