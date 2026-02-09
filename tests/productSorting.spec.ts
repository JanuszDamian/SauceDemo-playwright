import { test } from '@playwright/test'
import { LoginPage } from '../page-objects/LoginPage'
import { ProductListPage } from '../page-objects/ProductListPage'
import { UserDataType } from '../data/types/userDataTypes'
import userDataJson from '../data/userData.json'
import { ProductListDataType } from '../data/types/productListDataTypes'
import productListDataJson from '../data/productListData.json'

//user=handlowiec
test.describe.parallel('Sorting tests', () => {
  let loginPage: LoginPage
  let productListPage: ProductListPage

  const userRecord0 = UserDataType.fromUserDataJson(userDataJson[0])
  const typeOfSort0 = ProductListDataType.fromProductListDataJson(
    productListDataJson[0],
  )
  const typeOfSort1 = ProductListDataType.fromProductListDataJson(
    productListDataJson[1],
  )
  const typeOfSort2 = ProductListDataType.fromProductListDataJson(
    productListDataJson[2],
  )
  const typeOfSort3 = ProductListDataType.fromProductListDataJson(
    productListDataJson[3],
  )

  test('@Sorting - price low to high', async ({ page }) => {
    loginPage = new LoginPage(page)
    productListPage = new ProductListPage(page)

    await loginPage.visit()
    console.log('I am on the saucedemo login page.')
    await loginPage.fillLoginForm(userRecord0, 'secret_sauce')
    console.log('I completed the login form and clicked the login button')
    await productListPage.loginAssert()
    console.log('I am on the saucedemo product list page.')
    await productListPage.productSorting(typeOfSort2.typeOfSort)
    console.log('The products have been sorted.')
    await productListPage.assertSortLowToHighPrice()
    console.log('Sorting check Low to High price, completed successfully')
  })

  test('@Sorting - price high to low', async ({ page }, testInfo) => {
    loginPage = new LoginPage(page)
    productListPage = new ProductListPage(page)

    await loginPage.visit()
    console.log('I am on the saucedemo login page.')
    await loginPage.fillLoginForm(userRecord0, 'secret_sauce')
    console.log('I completed the login form and clicked the login button')
    await productListPage.loginAssert()
    console.log('I am on the saucedemo product list page.')
    await productListPage.productSorting(typeOfSort3.typeOfSort)
    console.log('The products have been sorted.')
    await productListPage.assertSortHighToLowPrice()
    console.log('Sorting check Hight to low price, completed successfully')
  })

  test('@Sorting - name - a to z', async ({ page }, testInfo) => {
    loginPage = new LoginPage(page)
    productListPage = new ProductListPage(page)

    await loginPage.visit()
    console.log('I am on the saucedemo login page.')
    await loginPage.fillLoginForm(userRecord0, 'secret_sauce')
    console.log('I completed the login form and clicked the login button')
    await productListPage.loginAssert()
    console.log('I am on the saucedemo product list page.')
    await productListPage.productSorting(typeOfSort0.typeOfSort)
    console.log('The products have been sorted.')
    await productListPage.assertSortAToZName()
    console.log('Sorting check A to Z, completed successfully')
  })

  test('@Sorting - name - z to a', async ({ page }) => {
    loginPage = new LoginPage(page)
    productListPage = new ProductListPage(page)

    await loginPage.visit()
    console.log('I am on the saucedemo login page.')
    await loginPage.fillLoginForm(userRecord0, 'secret_sauce')
    console.log('I completed the login form and clicked the login button')
    await productListPage.loginAssert()
    console.log('I am on the saucedemo product list page.')
    await productListPage.productSorting(typeOfSort1.typeOfSort)
    console.log('The products have been sorted.')
    await productListPage.assertSortZToAName()
    console.log('Sorting check Z to A, completed successfully')
  })
})
