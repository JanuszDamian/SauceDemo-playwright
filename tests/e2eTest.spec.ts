import { test } from '@playwright/test'
import { LoginPage } from '../page-objects/LoginPage'
import { ProductListPage } from '../page-objects/ProductListPage'
import { UserDataType } from '../data/types/userDataTypes'
import userDataJson from '../data/userData.json'
import { ProductListDataType } from '../data/types/productListDataTypes'
import productListDataJson from '../data/productListData.json'
import { CartPage } from '../page-objects/CartPage'
import { CheckoutPage } from '../page-objects/CheckoutPage'
import checkoutDataJson from '../data/checkoutData.json'
import { CheckoutDataType } from '../data/types/checkoutDataTypes'
import { CheckoutOverviewPage } from '../page-objects/CheckoutOverviewPage'
import { CheckoutCompletePage } from '../page-objects/CheckoutCompletePage'

  //user=handlowiec
test.describe.parallel('Login tests', () => {
    let loginPage: LoginPage
    let productListPage: ProductListPage
    let cartPage: CartPage
    let checkoutPage: CheckoutPage
    let checkoutOverviewPage: CheckoutOverviewPage
    let checkoutCompletePage: CheckoutCompletePage

    const userRecord0 = UserDataType.fromUserDataJson(userDataJson[0])
    const typeOfSortLowToHigh = ProductListDataType.fromProductListDataJson(productListDataJson[2])
    const checkoutDataObj1 = CheckoutDataType.fromCheckoutDataJson(checkoutDataJson[0])

    test('@E2E - added product to cart, assertValue and back to HomePage', async ({page}) => {
        loginPage = new LoginPage(page)
        productListPage = new ProductListPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        checkoutOverviewPage = new CheckoutOverviewPage(page)
        checkoutCompletePage = new CheckoutCompletePage(page)

        await loginPage.visit()
        await loginPage.fillLoginForm(userRecord0, "secret_sauce")
        await productListPage.loginAssert()
        await productListPage.productSorting(typeOfSortLowToHigh.typeOfSort)
        await productListPage.assertSortLowToHighPrice()
        const numberOfProductToSell = await productListPage.countProducts()
        const addProductsToCart = await productListPage.addProductToCart(6, numberOfProductToSell)
        const assertProductListVariable = await productListPage.assertAddedProductsToCart(numberOfProductToSell, addProductsToCart, 0)
        await productListPage.goToCart()
        await cartPage.cartPageAssert()
        const numberOfProductsInCartInt = await cartPage.countProductsInCart()
        await cartPage.assertNumberOfProductsInCart(numberOfProductsInCartInt, addProductsToCart)
        await cartPage.assertSumOfPricesInCart(assertProductListVariable.productInCartPricesInt, addProductsToCart)
        await cartPage.goToCheckoutPage()
        await checkoutPage.checkoutPageAssertTitle()
        await checkoutPage.fillCheckoutForm(checkoutDataObj1)
        await checkoutPage.goToCheckoutOverviewPage()
        await checkoutOverviewPage.checkoutOverviewPageAssertTitle()
        await checkoutOverviewPage.assertPrices(assertProductListVariable.productInCartPricesInt)
        await checkoutOverviewPage.finishOrder()
        await checkoutCompletePage.checkoutCompletePageAssertTitle()
        await checkoutCompletePage.backToHome()
        await productListPage.assertCartBadgeIsNotVisible()
    })

    test.only('@E2E - added product to cart, remove product from product list, assertValue and back to HomePage', async ({page}) => {
        loginPage = new LoginPage(page)
        productListPage = new ProductListPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        checkoutOverviewPage = new CheckoutOverviewPage(page)
        checkoutCompletePage = new CheckoutCompletePage(page)

        await loginPage.visit()
        await loginPage.fillLoginForm(userRecord0, "secret_sauce")
        await productListPage.loginAssert()
        await productListPage.productSorting(typeOfSortLowToHigh.typeOfSort)
        await productListPage.assertSortLowToHighPrice()
        const numberOfProductToSell = await productListPage.countProducts()
        const addProductsToCart = await productListPage.addProductToCart(6, numberOfProductToSell)
        const removeProductsFromCart = await productListPage.removeProductFromCart(3, addProductsToCart)
        const assertProductListVariable = await productListPage.assertAddedProductsToCart(numberOfProductToSell, addProductsToCart, removeProductsFromCart)
        await productListPage.goToCart()
        await cartPage.cartPageAssert()
        const numberOfProductsInCartInt = await cartPage.countProductsInCart()
        await cartPage.assertNumberOfProductsInCart(numberOfProductsInCartInt, assertProductListVariable.numberOfProductsInCart)
        await cartPage.assertSumOfPricesInCart(assertProductListVariable.productInCartPricesInt, assertProductListVariable.numberOfProductsInCart)
        await cartPage.goToCheckoutPage()
        await checkoutPage.checkoutPageAssertTitle()
        await checkoutPage.fillCheckoutForm(checkoutDataObj1)
        await checkoutPage.goToCheckoutOverviewPage()
        await checkoutOverviewPage.checkoutOverviewPageAssertTitle()
        await checkoutOverviewPage.assertPrices(assertProductListVariable.productInCartPricesInt)
        await checkoutOverviewPage.finishOrder()
        await checkoutCompletePage.checkoutCompletePageAssertTitle()
        await checkoutCompletePage.backToHome()
        await productListPage.assertCartBadgeIsNotVisible()
    })
})