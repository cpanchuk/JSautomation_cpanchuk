/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type basePage = typeof import('./pages/base.js');
type registerPage = typeof import('./pages/register.js');
type productPage = typeof import('./pages/product.js');
type checkoutPage = typeof import('./pages/checkout.js');
type ChaiWrapper = import('codeceptjs-chai');
type PageHelper = import('./helpers/pageHelper_helper.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, basePage: basePage, registerPage: registerPage, productPage: productPage, checkoutPage: checkoutPage }
  interface Methods extends Playwright, ChaiWrapper, PageHelper, REST, JSONResponse {}
  interface I extends ReturnType<steps_file>, WithTranslation<ChaiWrapper>, WithTranslation<PageHelper>, WithTranslation<JSONResponse> {}
  namespace Translation {
    interface Actions {}
  }
}
