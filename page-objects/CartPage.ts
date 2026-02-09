import { expect, Locator, Page } from '@playwright/test'

export class CartPage {
  // Define Selectors
  readonly page: Page
  readonly titleSpan: Locator
  readonly productDiv: Locator
  readonly productInCartPriceDiv: Locator
  readonly checkoutButton: Locator
  readonly continueShoppingButton: Locator
  readonly removeProductButton: Locator

  // Init selectros using constructor
  constructor(page: Page) {
    this.page = page
    this.titleSpan = page.locator("span[data-test='title']")
    this.productDiv = page.locator("div[data-test='inventory-item']")
    this.productInCartPriceDiv = page.locator(
      "div[data-test='inventory-item']>>div[data-test='inventory-item-price']",
    )
    this.checkoutButton = page.locator("button[data-test='checkout']")
    this.continueShoppingButton = page.locator(
      "button[data-test='continue-shopping']",
    )
    this.removeProductButton = page.locator(
      "div[data-test='cart-list']>>div[class='item_pricebar']>>button",
    )
  }
  // Define page methods

  async cartPageAssert() {
    await this.titleSpan.waitFor({ state: 'visible' })
    expect(this.titleSpan).toHaveText('Your Cart')
  }

  async countProductsInCart() {
    await this.productDiv.nth(0).waitFor({ state: 'visible' })
    const numberOfProductsInCartInt = await this.productDiv.count()

    return numberOfProductsInCartInt
  }

  async assertNumberOfProductsInCart(
    numberOfProductsInCart: number,
    numberOfProductsInProductList: number,
  ) {
    expect(numberOfProductsInCart).toBe(numberOfProductsInProductList)
  }

  async assertSumOfPricesInCart(
    priceSumFromProductList: number,
    numberOfProductAddedToCart: number,
  ) {
    let sumOfPricesInCartInt = 0

    for (let i = 0; i < numberOfProductAddedToCart; i++) {
      let priceInCartText = await this.productInCartPriceDiv.nth(i).innerText()
      let priceInCartInt = Number(priceInCartText.replace('$', '').trim())

      sumOfPricesInCartInt += priceInCartInt
    }
    expect(sumOfPricesInCartInt).toBe(priceSumFromProductList)
    console.log(
      `The sum of prices in the product list is: ${sumOfPricesInCartInt}`,
    )
  }

  async SumOfPricesInCartV2(numberOfProductInCart: number) {
    let sumOfPricesInCartInt = 0

    for (let i = 0; i < numberOfProductInCart; i++) {
      let priceInCartText = await this.productInCartPriceDiv.nth(i).innerText()
      let priceInCartInt = Number(priceInCartText.replace('$', '').trim())

      sumOfPricesInCartInt += priceInCartInt
    }
    console.log(
      `The sum of prices in the product list is: ${sumOfPricesInCartInt}`,
    )
    return sumOfPricesInCartInt
  }

  async removeProductFromCart(
    numberOfProductToRemoveFromCart: number,
    numberOfProductInCart: number,
  ) {
    if (numberOfProductToRemoveFromCart > numberOfProductInCart) {
      throw new Error(
        `Cannot remove ${numberOfProductToRemoveFromCart} products from cart with only ${numberOfProductInCart}`,
      )
    } else {
      for (let i = 0; i < numberOfProductToRemoveFromCart; i++) {
        await this.removeProductButton.nth(i).click()
      }
      console.log(
        `${numberOfProductToRemoveFromCart} products have been removed from your cart`,
      )
    }

    return numberOfProductToRemoveFromCart
  }

  async goToCheckoutPage() {
    await this.checkoutButton.waitFor({ state: 'visible' })
    await this.checkoutButton.click()
  }

  async goToProductList() {
    await this.continueShoppingButton.waitFor({ state: 'visible' })
    await this.continueShoppingButton.click()
  }

  async snapshotCartPageList() {
    await this.page.waitForLoadState()
    await this.page.waitForFunction(() => {
      const images = Array.from(document.images)
      return images.every((img) => img.complete && img.naturalWidth > 0)
    })
    expect(await this.page.screenshot()).toMatchSnapshot('cartPage.png')
  }
}
