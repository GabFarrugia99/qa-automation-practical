#  User Profile Form Playwright Tests

##  Structure
- `tests/`: Main test specs using Gherkin-style step methods (non-Cucumber).
- `steps/`: Granular step definitions using readable naming like `when_i_fill_email_with(...)`.
- `pages/`: Page Object Model (POM) for form field interaction and browser alerts.
- `utils/`: Helper functions for dialog handling and validation collection.
- `playwright.config.ts`: Configuration file with base URL and timeouts.
- `README.md`: This file.
- `Questionnaire-Tests-Bugreports.docx` : Written parts of the task, including the Questionnaire, Test cases, Bug reports and other comments.

##  Getting Started

```bash
npm install playwright `Perform this to install playwright as a prerequisite`
npx playwright test --reporter=html `Perform this to run he automation and have th post run report immediately vidible`
npx playwright show-report 
