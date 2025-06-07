#  User Profile Form Playwright Tests

##  Structure
- `tests/`: Main test specs using Gherkin-style step methods (non-Cucumber).
- `steps/`: Granular step definitions using readable naming like `when_i_fill_email_with(...)`.
- `pages/`: Page Object Model (POM) for form field interaction and browser alerts.
- `utils/`: Helper functions for dialog handling and validation collection.
- `playwright.config.ts`: Configuration file with base URL and timeouts.
- `README.md`: This file.

##  Getting Started

```bash
npm install
npx playwright test --reporter=html
npx playwright show-report