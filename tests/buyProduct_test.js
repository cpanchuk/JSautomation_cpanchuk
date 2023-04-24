const USER = {
    email: "111888@test.com",
    password: "Test4587",
    firstName: "Pavlo",
    lastName: "Testerov",
    address: "Kalyna st. 25 appt. 8",
    city: "Sevastopol",
    postCode: "567857",
}

Feature('purchase');

Scenario.only('buy product',  async ({ I, basePage, testProductPage, checkoutPage}) => {
    I.login(USER);
    //basePage.clearCart();  спроби почистити корзину крашать браузер до завершення процессу

    I.amOnPage("http://opencart.qatestlab.net/index.php?route=product/product&product_id=45");
    testProductPage.chooseProductColour();
    testProductPage.chooseProductSize();
    let sumProductPrice = await testProductPage.grabProductPrices();
    testProductPage.addProductToCart();
    basePage.goToCheckout();
    checkoutPage.fillBillingDetails(USER);
    checkoutPage.submitShippingAddress();
    checkoutPage.submitShippingMethod();
    checkoutPage.submitPaymentAddress();
    let sumTaxPrices = await checkoutPage.grabTaxPrices();
    let checkoutTotalPrice = await checkoutPage.grabCheckoutPrice();
    I.assertEqual(sumProductPrice + sumTaxPrices, checkoutTotalPrice);
    checkoutPage.confirmOrder();
    I.see('Your order has been placed!');

}).tag("buy");
