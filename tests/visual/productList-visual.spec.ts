import { test } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { ProductListPage } from '../../page-objects/ProductListPage'
import { CartPage } from '../../page-objects/CartPage'
import { UserDataType } from '../../data/types/userDataTypes'
import userDataJson from '../../data/userData.json'

test.describe.parallel('Visual test ProductListPage', () => {
    let loginPage: LoginPage
    let productListPage: ProductListPage
    let cartPage: CartPage

    const userRecord0 = UserDataType.fromUserDataJson(userDataJson[0])
    const userRecord2 = UserDataType.fromUserDataJson(userDataJson[2])
    const userRecord5 = UserDataType.fromUserDataJson(userDataJson[5])

    
    test.skip('@Visual test productListPage', async ({page}) => {
        loginPage = new LoginPage(page)
        productListPage = new ProductListPage(page)

        await loginPage.visit()
        await loginPage.fillLoginForm(userRecord2, "secret_sauce")
        await productListPage.snapshotProductList()
    })

    test.skip('@Visual test cartPage', async ({page}) => {
        loginPage = new LoginPage(page)
        productListPage = new ProductListPage(page)
        cartPage = new CartPage(page)

        await loginPage.visit()
        await loginPage.fillLoginForm(userRecord5, "secret_sauce")
        const numberOfProductsToSell = await productListPage.countProducts()
        await productListPage.addProductToCart(6, numberOfProductsToSell)
        await productListPage.goToCart()
        await cartPage.snapshotCartPageList()
    })
})