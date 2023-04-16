const { I } = inject();

module.exports = {

  verifyRegisterConfirmPage() {
    I.see('Your Account Has Been Created!');
  },
}
