import { test } from '@playwright/test'
import { LoginPage } from '../page-objects/LoginPage'
import { ProductListPage } from '../page-objects/ProductListPage'
import { UserDataType } from '../data/types/userDataTypes'
import userDataJson from '../data/userData.json'
import { Logger } from '../utils/logger'

  //user=handlowiec
test.describe.parallel('Login tests', () => {
    let loginPage: LoginPage
    let productListPage: ProductListPage
    let logger = new Logger()

    const userRecord0 = UserDataType.fromUserDataJson(userDataJson[0])
    const userRecord6 = UserDataType.fromUserDataJson(userDataJson[6])
    
    test('@Login - positive scenario', async ({page}, testInfo) => {

        await testInfo.attach("Logi scenariusza", {
        body: logger.getLogs(),
        contentType: "text/plain"
    })

        loginPage = new LoginPage(page, logger)
        productListPage = new ProductListPage(page, logger)
        await loginPage.visit()
        await loginPage.fillLoginForm(userRecord0, "secret_sauce")
        await productListPage.loginAssert()
    })

    test('@Login - correct User, incorrect password', async ({page}, testInfo) => {
        loginPage = new LoginPage(page, logger)
        productListPage = new ProductListPage(page, logger)

        await testInfo.attach("Logi scenariusza", {
        body: logger.getLogs(),
        contentType: "text/plain"
    })

        await loginPage.visit()
        await loginPage.fillLoginForm(userRecord0, "incorrectPassword")
        await loginPage.assertErrorNotyfication()
    })

    test('@Login - incorrect User, correct password', async ({page}, testInfo) => {
        loginPage = new LoginPage(page, logger)
        productListPage = new ProductListPage(page, logger)

        await testInfo.attach("Logi scenariusza", {
        body: logger.getLogs(),
        contentType: "text/plain"
    })

        await loginPage.visit()
        await loginPage.fillLoginForm(userRecord6, "secret_sauce")
        await loginPage.assertErrorNotyfication()
    })

    test('@Login - incorrect User, incorrect password', async ({page}, testInfo) => {
        loginPage = new LoginPage(page, logger)
        productListPage = new ProductListPage(page, logger)

        await testInfo.attach("Logi scenariusza", {
        body: logger.getLogs(),
        contentType: "text/plain"
    })

        await loginPage.visit()
        await loginPage.fillLoginForm(userRecord6, "incorrectPassword2")
        await loginPage.assertErrorNotyfication()
    })
})


