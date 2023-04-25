Feature('register');

const NEW_USER = {
    firstName: "Pavlo",
    lastName: "15",
    email: Date.now()+ '@test.com',
    telephone: "+8005674564",
    password: "Test4587"
};

Scenario('register new user',  ({ I, basePage, registerPage, }) => {
    I.openStore();
    basePage.clickMyAccountSpoiler();
    basePage.clickRegisterLink();
    registerPage.verifyRegisterPage();
    registerPage.fillNewUserForm(NEW_USER);
    registerPage.agreeToPrivacyPolicy();
    registerPage.completeRegistration();
    registerPage.verifyRegisterConfirmPage();  
    
});
