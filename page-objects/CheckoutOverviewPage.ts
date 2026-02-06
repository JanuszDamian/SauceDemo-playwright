import { expect, Locator, Page } from '@playwright/test'

export class CheckoutOverviewPage {
  // Define Selectors
  readonly page: Page
  readonly checkoutOverviewPageTitle: Locator
  readonly cancelButton: Locator
  readonly finishButton: Locator
  readonly subtotalLabel: Locator
  readonly taxLabel: Locator
  readonly totalPriceLabel: Locator

  // Init selectros using constructor
  constructor(page: Page) {
    this.page = page
    this.checkoutOverviewPageTitle = page.locator("span[data-test='title']")
    this.cancelButton = page.locator("button[data-test='cancel']")
    this.finishButton = page.locator("button[data-test='finish']")
    this.subtotalLabel = page.locator("div[data-test='subtotal-label']")
    this.taxLabel = page.locator("div[data-test='tax-label']")
    this.totalPriceLabel = page.locator("div[data-test='total-label']")
  }
  // Define page methods

  async checkoutOverviewPageAssertTitle() {
    await this.checkoutOverviewPageTitle.waitFor({ state: 'visible' })
    expect(this.checkoutOverviewPageTitle).toHaveText('Checkout: Overview')
    console.log('I am on the saucedemo checkout overview page.')
  }

  async assertPrices(totalPriceFromProductList: number) {
    await this.subtotalLabel.waitFor({ state: 'visible' })
    const subtotalValueText = (await this.subtotalLabel.innerText())
      .replace('Item total: $', '')
      .trim()
    const subtotalValueInt = Number(parseFloat(subtotalValueText))
    console.log(`The subtotal value was taken: '${subtotalValueInt}'`)
    expect(subtotalValueInt).toBeCloseTo(totalPriceFromProductList, 2)
    console.log('The subtotal value was equal totalPrice from product list')

    const taxValueText = (await this.taxLabel.innerText())
      .replace('Tax: $', '')
      .trim()
    const taxValueInt = Number(parseFloat(taxValueText))

    const sumSubTotalTaxCalc = subtotalValueInt + taxValueInt
    console.log(
      `The following values ​​were summed up: ${sumSubTotalTaxCalc} = ${subtotalValueInt} + ${taxValueInt}`,
    )

    const totalPriceText = (await this.totalPriceLabel.innerText())
      .replace('Total: $', '')
      .trim()
    const totalPriceInt = Number(parseFloat(totalPriceText))
    expect(sumSubTotalTaxCalc).toBeCloseTo(totalPriceInt, 2)
    console.log(
      'The value with tax calculated and downloaded from the website is equal to',
    )
  }

  async finishOrder() {
    await this.finishButton.waitFor({ state: 'visible' })
    await this.finishButton.click()
    console.log('Finish Button has been pressed.')
  }
}
