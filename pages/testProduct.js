const base = require("./base");

const { I } = inject();

module.exports = {
  colourListSpoiler: {xpath: '//label[contains(text(),"Color")]/following-sibling::div'},
  chooseColour: {xpath: '//label[contains(text(),"Color")]/following-sibling::div/ul/li[2]'},
  sizeListSpoiler: {xpath: '//label[contains(text(),"Size")]/following-sibling::div'},
  chooseSize: {xpath: '//label[contains(text(),"Size")]/following-sibling::div/ul/li[2]'},
  addToCartButton: {xpath: '//button[@id="button-cart"]'},
  baseProductPrice: {xpath: '//span[@class="price-new"]'},

  

  chooseProductColour() {
    I.click(this.colourListSpoiler);
    I.click(this.chooseColour);
  },

  chooseProductSize() {
    I.click(this.sizeListSpoiler);
    I.click(this.chooseSize);
  },

  addProductToCart() {
    I.click(this.addToCartButton);
  },


  async grabProductPrices () {
    let basePrice = parseFloat((await I.grabTextFrom(this.baseProductPrice)).match('([0-9]*[.])[0-9]*')[0]);
    let colourPrice = parseFloat((await I.grabTextFrom(this.chooseColour)).match('([0-9]*[.])[0-9]*')[0]);
    let sizePrice = parseFloat((await I.grabTextFrom(this.chooseSize)).match('([0-9]*[.])[0-9]*')[0]);

    return this.sumProductPrices(basePrice, colourPrice, sizePrice);
    
  },
  
  sumProductPrices(basePrice, colourPrice, sizePrice) {
    let sum = (basePrice + colourPrice + sizePrice) * 2; 
    //баг данного продукту, у корзину автоматично додаються 2 одиниці товару
    return sum;
  }
}