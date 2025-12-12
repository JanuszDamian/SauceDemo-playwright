import { test } from '@playwright/test'
import { LoginPage } from '../page-objects/LoginPage'
import { ProductListPage } from '../page-objects/ProductListPage'
import { UserDataType } from '../data/types/userDataTypes'
import userDataJson from '../data/userData.json'
import { ProductListDataType } from '../data/types/productListDataTypes'
import productListDataJson from '../data/productListData.json'

  //user=handlowiec
test.describe.parallel('Login tests', () => {
    let loginPage: LoginPage
    let productListPage: ProductListPage

    const userRecord0 = UserDataType.fromUserDataJson(userDataJson[0])
    const typeOfSort0 = ProductListDataType.fromProductListDataJson(productListDataJson[0])
    const typeOfSort1 = ProductListDataType.fromProductListDataJson(productListDataJson[1])
    const typeOfSort2 = ProductListDataType.fromProductListDataJson(productListDataJson[2])
    const typeOfSort3 = ProductListDataType.fromProductListDataJson(productListDataJson[3])
    
    test('@Sorting - price low to high', async ({page}) => {
        loginPage = new LoginPage(page)
        productListPage = new ProductListPage(page)

        await loginPage.visit()
        await loginPage.fillLoginForm(userRecord0, "secret_sauce")
        await productListPage.loginAssert()
        await productListPage.productSorting(typeOfSort2.typeOfSort)
        await productListPage.assertSortLowToHighPrice()
    })

    test('@Sorting - price high to low', async ({page}, testInfo) => {
        loginPage = new LoginPage(page)
        productListPage = new ProductListPage(page)

        await loginPage.visit()
        await loginPage.fillLoginForm(userRecord0, "secret_sauce")
        await productListPage.loginAssert()
        await productListPage.productSorting(typeOfSort3.typeOfSort)
        await productListPage.assertSortHighToLowPrice()
    })

    test('@Sorting - name - a to z', async ({page}, testInfo) => {
        loginPage = new LoginPage(page)
        productListPage = new ProductListPage(page)

        await loginPage.visit()
        await loginPage.fillLoginForm(userRecord0, "secret_sauce")
        await productListPage.loginAssert()
        await productListPage.productSorting(typeOfSort0.typeOfSort)
        await productListPage.assertSortAToZName()
    })

    test('@Sorting - name - z to a', async ({page}) => {
        loginPage = new LoginPage(page)
        productListPage = new ProductListPage(page)

        await loginPage.visit()
        await loginPage.fillLoginForm(userRecord0, "secret_sauce")
        await productListPage.loginAssert()
        await productListPage.productSorting(typeOfSort1.typeOfSort)
        await productListPage.assertSortZToAName()
    })
})