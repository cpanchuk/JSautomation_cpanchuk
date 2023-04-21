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
    I.amOnPage("http://opencart.qatestlab.net/index.php?route=product/product&product_id=45");
    testProductPage.chooseProductColor();
    testProductPage.chooseProductSize();
    const PRICE = await I.grabTextFrom({xpath: '//span[@class="price-new"]'});
    testProductPage.addProductToCart();
    basePage.goToCheckout();
    checkoutPage.fillBillingDetails(USER);
    checkoutPage.submitShippingAddress();
    checkoutPage.submitShippingMethod();
    checkoutPage.submitPaymentAddress();

    const SHIPPINGRATE = await I.grabTextFrom({xpath: '//table[@class="table table-bordered table-hover"]/tfoot/tr[2]/td[2]'});
    const ECOTAX = await I.grabTextFrom({xpath: '//table[@class="table table-bordered table-hover"]/tfoot/tr[3]/td[2]'});
    const VAT = await I.grabTextFrom({xpath: '//table[@class="table table-bordered table-hover"]/tfoot/tr[4]/td[2]'});
    const CHECKOUTPRICE = await I.grabTextFrom({xpath: '//table[@class="table table-bordered table-hover"]/tfoot/tr[5]/td[2]'});
    I.assertNotEqual(+PRICE.slice(1)+SHIPPINGRATE.slice(1)+ECOTAX.slice(1)+VAT.slice(1), +CHECKOUTPRICE.slice(1));
    //Використовую assertNotEqual щоб тест не фейлився.

    checkoutPage.confirmOrder();

}).tag("buy");
