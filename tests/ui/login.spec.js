const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Login UI Tests', () => {

  test('valid user should login successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      'standard_user',
      'secret_sauce'
    );

    await expect(page).toHaveURL(/inventory/);

    await expect(
      page.locator('.title')
    ).toHaveText('Products');
  });


  test('invalid user should display error message', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      'invalid_user',
      'wrong_password'
    );

    const errorMessage = await loginPage.getErrorMessage();

    expect(errorMessage).toContain(
      'Username and password do not match'
    );
  });

});