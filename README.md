# 🚀 Getting Started

Welcome! This quick guide will get you up and running for development and testing.

## Prerequisites

- **Node.js (LTS)** — [Download](https://nodejs.org/)
- **npm** — Verify installation with:
  ```bash
  node -v
  npm -v
  ```
- **VSCode** — [Download](https://code.visualstudio.com/)

### VSCode Extensions:

- **ESLint**
- **Prettier** (make sure `formatOnSave` setting in VSCode is active)

Ensure ESLint and Prettier are enabled in VSCode.

## Setup

```bash
npm install
npm run dev
```

The dev server will run on [http://localhost:3000](http://localhost:3000)

## Common Commands

- `npm run dev` — Start the development server
- `npm run build` — Build the app for production
- `npm run lint` — Check for linting errors
- `npm run format` — Auto-format code with Prettier (the extension should do this on save)
- `npm run test:all` — Run all test suites

## Testing

There are 3 types of tests. **Unit**, **Integration** & **End-to-End**

- **Unit Tests**: Test isolated functions or components. (e.g. Button, TextInput).
- **Integration Tests**: Test how multiple components or modules work together as a group. (e.g. LoginForm, NavBar)
- **End-to-End Tests**: Verify entire user flows to ensure frontend, backend & services function as expected.

```bash
npm run test:unit
npm run test:integration
npm run test:e2e (ensure dev server is running)
npm run test:all (runs all of the above test suites)
```

<details>
<summary> Unit Test Example</summary>
<pre>
// Button.unit.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
it('renders with the correct label', () => {
render(&lt;Button onClick={() => {}} label="Click Me" /&gt;);
expect(screen.getByText('Click Me')).toBeInTheDocument();
});
});

</pre>
</details>

<details>
<summary> Integration Test Example</summary>
<pre>
// LoginForm.integration.test.ts
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';

it('submits the entered email', () => {
const handleSubmit = jest.fn();
render(&lt;LoginForm onSubmit={handleSubmit} /&gt;);
fireEvent.change(screen.getByPlaceholderText('Email'), {
target: { value: 'user@example.com' },
});
fireEvent.click(screen.getByText('Login'));
expect(handleSubmit).toHaveBeenCalledWith('user@example.com');
});

</pre>
</details>

<details>
<summary> End-to-End Test Example</summary>
<pre>
// increment-flow.e2e.test.ts (simple example, not realistic)
import { test, expect } from '@playwright/test';

test('user can navigate and increment the counter', async ({ page }) => {
// Step 1: Open home page
await page.goto('/');

// Step 2: Assert home page loaded
await expect(page.getByRole('heading', { name: 'Welcome to the App' })).toBeVisible();

// Step 3: Click "Get Started" to navigate
await page.getByRole('button', { name: 'Get Started' }).click();

// Step 4: Assert we're on counter page
await expect(page.getByRole('heading', { name: 'Counter Page' })).toBeVisible();

// Step 5: Verify initial counter text
await expect(page.locator('text=Current count is 0')).toBeVisible();

// Step 6: Click increment button
await page.getByRole('button', { name: 'Increment' }).click();

// Step 7: Verify counter updated
await expect(page.locator('text=Current count is 1')).toBeVisible();
});

</pre>
</details>

## Our Development Principles

We follow a Test-Driven Development (TDD) approach, using the Red, Green, Refactor cycle to build features with clear intent, meaningful test coverage, and natural maintainability. This creates a robust test suite, catches issues early, and makes future changes faster and safer.

#### Example

**Step 1. Red — Write a failing test**: The developer starts by writing a test that describes what the function should do. Since the function doesn’t exist yet, the test fails.

**Step 2. Green — Write the simplest code to pass the test:** Next, the developer writes just enough code to make the test pass, focusing only on the specific case they wrote the test for.

**Step 3. Refactor — Clean up the code:** With the test now passing, the developer takes a moment to tidy up the code, making it clearer and more maintainable without changing its behavior.

**↺ Repeat Until Feature Completion**

**Outcome:** The developer completes the task knowing the code works as expected, is clean, and is protected by tests for future changes.

By following this flow, the team builds up the codebase piece by piece, keeping it reliable and easy to work with as it grows.

### AI Usage Guidelines

We use AI tools like GitHub Copilot to speed up development and testing — but always in support of our TDD principles.

If you're using Copilot or any AI tool, follow this flow to stay aligned with our development standards:

- **Write the spec first**: Clearly describe the feature or function in plain text. This guides AI tools to generate meaningful tests.
- **Generate tests from the spec**: Use AI to scaffold your test cases before writing any implementation code.
- **Run tests to confirm failure (Red)**: Validate that the tests fail initially, as expected.
- **Implement code to pass the tests (Green)**: Write the simplest code to satisfy the test cases.
- **Refactor and improve**: Clean up both code and tests, with AI-assisted suggestions if helpful.
- **Use AI for additional edge cases**: Prompt AI to suggest boundary conditions and edge scenarios for better coverage.

#### Best Practices

- **Spec-first**: Always start with a clear, written spec.
- **Stay TDD**: Maintain the Red-Green-Refactor cycle.
- **Edge Cases**: Use AI to enhance coverage after primary tests are in place.
- **Review AI output**: Treat AI-generated code like any code — review, test, and validate.

#### What to Avoid

- Don't skip writing specs and rely only on Copilot.
- Don’t generate tests after the implementation — stick to test-first.
- Don’t bypass code review for AI-generated code.

AI is a great accelerator, but we stay in control of code quality and intent. Follow the flow, and AI becomes a powerful assistant — not a shortcut.

## Branching & Commit Guidelines

We have 3 main branches:

- `main` - the production branch. Only contains stable, production-ready code.
- `staging` - acts as a staging ground for features that are complete and pending release. Used for final testing and quality checks.
- `development` - the active development branch where all new work is integrated before it's considered stable enough for staging.

### Naming Branches & Commits

**Branch Names**: use descriptive names like `feat/login-form`, `fix/navbar-overlap`, `chore/update-deps`.

**Commit Messages:** Follow the format: `<type>: <short description>`

- _Example_: `feat: add login form`
- _Types_: `feat`, `fix`, `chore`, `docs`, `test`, etc.

## Code Review Expectations

- Open a pull request early as a draft to get feedback.
- All PRs require at least one approval before merging.
- Write clear descriptions for your PRs. Include screenshots or test coverage details when relevant.
- Keep PRs focused — smaller is better!

## Troubleshooting

### Dependencies

If you encounter issues with dependencies, run:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables

Check the `.env` file for missing or incorrect values.

### Formatting

Ensure ESLint and Prettier are active in VSCode.

### Clear Cache

If you see unexpected behavior, try clearing npm cache:

```bash
npm cache clean --force
```

## Need Help?

Contact the team or open an issue in Github.

## Welcome Aboard!

We're excited to have you on the team. Don’t hesitate to reach out with any questions - we're here to help!
