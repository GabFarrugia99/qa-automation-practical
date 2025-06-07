
import { Page } from '@playwright/test';

export class UserProfilePage {
  constructor(public page: Page) {}

  async goto() {
    await this.page.goto('/');
    await this.page.waitForSelector('form');
  }

  async fillFirstName(value: string) {
    await this.page.locator('input[name="firstName"]').fill(value);
  }

  async fillLastName(value: string) {
    await this.page.locator('input[name="lastName"]').fill(value);
  }

  async fillEmail(value: string) {
    await this.page.locator('input[name="email"]').fill(value);
  }

  async fillPassword(value: string) {
    await this.page.locator('input[name="password"]').fill(value);
  }

  async fillConfirmPassword(value: string) {
    await this.page.locator('input[name="confirmPassword"]').fill(value);
  }

async fillLinkedIn(value: string) {
  const linkedinField = this.page.locator('#linkedIn');
  await linkedinField.waitFor({ state: 'visible', timeout: 5000 });
  await linkedinField.fill(value);
}


async isFormSubmissionBlocked(): Promise<boolean> {
  return await this.page.$eval('form', form => !form.checkValidity());
}

async getInvalidInputValidationMessages(): Promise<string[]> {
  return await this.page.$$eval('input:invalid', inputs =>
    inputs.map(input => (input as HTMLInputElement).validationMessage)
  );
}
  async fillGitHub(value: string) {
    await this.page.locator('input[name="github"]').fill(value);
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Submit' }).dblclick();
  }

  async captureDialog(): Promise<string> {
  return new Promise((resolve) => {
    let resolved = false;

    this.page.once('dialog', async dialog => {
      const msg = dialog.message();
      resolved = true;
      resolve(msg);
      await dialog.dismiss();
    });

    
    setTimeout(() => {
      if (!resolved) resolve('');
    }, 3000);
  });
}
async getErrorMessages(): Promise<string[]> {
  const pageErrors = await this.page
    .locator('.validation-error, .error-message, [role="alert"]')
    .allTextContents();

  let alertMessage = '';

  const alertPromise = this.page.waitForEvent('dialog', { timeout: 3000 }).then(async (dialog) => {
    alertMessage = dialog.message();
    await dialog.dismiss(); 
  }).catch(() => {
 
  });

  await alertPromise;

  return alertMessage ? [...pageErrors, alertMessage] : pageErrors;
}
};
