/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type basePage = typeof import('./pages/base.js');
type registerPage = typeof import('./pages/register.js');
type testProductPage = typeof import('./pages/testProduct.js');
type checkoutPage = typeof import('./pages/checkout.js');
type ChaiWrapper = import('codeceptjs-chai');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, basePage: basePage, registerPage: registerPage, testProductPage: testProductPage, checkoutPage: checkoutPage }
  interface Methods extends Playwright, ChaiWrapper {}
  interface I extends ReturnType<steps_file>, WithTranslation<ChaiWrapper> {}
  namespace Translation {
    interface Actions {}
  }
}
