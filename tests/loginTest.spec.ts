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

  test('@Login - positive scenario', async ({ page }) => {
    loginPage = new LoginPage(page)
    productListPage = new ProductListPage(page)
    await loginPage.visit()
    console.log('I am on the saucedemo login page.')
    await loginPage.fillLoginForm(userRecord0, 'secret_sauce')
    console.log('I completed the login form and clicked the login button')
    await productListPage.loginAssert()
    console.log('I am on the saucedemo product list page.')
  })

  test('@Login - correct User, incorrect password', async ({ page }) => {
    loginPage = new LoginPage(page)
    productListPage = new ProductListPage(page)

    await loginPage.visit()
    console.log('I am on the saucedemo login page.')
    await loginPage.fillLoginForm(userRecord0, 'incorrectPassword')
    console.log('I completed the login form and clicked the login button')
    await loginPage.assertErrorNotyfication()
    console.log('Notification about incorrect login or password.')
  })

  test('@Login - incorrect User, correct password', async ({ page }) => {
    loginPage = new LoginPage(page)
    productListPage = new ProductListPage(page)

    await loginPage.visit()
    console.log('I am on the saucedemo login page.')
    await loginPage.fillLoginForm(userRecord6, 'secret_sauce')
    console.log('I completed the login form and clicked the login button')
    await loginPage.assertErrorNotyfication()
    console.log('Notification about incorrect login or password.')
  })

  test('@Login - incorrect User, incorrect password', async ({ page }) => {
    loginPage = new LoginPage(page)
    productListPage = new ProductListPage(page)

    await loginPage.visit()
    console.log('I am on the saucedemo login page.')
    await loginPage.fillLoginForm(userRecord6, 'incorrectPassword2')
    console.log('I completed the login form and clicked the login button')
    await loginPage.assertErrorNotyfication()
    console.log('Notification about incorrect login or password.')
  })
})
