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
    let productPrice = await productPage.sumOfProductPrices();
    productPage.addProductToCart();
    basePage.goToCheckout();
    if (await checkoutPage.checkIfProductNotAvailable()) {
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
        checkoutPage.verifyPurchaseSuccessful();

    const response = await I.sendGetRequest("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json");
    I.seeResponseCodeIs(200);
    const usdRate = response.data[0].rate;
    console.log("Price in UAH is: " + (checkoutTotalPrice * usdRate));
    

    };

}).tag("buy");
