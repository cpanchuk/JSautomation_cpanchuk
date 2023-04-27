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
    if (await this.checkColourExists()) {
      I.click(this.colourListSpoiler);
      I.click(this.chooseColour);
    } 
  },  

  async getColourPrice() {
    let colourPrice = 0;
    if (await this.checkColourExists()) {
      colourPrice = parseFloat((await I.grabTextFrom(this.chooseColour)).replaceAll(/[^0-9\.]/g, ""));
    } 
    return colourPrice;

  },

  async checkSizeExists() {
    return await tryTo(() => I.seeElement(this.sizeListSpoiler));
  },

  async chooseProductSize() {
    if (await this.checkSizeExists()) {
      I.click(this.sizeListSpoiler);
      I.click(this.chooseSize);
    } 
  },

  async getSizePrice() {
    let sizePrice = 0;
    if (await this.checkSizeExists()) {
      sizePrice = parseFloat((await I.grabTextFrom(this.chooseSize)).replaceAll(/[^0-9\.]/g, ""));
    } 
    return sizePrice;
  },

  async getSumOfProductPrices () {
    let basePrice = parseFloat((await I.grabTextFrom(this.baseProductPrice)).replaceAll(/[^0-9\.]/g, ""));
    let sumOfProductPrices = (basePrice + await this.getColourPrice() + await this.getSizePrice());
    return sumOfProductPrices;
    
  },

  addProductToCart() {
    I.click(this.addToCartButton);
  },


}