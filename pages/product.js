const base = require("./base");

const { I } = inject();

module.exports = {
  colourListSpoiler: {xpath: '//label[contains(text(),"Color")]/following-sibling::div'},
  chooseColour: {xpath: '//label[contains(text(),"Color")]/following-sibling::div/ul/li[2]'},
  sizeListSpoiler: {xpath: '//label[contains(text(),"Size")]/following-sibling::div'},
  chooseSize: {xpath: '//label[contains(text(),"Size")]/following-sibling::div/ul/li[2]'},
  addToCartButton: {xpath: '//button[@id="button-cart"]'},
  baseProductPrice: {xpath: '//div[@class="price"]/span'},

  async checkColourExists() {
    return await tryTo(() => I.seeElement(this.colourListSpoiler));
  },
  
  async chooseProductColour() {
    let colourPrice = 0;
    if (await this.checkColourExists()) {
      I.click(this.colourListSpoiler);
      I.click(this.chooseColour);
      colourPrice = parseFloat((await I.grabTextFrom(this.chooseColour)).match('([0-9]*[.])[0-9]*')[0]);
    } 
    return (colourPrice);

  },  

  async checkSizeExists() {
    return await tryTo(() => I.seeElement(this.sizeListSpoiler));
  },

  async chooseProductSize() {
    let sizePrice = 0;
    if (await this.checkSizeExists()) {
      I.click(this.sizeListSpoiler);
      I.click(this.chooseSize);
      sizePrice = parseFloat((await I.grabTextFrom(this.chooseSize)).match('([0-9]*[.])[0-9]*')[0]);
    } 
    return (sizePrice);
  },

  async getSumOfProductPrices () {
    let basePrice = parseFloat((await I.grabTextFrom(this.baseProductPrice)).match('([0-9]*[.])[0-9]*')[0]);
    let sumOfProductPrices = (basePrice + await this.chooseProductColour() + await this.chooseProductSize());
    return sumOfProductPrices;
    
  },

  addProductToCart() {
    I.click(this.addToCartButton);
  },


}