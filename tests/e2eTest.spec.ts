import { test } from '@playwright/test'
import { LoginPage } from '../page-objects/LoginPage'
import { ProductListPage } from '../page-objects/ProductListPage'
import { UserDataType } from '../data/types/userDataTypes'
import userDataJson from '../data/userData.json'
import { ProductListDataType } from '../data/types/productListDataTypes'
import productListDataJson from '../data/productListData.json'
import { CartPage } from '../page-objects/CartPage'
import { Logger } from '../utils/logger'

  //user=handlowiec
test.describe.parallel('Login tests', () => {
    let loginPage: LoginPage
    let productListPage: ProductListPage
    let cartPage: CartPage
    let logger = new Logger()

    const userRecord0 = UserDataType.fromUserDataJson(userDataJson[0])
    const typeOfSort2 = ProductListDataType.fromProductListDataJson(productListDataJson[2])
    
    test.only('@E2E - added product to cart', async ({page}, testInfo) => {
        loginPage = new LoginPage(page, logger)
        productListPage = new ProductListPage(page, logger)
        cartPage = new CartPage(page)

        await testInfo.attach("Logi scenariusza", {
        body: logger.getLogs(),
        contentType: "text/plain"
    })
        await loginPage.visit()
        await loginPage.fillLoginForm(userRecord0, "secret_sauce")
        await productListPage.loginAssert()
        await productListPage.productSorting(typeOfSort2.typeOfSort)
        await productListPage.assertSortLowToHighPrice()
        const numberOfProductToSell = await productListPage.countProducts()
        const productListVariable = await productListPage.addProductToCart(6, numberOfProductToSell)
        await productListPage.goToCart()
        await cartPage.cartPageAssert()
        const numberOfProductsInCartInt = await cartPage.countProductsInCart()
        await cartPage.assertNumberOfProductsInCart(numberOfProductsInCartInt, productListVariable.numberOfProductsToBuy)
    })
})