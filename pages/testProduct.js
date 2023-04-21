const { I } = inject();

module.exports = {
  colorListSpoiler: {xpath: '//label[contains(text(),"Color")]/following-sibling::div'},
  chooseColor: {xpath: '//label[contains(text(),"Color")]/following-sibling::div/ul/li[2]'},
  sizeListSpoiler: {xpath: '//label[contains(text(),"Size")]/following-sibling::div'},
  chooseSize: {xpath: '//label[contains(text(),"Size")]/following-sibling::div/ul/li[2]'},
  addToCartButton: {xpath: '//button[@id="button-cart"]'},

  chooseProductColor() {
    I.click(this.colorListSpoiler);
    I.click(this.chooseColor);
  },

  chooseProductSize() {
    I.click(this.sizeListSpoiler);
    I.click(this.chooseSize);
  },

  addProductToCart() {
    I.click(this.addToCartButton);
  }
}
