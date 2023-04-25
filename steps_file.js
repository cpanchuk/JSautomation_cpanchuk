const base = require("./pages/base");

const STORE_URL = "http://opencart.qatestlab.net/"

module.exports = function() {
  const signInButton = {xpath: "//a[contains(text(),'Sign In')]"};
  const emailField = {css: "input#input-email"};
  const passwordField = {css: "input#input-password"};

  return actor({
    openStore() {
      this.amOnPage(STORE_URL);
    },
   
    login(user) {
      this.openStore();
      this.click(signInButton);
      this.fillField(emailField, user.email);
      this.fillField(passwordField, user.password);
      base.submitForm();
      this.see("My Orders");
    },
    
  });
}
