const FILEREADER = require("../helpers/fileReader");

const urlArray = FILEREADER.readFileContent().split('\r\n');
console.log(urlArray);


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

Before(({ I }) =>{
    I.login(USER); 
})

Data(urlArray).Scenario('buy product',  async ({ I, current, basePage, productPage, checkoutPage}) => {
    await basePage.clearCart(); 
    I.amOnPage(current);
    await productPage.chooseProductColour();
    await productPage.chooseProductSize();
    let productPrice = await productPage.getSumOfProductPrices();
    productPage.addProductToCart();
    basePage.goToCheckout();
    if (await checkoutPage.checkProductAvailability()) {
        console.log('Product is not available.');
    } else {
        checkoutPage.fillBillingDetails(USER);
        checkoutPage.submitShippingAddress();
        checkoutPage.submitShippingMethod();
        checkoutPage.submitPaymentAddress();
        let productTax = await checkoutPage.getSumOfTaxes();
        let checkoutTotalPrice = await checkoutPage.grabCheckoutPrice();
        I.assertEqual(productPrice + productTax, checkoutTotalPrice);
        checkoutPage.confirmOrder();
        I.see('Your order has been placed!')
    };

}).tag("buy");
