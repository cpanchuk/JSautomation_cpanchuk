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

Scenario.only('buy product',  async ({ I, basePage, productPage, checkoutPage}) => {
    I.login(USER);
    await basePage.clearCart(); 
    pause();
    I.amOnPage("http://opencart.qatestlab.net/index.php?route=product/product&product_id=45");
    productPage.chooseProductColour();
    productPage.chooseProductSize();
    let productPrice = await productPage.getSumOfProductPrices();
    productPage.addProductToCart();
    basePage.goToCheckout();
    checkoutPage.fillBillingDetails(USER);
    checkoutPage.submitShippingAddress();
    checkoutPage.submitShippingMethod();
    checkoutPage.submitPaymentAddress();
    let productTax = await checkoutPage.getSumOfTaxes();
    let checkoutTotalPrice = await checkoutPage.grabCheckoutPrice();
    I.assertEqual(productPrice + productTax, checkoutTotalPrice);
    checkoutPage.confirmOrder();
    I.see('Your order has been placed!');

}).tag("buy");
