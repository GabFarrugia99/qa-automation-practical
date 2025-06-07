import { test } from '@playwright/test';
import { FormStep } from '../steps/form.step';


test.describe('User Profile Form Validation ', () => {
  test('Valid mandatory fields', async ({ page }) => {
    const step = new FormStep(page);
    await step.given_i_navigate_to_the_user_profile_form();
    await step.when_i_fill_first_name_with('Jane');
    await step.and_i_fill_last_name_with('Doe');
    await step.and_i_fill_email_with('jane@example.com');
    await step.and_i_fill_password_with('Test123!');
    await step.and_i_fill_confirm_password_with('Test123!');
    await step.and_i_submit_the_form_and_capture_dialog();
    await step.then_i_should_not_see_a_dialog();
  });

  test('Empty first name', async ({ page }) => {
    const step = new FormStep(page);
    await step.given_i_navigate_to_the_user_profile_form();
    await step.when_i_fill_first_name_with('');
    await step.and_i_fill_last_name_with('Doe');
    await step.and_i_fill_email_with('jane@example.com');
    await step.and_i_fill_password_with('Test123!');
    await step.and_i_fill_confirm_password_with('Test123!');
    await step.and_i_submit_the_form_and_capture_dialog();
    await step.then_i_should_see_error_message("First name");
  });

  test('Numeric last name', async ({ page }) => {
    const step = new FormStep(page);
    await step.given_i_navigate_to_the_user_profile_form();
    await step.when_i_fill_first_name_with('Jane');
    await step.and_i_fill_last_name_with('12345');
    await step.and_i_fill_email_with('jane@example.com');
    await step.and_i_fill_password_with('Test123!');
    await step.and_i_fill_confirm_password_with('Test123!');
    await step.and_i_submit_the_form_and_capture_dialog();
    await step.then_i_should_see_error_message("last name must contain alphabetical characters only");
  });

  test('Invalid email format', async ({ page }) => {
    const step = new FormStep(page);
    await step.given_i_navigate_to_the_user_profile_form();
    await step.when_i_fill_first_name_with('Jane');
    await step.and_i_fill_last_name_with('Doe');
    await step.and_i_fill_email_with('not-an-email');
    await step.and_i_fill_password_with('Test123!');
    await step.and_i_fill_confirm_password_with('Test123!');
    await step.and_i_submit_the_form_and_capture_dialog();
    await step.then_i_should_see_native_popup_with("include an '@' in the email address");
  });

  test('Password mismatch', async ({ page }) => {
    const step = new FormStep(page);
    await step.given_i_navigate_to_the_user_profile_form();
    await step.when_i_fill_first_name_with('Jane');
    await step.and_i_fill_last_name_with('Doe');
    await step.and_i_fill_email_with('jane@example.com');
    await step.and_i_fill_password_with('Test123!');
    await step.and_i_fill_confirm_password_with('Test456!');
    await step.and_i_submit_the_form_and_capture_dialog();
    await step.then_i_should_see_error_message("passwords do not match");
  });

  test('Valid LinkedIn URL', async ({ page }) => {
    const step = new FormStep(page);
    await step.given_i_navigate_to_the_user_profile_form();
    await step.when_i_fill_first_name_with('Jane');
    await step.and_i_fill_last_name_with('Doe');
    await step.and_i_fill_email_with('jane@example.com');
    await step.and_i_fill_password_with('Test123!');
    await step.and_i_fill_confirm_password_with('Test123!');
    await step.when_i_fill_linkedin_with('https://linkedin.com/in/jane');
    await step.and_i_submit_the_form_and_capture_dialog();
    await step.then_i_should_not_see_a_dialog();
  });

    test('Invalid LinkedIn URL', async ({ page }) => {
    const step = new FormStep(page);
    await step.given_i_navigate_to_the_user_profile_form();
    await step.when_i_fill_first_name_with('Jane');
    await step.and_i_fill_last_name_with('Doe');
    await step.and_i_fill_email_with('jane@example.com');
    await step.and_i_fill_password_with('Test123!');
    await step.and_i_fill_confirm_password_with('Test123!');
    await step.when_i_fill_linkedin_with('https://google.com/in/jane');
    await step.and_i_submit_the_form_and_capture_dialog();
    await step.then_i_should_see_native_popup_with("Not a Linkedin URL");
  
  
  });

  test('Invalid URL Github', async ({ page }) => {
    const step = new FormStep(page);
    await step.given_i_navigate_to_the_user_profile_form();
    await step.when_i_fill_github_with('not-a-valid-url');
    await step.and_i_submit_the_form_and_capture_dialog();
    await step.then_i_should_see_native_popup_with("please enter a url");
  });

  test('Invalid GitHub URL but still a url', async ({ page }) => {
    const step = new FormStep(page);
    await step.given_i_navigate_to_the_user_profile_form();
    await step.given_i_navigate_to_the_user_profile_form();
    await step.when_i_fill_first_name_with('Jane');
    await step.and_i_fill_last_name_with('Doe');
    await step.and_i_fill_email_with('jane@example.com');
    await step.and_i_fill_password_with('Test123!');
    await step.and_i_fill_confirm_password_with('Test123!');
    await step.when_i_fill_github_with('https://google.com');
    await step.and_i_submit_the_form_and_capture_dialog();
    await step.then_i_should_see_native_popup_with("Not a github URL");
  });

});
