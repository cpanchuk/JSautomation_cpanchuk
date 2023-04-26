const { I } = inject();

module.exports = {
  myAccountSpoiler: {xpath: '//ul[@class="toggle_cont"]'},
  registerLink: {xpath: '//a[contains(text(),"Register")]'},
  submitButton: {xpath: '//input[@type="submit"]'},
  cartSpoiler: {xpath: '//div[@id="cart"]'},
  viewCartButton: {xpath: '//a[contains(text(),"View Cart")]'},
  checkoutButton: {xpath: '//a[contains(text(),"Checkout")]'},
  deleteProductFromCartButton: {xpath: '//i[@class="linearicons-trash"]'},
  
  clickMyAccountSpoiler() {
    I.click(this.myAccountSpoiler);
  },

  clickRegisterLink() {
    I.click(this.registerLink);
  },

  submitForm() {
    I.click(this.submitButton);
  },

  openCart() {
    I.click(this.cartSpoiler);
    I.click(this.viewCartButton);
  },

  goToCheckout() {
    I.click(this.cartSpoiler);
    I.click(this.checkoutButton);
  },

  async checkCartIsNotEmpty() {
    I.click(this.cartSpoiler);
    return await tryTo(() => I.seeElement(this.deleteProductFromCartButton));
  },
  
  async clearCart() {
    if (await this.checkCartIsNotEmpty()) {
      while (await I.grabNumberOfVisibleElements(this.deleteProductFromCartButton)) {
        I.click(this.deleteProductFromCartButton);
      };
    }  
  }
}
