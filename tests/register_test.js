const { fillNewUserForm } = require("../pages/register");

Feature('register');

const NEW_USER = {
    firstName: "Pavlo",
    lastName: "15",
    email: Date.now()+ '@test.com',
    telephone: "+8005674564",
    password: "Test4587"
};

Scenario('register new user',  ({ I, basePage, registerPage }) => {
    I.amOnPage('http://opencart.qatestlab.net/');
    basePage.clickMyAccountSpoiler();
    basePage.clickRegisterLink();
    registerPage.verifyRegisterPage();
    registerPage.fillNewUserForm(NEW_USER);
    registerPage.agreeToPrivacyPolicy();
    registerPage.completeRegistration();
    registerPage.verifyRegisterConfirmPage();  //Тест успішний
    
    //I.see('Your Account Has Been Created!'); //Тест успішний

    //registerConfirmPage.verifyRegisterConfirmPage();  
    /* При створенні сторінки підтвердження реєстрації як нової сторінки 
    Тест фейлиться з помилкою: registerConfirmPage is not defined*/
});
