import { test } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { ProductListPage } from '../../page-objects/ProductListPage'
import { UserDataType } from '../../data/types/userDataTypes'
import userDataJson from '../../data/userData.json'

test.describe.parallel('Visual test ProductListPage', () => {
    let loginPage: LoginPage
    let productListPage: ProductListPage

    const userRecord0 = UserDataType.fromUserDataJson(userDataJson[0])
    const userRecord2 = UserDataType.fromUserDataJson(userDataJson[2])

    
    test.only('@Visual test product liest page', async ({page}) => {
        loginPage = new LoginPage(page)
        productListPage = new ProductListPage(page)

        await loginPage.visit()
        await loginPage.fillLoginForm(userRecord0, "secret_sauce")
        await productListPage.snapshotProductList()
    })
})