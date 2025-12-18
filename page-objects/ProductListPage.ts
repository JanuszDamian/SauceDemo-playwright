import { expect, Locator, Page } from '@playwright/test'

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
    readonly productTitleSpan: Locator
    readonly onesieImg: Locator

    // Init selectros using constructor
    constructor(page: Page) {
        this.page = page
        this.productContainerDiv = page.locator("div[id='inventory_container'][data-test='inventory-container']")
        this.productPriceDiv = page.locator("div[data-test='inventory-container']>>div[data-test='inventory-item-price']")
        this.productNameDiv = page.locator("div[data-test='inventory-container']>>div[data-test='inventory-item-name']")
        this.productSortSelect = page.locator("select[data-test='product-sort-container']")
        this.addToCartButton = page.locator("div[data-test='inventory-container']>>div[class='pricebar']>>button")
        this.shoppingCartIcon = page.locator("div[id='shopping_cart_container']")
        this.shoppingCartBadge = page.locator("div[id='shopping_cart_container']>>span[data-test='shopping-cart-badge']")
        this.productTitleSpan = page.locator("span[data-test='title']")
        this.onesieImg = page.locator("img[data-test='inventory-item-sauce-labs-onesie-img']")
    }
    // Define page methods

    async loginAssert() {
        await this.productTitleSpan.waitFor({state: 'visible'})
        expect(this.productTitleSpan).toHaveText('Products')
        console.log('I am on the saucedemo product list page.')
    }

    async productSorting(typeOfSort: string) {
        await this.productSortSelect.waitFor({state: 'visible'})
        await this.productSortSelect.selectOption(typeOfSort)
        console.log('The products have been sorted.')
    }


    async countProducts() {
        await this.productContainerDiv.waitFor({state: 'visible'})
        const numberOfProducts = await this.productPriceDiv.count()
        console.log('The products have been counted.')

        return numberOfProducts
    }

    async assertSortLowToHighPrice() {
        await this.productPriceDiv.nth(0).waitFor({state: 'visible'})
        const pricesText = await this.productPriceDiv.allInnerTexts()
        console.log(`Pobrany tekst cen po sortowaniu Low to High: '${pricesText}'`)
        const pricesInt = pricesText.map(text => Number(text.replace("$", "").trim()))
        console.log(`Ceny po konwersji z tekstu na int: '${pricesInt}'`)

        for(let i=1; i<pricesInt.length; i++)
            {
                expect(pricesInt[i]).toBeGreaterThanOrEqual(pricesInt[i-1])
            }
        console.log('Sorting check Low to High price, completed successfully')           
    }

    async assertSortHighToLowPrice() {
        await this.productPriceDiv.nth(0).waitFor({state: 'visible'})
        const pricesText = await this.productPriceDiv.allInnerTexts()
        console.log(`Pobrany tekst cen po sortowaniu High to Low: '${pricesText}'`)
        const pricesInt = pricesText.map(text => Number(text.replace("$", "").trim()))
        console.log(`Ceny po konwersji z tekstu na int: '${pricesInt}'`)

        for(let i=1; i<pricesInt.length; i++)
            {
                expect(pricesInt[i]).toBeLessThanOrEqual(pricesInt[i-1])
            }    
        console.log('Sorting check Hight to low price, completed successfully')            
    }

    async assertSortAToZName() {
        await this.productNameDiv.nth(0).waitFor({state: 'visible'})
        const nameText = await this.productNameDiv.allInnerTexts()
        console.log(`Pobrane nazwy produktów po sortowaniu A to Z: '${nameText}'`)

        for(let i=1; i<nameText.length; i++)
            {
                expect(nameText[i].localeCompare(nameText[i-1])).toBeGreaterThanOrEqual(0)
            }            
        console.log('Sorting check A to Z, completed successfully')    
    }

    async assertSortZToAName() {
        await this.productNameDiv.nth(0).waitFor({state: 'visible'})
        const nameText = await this.productNameDiv.allInnerTexts()
        console.log(`Pobrane nazwy produktów po sortowaniu Z to A: '${nameText}'`)
        
        for(let i=1; i<nameText.length; i++)
            {
                expect(nameText[i].localeCompare(nameText[i-1])).toBeLessThanOrEqual(0)
            }            
        console.log('Sorting check Z to A, completed successfully')    
    }

    async addProductToCart(numberOfProductsToAddToCart: number, numberOfProductsToSell: number) {
        await this.productPriceDiv.nth(0).waitFor({state: 'visible'})


        for(let i = 0; i< numberOfProductsToAddToCart; i++) {

            if(numberOfProductsToAddToCart>numberOfProductsToSell) {
            console.log('Number of products to buy is higher than Number of products to sell')
            break
        }
            await this.addToCartButton.nth(i).click()
        }

        const countOfProductInCartStr = await this.shoppingCartBadge.innerText()
        const countOfProductInCartInt = Number(countOfProductInCartStr)
        expect(countOfProductInCartInt).toBe(numberOfProductsToAddToCart)
        console.log(`${numberOfProductsToAddToCart} products have been added to cart `)    

        return numberOfProductsToAddToCart
        
    }

    async removeProductFromCart(numberOfProductsToRemove: number, numberOfProductsToAddToCart: number) {
        await this.productPriceDiv.nth(0).waitFor({state: 'visible'})

        if(numberOfProductsToRemove <= numberOfProductsToAddToCart) {
            for(let i = 0; i< numberOfProductsToRemove; i++) {
                const buttontext = await (await this.addToCartButton.nth(i).innerText()).trim()
                if (buttontext === 'Remove') {
                    await this.addToCartButton.nth(i).click()
                 }
                else {
                    console.log('No products added to cart.')
                 }
            }
        console.log(`${numberOfProductsToRemove} products have been removed from cart`)

        }
        else {
            throw new Error(`Error - the number of products to be removed: ${numberOfProductsToRemove}, is greater than the number of products added: ${numberOfProductsToAddToCart}`)
        }
        return numberOfProductsToRemove
    }

    async assertAddedProductsToCart(numberOfProductsToSell: number, numberOfProductsToAddToCart: number, numberOfProductsToRemove: number) {
        await this.productPriceDiv.nth(0).waitFor({state: 'visible'})

        let productInCartPricesInt = 0

        for(let i = 0; i< numberOfProductsToSell; i++) {
            const buttontext = await (await this.addToCartButton.nth(i).innerText()).trim()
            if (buttontext === 'Remove') {
                let pricesText = await this.productPriceDiv.nth(i).innerText()
                let pricesInt = Number(pricesText.replace("$", "").trim())

                productInCartPricesInt += pricesInt
            }    
        }
        console.log(`The sum of prices in the product list is: ${productInCartPricesInt}`)
        const numberOfProductsInCart = numberOfProductsToAddToCart - numberOfProductsToRemove
        const countOfProductInCartStr = await this.shoppingCartBadge.innerText()
        const countOfProductInCartInt = Number(countOfProductInCartStr)
        expect(countOfProductInCartInt).toBe(numberOfProductsInCart)
        console.log(`${numberOfProductsInCart} products have been added to cart `)    

        return {
            productInCartPricesInt,
            numberOfProductsInCart
        }
    }

    async goToCart() {
        await this.shoppingCartIcon.waitFor({state: 'visible'})
        await this.shoppingCartIcon.click()
        console.log('The shopping cart icon has been clicked') 
    }

    async assertCartBadgeIsNotVisible() {
        await this.productTitleSpan.waitFor({state: 'visible'})
        expect(this.shoppingCartBadge).not.toBeVisible()
        console.log('The cart is empty')
    }

    async snapshotProductList() {
        await this.page.waitForLoadState()
        await this.page.waitForFunction(() => {
            const images = Array.from(document.images);
            return images.every(img => img.complete && img.naturalWidth > 0)
        })
        expect(await this.page.screenshot()).toMatchSnapshot('productList.png')
        console.log('ProductListPage Snapshot has been taken.')
    }
}