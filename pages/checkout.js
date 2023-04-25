const { I } = inject();

module.exports = {
  newAddressToggle: {xpath: '//*[@id="payment_addressnew1"]/following-sibling::label'},
  paymentFirstName: {xpath: '//*[@id="input-payment-firstname"]'},
  paymentLastName: {xpath: '//*[@id="input-payment-lastname"]'},
  paymentAddress1: {xpath: '//*[@id="input-payment-address-1"]'},
  paymentCity: {xpath: '//*[@id="input-payment-city"]'},
  paymentPostCode: {xpath: '//*[@id="input-payment-postcode"]'},
  paymentCountrySelector: {xpath: '//label[contains(text(),"Country")]/following-sibling::div'},
  paymentCountryUkraine: {xpath: '//a[contains(text(),"Ukraine")]'},
  paymentRegionSelector: {xpath: '//label[contains(text(),"Region")]/following-sibling::div'},
  paymentRegionCrimea: {xpath: '//a[contains(text(),"Crimea")]'},
  submitPaymentAddressButton: {xpath: '//*[@id="button-payment-address"]'},
  submitShippingAddressButton: {xpath: '//*[@id="button-shipping-address"]'},
  submitShippingMethodButton: {xpath: '//*[@id="button-shipping-method"]'},
  agreeToTermsCheckbox: {xpath: '//*[@id="agree1"]'},
  submitPaymentMethodButton: {xpath: '//*[@id="button-payment-method"]'},
  confirmOrderButton: {xpath: '//*[@id="button-confirm"]'},

  shippingRate: {xpath: '//table[@class="table table-bordered table-hover"]/tfoot/tr[2]/td[2]'},
  ecoTax: {xpath: '//table[@class="table table-bordered table-hover"]/tfoot/tr[3]/td[2]'},
  vat: {xpath: '//table[@class="table table-bordered table-hover"]/tfoot/tr[4]/td[2]'},
  checkoutTotal: {xpath: '//table[@class="table table-bordered table-hover"]/tfoot/tr[5]/td[2]'},
  orderCorfinmed: {xpath: '//div[@class="col-sm-12"]/h1'},

 
  fillBillingDetails (user) {
    I.click(this.newAddressToggle);
    I.fillField(this.paymentFirstName, user.firstName);
    I.fillField(this.paymentLastName, user.lastName);
    I.fillField(this.paymentAddress1, user.address);
    I.fillField(this.paymentCity, user.city);
    I.fillField(this.paymentPostCode, user.postCode);
    I.click(this.paymentCountrySelector);
    I.click(this.paymentCountryUkraine);
    I.click(this.paymentRegionSelector);
    I.click(this.paymentRegionCrimea);
    I.click(this.submitPaymentAddressButton);
  },

  submitShippingAddress () {
    I.click(this.submitShippingAddressButton);
  },

  submitShippingMethod () {
    I.click(this.submitShippingMethodButton);
  },

  submitPaymentAddress () {
    I.click(this.agreeToTermsCheckbox);
    I.click(this.submitPaymentMethodButton);
  },

  confirmOrder () {
    I.click(this.confirmOrderButton);
  },

  async getSumOfTaxes () {
    let shippingRatePrice = parseFloat((await I.grabTextFrom(this.shippingRate)).match('([0-9]*[.])[0-9]*')[0]);
    let ecoTaxPrice = parseFloat((await I.grabTextFrom(this.ecoTax)).match('([0-9]*[.])[0-9]*')[0]);
    let vatPrice = parseFloat((await I.grabTextFrom(this.vat)).match('([0-9]*[.])[0-9]*')[0]);
    let sumOfTaxes = shippingRatePrice + ecoTaxPrice + vatPrice;
    return sumOfTaxes;
  },

  async grabCheckoutPrice () {
    let checkoutTotalPrice = 
      parseFloat((await I.grabTextFrom(this.checkoutTotal)).match('([0-9]*[,]|[.]*[0-9]*[.])+[0-9]*')[0].replace(',', ''));

    return checkoutTotalPrice;
  },

  checkOrderConfirm() {
    I.see(this.orderConfirmed);
  }

}
