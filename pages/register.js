const { I } = inject();

module.exports = {
  firstNameField: {xpath: '//*[@id="input-firstname"]'},
  lastNameField: {xpath: '//*[@id="input-lastname"]'},
  emailField: {xpath: '//*[@id="input-email"]'},
  telephoneField: {xpath: '//*[@id="input-telephone"]'},
  passwordField: {xpath: '//*[@id="input-password"]'},
  passwordConfirmField: {xpath: '//*[@id="input-confirm"]'},
  privacyPolicyConfirmToggle: {xpath: '//*[@id="content"]/form/div/div/input[1]'},
  continueButton: {xpath: '//*[@id="content"]/form/div/div/input[2]'},


  verifyRegisterPage() {
    I.see('Register Account');
  },

  fillNewUserForm(user) {
    I.fillField(this.firstNameField, user.firstName);
    I.fillField(this.lastNameField, user.lastName);
    I.fillField(this.emailField, user.email);
    I.fillField(this.telephoneField, user.telephone);
    I.fillField(this.passwordField, user.password);
    I.fillField(this.passwordConfirmField, user.password);
  },

  agreeToPrivacyPolicy() {
    I.click(this.privacyPolicyConfirmToggle);
  },

  completeRegistration() {
    I.click(this.continueButton);
  },

  verifyRegisterConfirmPage() {
    I.see('Your Account Has Been Created!');
  },
   
}