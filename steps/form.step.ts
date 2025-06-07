import { Page, expect } from '@playwright/test';
import { UserProfilePage } from '../pages/UserProfilePage';

export class FormStep {
  private form: UserProfilePage;
  private dialogMessage: string = '';
  private errors: string[] = [];

  constructor(public page: Page) {
    this.form = new UserProfilePage(page);
  }

  async given_i_navigate_to_the_user_profile_form() {
    await this.form.goto();
  }

  async when_i_fill_first_name_with(value: string) {
    await this.form.fillFirstName(value);
  }

  async and_i_fill_last_name_with(value: string) {
    await this.form.fillLastName(value);
  }

  async and_i_fill_email_with(value: string) {
    await this.form.fillEmail(value);
  }

  async then_i_should_see_native_popup_with(expectedMessage: string) {
  const messages = await this.form.getInvalidInputValidationMessages();
  console.log('Validation Messages:', messages);
  const combined = messages.join(' ').toLowerCase();
  expect(combined).toContain(expectedMessage.toLowerCase());
}

  async and_i_fill_password_with(value: string) {
    await this.form.fillPassword(value);
  }

  async and_i_fill_confirm_password_with(value: string) {
    await this.form.fillConfirmPassword(value);
  }

  async when_i_fill_linkedin_with(value: string) {
    await this.form.fillLinkedIn(value);
  }

  async when_i_fill_github_with(value: string) {
    await this.form.fillGitHub(value);
  }

  async and_i_submit_the_form_and_capture_dialog() {
    const dialogPromise = this.form.captureDialog();
    await this.form.submit();
    this.dialogMessage = await dialogPromise;
    this.errors = await this.form.getErrorMessages();

    // ✅ Log dialog message
console.log(
  this.dialogMessage
    ? ` Captured dialog message: "${this.dialogMessage}"`
    : ' No dialog appeared.'
);
  }

  async then_i_should_not_see_a_dialog() {
    expect(this.dialogMessage).toBe('');
  }

  async then_i_should_see_error_message(expectedMessage: string) {
  const dialog = this.dialogMessage?.toLowerCase() ?? '';
  const combinedErrors = this.errors.join(' ').toLowerCase();
  
  console.log(` Checking if error contains: "${expectedMessage}"`);
  console.log(` Dialog message: "${dialog}"`);


  expect(dialog || combinedErrors).toContain(expectedMessage.toLowerCase());
}


}
