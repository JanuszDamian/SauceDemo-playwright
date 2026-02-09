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
test.describe.parallel('E2E tests', () => {
  let loginPage: LoginPage
  let productListPage: ProductListPage
  let cartPage: CartPage
  let checkoutPage: CheckoutPage
  let checkoutOverviewPage: CheckoutOverviewPage
  let checkoutCompletePage: CheckoutCompletePage

  const userRecord0 = UserDataType.fromUserDataJson(userDataJson[0])
  const typeOfSortLowToHigh = ProductListDataType.fromProductListDataJson(
    productListDataJson[2],
  )
  const checkoutDataObj1 = CheckoutDataType.fromCheckoutDataJson(
    checkoutDataJson[0],
  )

  test('@E2E - added product to cart, assertValue and back to HomePage', async ({
    page,
  }) => {
    loginPage = new LoginPage(page)
    productListPage = new ProductListPage(page)
    cartPage = new CartPage(page)
    checkoutPage = new CheckoutPage(page)
    checkoutOverviewPage = new CheckoutOverviewPage(page)
    checkoutCompletePage = new CheckoutCompletePage(page)

    await loginPage.visit()
    console.log('I am on the saucedemo login page.')
    await loginPage.fillLoginForm(userRecord0, 'secret_sauce')
    console.log('I completed the login form and clicked the login button')
    await productListPage.loginAssert()
    console.log('I am on the saucedemo product list page.')
    await productListPage.productSorting(typeOfSortLowToHigh.typeOfSort)
    console.log('The products have been sorted')
    await productListPage.assertSortLowToHighPrice()
    console.log('Sorting check Low to High price, completed successfully')
    const numberOfProductToSell = await productListPage.countProducts()
    console.log('The products have been counted.')
    const addProductsToCart = await productListPage.addProductToCart(
      6,
      numberOfProductToSell,
    )
    const assertProductListVariable =
      await productListPage.assertAddedProductsToCart(
        numberOfProductToSell,
        addProductsToCart,
        0,
      )
    await productListPage.goToCart()
    console.log('The shopping cart icon has been clicked')
    await cartPage.cartPageAssert()
    console.log('Checking the entry to the cartPage completed successfully.')
    const numberOfProductsInCartInt = await cartPage.countProductsInCart()
    console.log('Counting products in the cart, completed successfully.')
    await cartPage.assertNumberOfProductsInCart(
      numberOfProductsInCartInt,
      addProductsToCart,
    )
    console.log(
      'Checking the number of products in the cart with the number of products added to the cart was completed successfully',
    )
    await cartPage.assertSumOfPricesInCart(
      assertProductListVariable.productInCartPricesInt,
      addProductsToCart,
    )
    await cartPage.goToCheckoutPage()
    console.log('Checkout Button has been pressed')
    await checkoutPage.checkoutPageAssertTitle()
    console.log('I am on the saucedemo checkout page.')
    await checkoutPage.fillCheckoutForm(checkoutDataObj1)
    console.log('Checkout form has been filled')
    await checkoutPage.goToCheckoutOverviewPage()
    console.log('Continue Button has been pressed.')
    await checkoutOverviewPage.checkoutOverviewPageAssertTitle()
    console.log('I am on the saucedemo checkout overview page.')
    await checkoutOverviewPage.assertPrices(
      assertProductListVariable.productInCartPricesInt,
    )
    await checkoutOverviewPage.finishOrder()
    console.log('Finish Button has been pressed.')
    await checkoutCompletePage.checkoutCompletePageAssertTitle()
    console.log('I am on the saucedemo checkout complete page and there is a notification on the website: Thank you for your order!')
    await checkoutCompletePage.backToHome()
    console.log('BackHome button has been pressed.')
    await productListPage.assertCartBadgeIsNotVisible()
    console.log('The cart is empty')
  })

  test('@E2E - added product to cart, remove product from product list, assertValue and back to HomePage', async ({
    page,
  }) => {
    loginPage = new LoginPage(page)
    productListPage = new ProductListPage(page)
    cartPage = new CartPage(page)
    checkoutPage = new CheckoutPage(page)
    checkoutOverviewPage = new CheckoutOverviewPage(page)
    checkoutCompletePage = new CheckoutCompletePage(page)

    await loginPage.visit()
    console.log('I am on the saucedemo login page.')
    await loginPage.fillLoginForm(userRecord0, 'secret_sauce')
    console.log('I completed the login form and clicked the login button')
    await productListPage.loginAssert()
    console.log('I am on the saucedemo product list page.')
    await productListPage.productSorting(typeOfSortLowToHigh.typeOfSort)
    console.log('The products have been sorted')
    await productListPage.assertSortLowToHighPrice()
    console.log('Sorting check Low to High price, completed successfully')
    const numberOfProductToSell = await productListPage.countProducts()
    console.log('The products have been counted.')
    const addProductsToCart = await productListPage.addProductToCart(
      6,
      numberOfProductToSell,
    )
    const removeProductsFromCart = await productListPage.removeProductFromCart(
      3,
      addProductsToCart,
    )
    const assertProductListVariable =
      await productListPage.assertAddedProductsToCart(
        numberOfProductToSell,
        addProductsToCart,
        removeProductsFromCart,
      )
    await productListPage.goToCart()
    console.log('The shopping cart icon has been clicked')
    await cartPage.cartPageAssert()
    console.log('Checking the entry to the cartPage completed successfully.')
    const numberOfProductsInCartInt = await cartPage.countProductsInCart()
    console.log('Counting products in the cart, completed successfully.')
    await cartPage.assertNumberOfProductsInCart(
      numberOfProductsInCartInt,
      assertProductListVariable.numberOfProductsInCart,
    )
    console.log(
      'Checking the number of products in the cart with the number of products added to the cart was completed successfully',
    )
    await cartPage.assertSumOfPricesInCart(
      assertProductListVariable.productInCartPricesInt,
      assertProductListVariable.numberOfProductsInCart,
    )
    await cartPage.goToCheckoutPage()
    console.log('Checkout Button has been pressed')
    await checkoutPage.checkoutPageAssertTitle()
    console.log('I am on the saucedemo checkout page.')
    await checkoutPage.fillCheckoutForm(checkoutDataObj1)
    console.log('Checkout form has been filled')
    await checkoutPage.goToCheckoutOverviewPage()
    console.log('Continue Button has been pressed.')
    await checkoutOverviewPage.checkoutOverviewPageAssertTitle()
    console.log('I am on the saucedemo checkout overview page.')
    await checkoutOverviewPage.assertPrices(
      assertProductListVariable.productInCartPricesInt,
    )
    await checkoutOverviewPage.finishOrder()
    console.log('Finish Button has been pressed.')
    await checkoutCompletePage.checkoutCompletePageAssertTitle()
    console.log('I am on the saucedemo checkout complete page and there is a notification on the website: Thank you for your order!')
    await checkoutCompletePage.backToHome()
    console.log('BackHome button has been pressed.')
    await productListPage.assertCartBadgeIsNotVisible()
    console.log('The cart is empty')
  })

  test('@E2E - added product to cart, remove product from product list, remove products from Cart, assertValue and back to HomePage', async ({
    page,
  }) => {
    loginPage = new LoginPage(page)
    productListPage = new ProductListPage(page)
    cartPage = new CartPage(page)
    checkoutPage = new CheckoutPage(page)
    checkoutOverviewPage = new CheckoutOverviewPage(page)
    checkoutCompletePage = new CheckoutCompletePage(page)

    await loginPage.visit()
    console.log('I am on the saucedemo login page.')
    await loginPage.fillLoginForm(userRecord0, 'secret_sauce')
    console.log('I completed the login form and clicked the login button')
    await productListPage.loginAssert()
    console.log('I am on the saucedemo product list page.')
    await productListPage.productSorting(typeOfSortLowToHigh.typeOfSort)
    console.log('The products have been sorted')
    await productListPage.assertSortLowToHighPrice()
    console.log('Sorting check Low to High price, completed successfully')
    const numberOfProductToSell = await productListPage.countProducts()
    console.log('The products have been counted.')
    const addProductsToCart = await productListPage.addProductToCart(
      6,
      numberOfProductToSell,
    )
    const removeProductsFromCart = await productListPage.removeProductFromCart(
      1,
      addProductsToCart,
    )
    const assertProductListVariable =
      await productListPage.assertAddedProductsToCart(
        numberOfProductToSell,
        addProductsToCart,
        removeProductsFromCart,
      )
    await productListPage.goToCart()
    console.log('The shopping cart icon has been clicked')
    await cartPage.cartPageAssert()
    console.log('Checking the entry to the cartPage completed successfully.')
    const numberOfProductToRemoveFromCart =
      await cartPage.removeProductFromCart(
        2,
        assertProductListVariable.numberOfProductsInCart,
      )
    const numberOfProductsInCartInt = await cartPage.countProductsInCart()
    console.log('Counting products in the cart, completed successfully.')
    await cartPage.assertNumberOfProductsInCart(
      numberOfProductsInCartInt,
      assertProductListVariable.numberOfProductsInCart -
        numberOfProductToRemoveFromCart,
    )
    console.log(
      'Checking the number of products in the cart with the number of products added to the cart was completed successfully',
    )
    const sumOfPricesInCartInt = await cartPage.SumOfPricesInCartV2(
      numberOfProductsInCartInt,
    )
    await cartPage.goToCheckoutPage()
    console.log('Checkout Button has been pressed')
    await checkoutPage.checkoutPageAssertTitle()
    console.log('I am on the saucedemo checkout page.')
    await checkoutPage.fillCheckoutForm(checkoutDataObj1)
    console.log('Checkout form has been filled')
    await checkoutPage.goToCheckoutOverviewPage()
    console.log('Continue Button has been pressed.')
    await checkoutOverviewPage.checkoutOverviewPageAssertTitle()
    console.log('I am on the saucedemo checkout overview page.')
    await checkoutOverviewPage.assertPrices(sumOfPricesInCartInt)
    await checkoutOverviewPage.finishOrder()
    console.log('Finish Button has been pressed.')
    await checkoutCompletePage.checkoutCompletePageAssertTitle()
    console.log('I am on the saucedemo checkout complete page and there is a notification on the website: Thank you for your order!')
    await checkoutCompletePage.backToHome()
    console.log('BackHome button has been pressed.')
    await productListPage.assertCartBadgeIsNotVisible()
    console.log('The cart is empty')
  })
})
