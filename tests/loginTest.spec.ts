import { test } from '@playwright/test'
import { LoginPage } from '../page-objects/LoginPage'
import { ProductListPage } from '../page-objects/ProductListPage'
import { UserDataType } from '../data/types/userDataTypes'
import userDataJson from '../data/userData.json'

  //user=handlowiec
test.describe.parallel('Login tests', () => {
    let loginPage: LoginPage
    let productListPage: ProductListPage

    const userRecord0 = UserDataType.fromUserDataJson(userDataJson[0])
    const userRecord6 = UserDataType.fromUserDataJson(userDataJson[6])
    
    test('@Login - positive scenario', async ({page}) => {

        loginPage = new LoginPage(page)
        productListPage = new ProductListPage(page)
        await loginPage.visit()
        await loginPage.fillLoginForm(userRecord0, "secret_sauce")
        await productListPage.loginAssert()
    })

    test('@Login - correct User, incorrect password', async ({page}) => {
        loginPage = new LoginPage(page)
        productListPage = new ProductListPage(page)

        await loginPage.visit()
        await loginPage.fillLoginForm(userRecord0, "incorrectPassword")
        await loginPage.assertErrorNotyfication()
    })

    test('@Login - incorrect User, correct password', async ({page}) => {
        loginPage = new LoginPage(page)
        productListPage = new ProductListPage(page)

        await loginPage.visit()
        await loginPage.fillLoginForm(userRecord6, "secret_sauce")
        await loginPage.assertErrorNotyfication()
    })

    test('@Login - incorrect User, incorrect password', async ({page}) => {
        loginPage = new LoginPage(page)
        productListPage = new ProductListPage(page)

        await loginPage.visit()
        await loginPage.fillLoginForm(userRecord6, "incorrectPassword2")
        await loginPage.assertErrorNotyfication()
    })
})


