/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type basePage = typeof import('./pages/base.js');
type registerPage = typeof import('./pages/register.js');
type registerconfirmPage = typeof import('./pages/registerConfirm.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, basePage: basePage, registerPage: registerPage, registerconfirmPage: registerconfirmPage }
  interface Methods extends Playwright {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
