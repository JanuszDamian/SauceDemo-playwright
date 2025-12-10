import { expect, Locator, Page } from '@playwright/test'
import { Logger } from '../utils/logger'

export class ProductListPage {
    // Define Selectors
    readonly page: Page
    readonly productContainerDiv: Locator
    readonly productPriceDiv: Locator
    readonly productNameDiv: Locator
    readonly productSortSelect: Locator
    readonly addToCartButton: Locator
    readonly shoppingCartIcon: Locator
    readonly shoppingCartBadge: Locator

    // Init selectros using constructor
    constructor(page: Page, private logger: Logger) {
        this.page = page
        this.productContainerDiv = page.locator("div[id='inventory_container'][data-test='inventory-container']")
        this.productPriceDiv = page.locator("div[data-test='inventory-container']>>div[data-test='inventory-item-price']")
        this.productNameDiv = page.locator("div[data-test='inventory-container']>>div[data-test='inventory-item-name']")
        this.productSortSelect = page.locator("select[data-test='product-sort-container']")
        this.addToCartButton = page.locator("div[data-test='inventory-container']>>div[class='pricebar']>>button")
        this.shoppingCartIcon = page.locator("div[id='shopping_cart_container']")
        this.shoppingCartBadge = page.locator("div[id='shopping_cart_container']>>span[data-test='shopping-cart-badge']")
    }
    // Define page methods

    async loginAssert() {
        await this.productContainerDiv.waitFor({state: 'visible'})
        expect(this.productContainerDiv).toBeVisible()
        this.logger.log('I am on the saucedemo product list page.')
    }

    async productSorting(typeOfSort: string) {
        await this.productSortSelect.waitFor({state: 'visible'})
        await this.productSortSelect.selectOption(typeOfSort)
        this.logger.log('The products have been sorted.')
    }


    async countProducts() {
        await this.productContainerDiv.waitFor({state: 'visible'})
        const numberOfProducts = await this.productPriceDiv.count()
        this.logger.log('The products have been counted.')

        return numberOfProducts
    }

    async assertSortLowToHighPrice() {
        await this.productPriceDiv.nth(0).waitFor({state: 'visible'})
        const pricesText = await this.productPriceDiv.allInnerTexts()
        console.log(pricesText)
        const pricesInt = pricesText.map(text => Number(text.replace("$", "").trim()))
        console.log(pricesInt)

        for(let i=1; i<pricesInt.length; i++)
            {
                expect(pricesInt[i]).toBeGreaterThanOrEqual(pricesInt[i-1])
            }
        this.logger.log('Sorting check Low to High price, completed successfully')           
    }

    async assertSortHighToLowPrice() {
        await this.productPriceDiv.nth(0).waitFor({state: 'visible'})
        const pricesText = await this.productPriceDiv.allInnerTexts()
        console.log(pricesText)
        const pricesInt = pricesText.map(text => Number(text.replace("$", "").trim()))
        console.log(pricesInt)

        for(let i=1; i<pricesInt.length; i++)
            {
                expect(pricesInt[i]).toBeLessThanOrEqual(pricesInt[i-1])
            }    
        this.logger.log('Sorting check Hight to low price, completed successfully')            
    }

    async assertSortAToZName() {
        await this.productNameDiv.nth(0).waitFor({state: 'visible'})
        const nameText = await this.productNameDiv.allInnerTexts()
        console.log(nameText)

        for(let i=1; i<nameText.length; i++)
            {
                expect(nameText[i].localeCompare(nameText[i-1])).toBeGreaterThanOrEqual(0)
            }            
        this.logger.log('Sorting check A to Z, completed successfully')    
    }

    async assertSortZToAName() {
        await this.productNameDiv.nth(0).waitFor({state: 'visible'})
        const nameText = await this.productNameDiv.allInnerTexts()
        console.log(nameText)
        
        for(let i=1; i<nameText.length; i++)
            {
                expect(nameText[i].localeCompare(nameText[i-1])).toBeLessThanOrEqual(0)
            }            
        this.logger.log('Sorting check Z to A, completed successfully')    
    }

    async addProductToCart(numberOfProductsToBuy: number, numberOfProductsToSell: number) {
        await this.productPriceDiv.nth(0).waitFor({state: 'visible'})

        let productInCartPricesInt = 0

        for(let i = 0; i< numberOfProductsToSell; i++) {
            if(numberOfProductsToBuy>numberOfProductsToSell) {
            this.logger.log('Number of products to buy is higher than Number of products to sell')
            break
        }

            let pricesText = await this.productPriceDiv.nth(i).innerText()
            let pricesInt = Number(pricesText.replace("$", "").trim())

            productInCartPricesInt += pricesInt
            await this.addToCartButton.nth(i).click()
        }

        const countOfProductInCartStr = await this.shoppingCartBadge.innerText()
        const countOfProductInCartInt = Number(countOfProductInCartStr)
        expect(countOfProductInCartInt).toBe(numberOfProductsToBuy)
        this.logger.log('Products have been added to the cart.')    

        return {
            productInCartPricesInt,
            numberOfProductsToBuy
        }
    }

    async goToCart() {
        await this.shoppingCartIcon.waitFor({state: 'visible'})
        await this.shoppingCartIcon.click()
        this.logger.log('The shopping cart icon has been clicked') 
    }
}