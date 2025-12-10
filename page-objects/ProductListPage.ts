import { expect, Locator, Page } from '@playwright/test'

export class ProductListPage {
    // Define Selectors
    readonly page: Page
    readonly productContainerDiv: Locator
    readonly productPriceDiv: Locator
    readonly productNameDiv: Locator
    readonly productSortSelect: Locator


    // Init selectros using constructor
    constructor(page: Page) {
        this.page = page
        this.productContainerDiv = page.locator("div[id='inventory_container'][data-test='inventory-container']")
        this.productPriceDiv = page.locator("div[data-test='inventory-container']>>div[data-test='inventory-item-price']")
        this.productNameDiv = page.locator("div[data-test='inventory-container']>>div[data-test='inventory-item-name']")
        this.productSortSelect = page.locator("select[data-test='product-sort-container']")
    }
    // Define page methods

    async loginAssert() {
        await this.productContainerDiv.waitFor({state: 'visible'})
        expect(this.productContainerDiv).toBeVisible()
    }

    async productSorting(typeOfSort: string) {
        await this.productSortSelect.waitFor({state: 'visible'})
        await this.productSortSelect.selectOption(typeOfSort)
    }


    async countProducts() {
        await this.productContainerDiv.waitFor({state: 'visible'})
        const numberOfProducts = await this.productPriceDiv.count()

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
    }

    async assertSortAToZName() {
        await this.productNameDiv.nth(0).waitFor({state: 'visible'})
        const nameText = await this.productNameDiv.allInnerTexts()
        console.log(nameText)

        for(let i=1; i<nameText.length; i++)
            {
                expect(nameText[i].localeCompare(nameText[i-1])).toBeGreaterThanOrEqual(0)
            }            
    }

        async assertSortZToAName() {
        await this.productNameDiv.nth(0).waitFor({state: 'visible'})
        const nameText = await this.productNameDiv.allInnerTexts()
        console.log(nameText)
        
        for(let i=1; i<nameText.length; i++)
            {
                expect(nameText[i].localeCompare(nameText[i-1])).toBeLessThanOrEqual(0)
            }            
    }

}