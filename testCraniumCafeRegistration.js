 // This function simulates a user registration flow on Cranium Cafe's website,
 // by automating browser actions using Selenium WebDriver.

 // Import necessary modules from Selenium WebDriver
const { Builder, By, Key, until } = require('selenium-webdriver');

async function testCraniumCafeRegistration() {
    // Specify test user's details
    const testFullName = 'KoleTest';
    const testEmail = 'WQ@test.com';
    const testPassword = 'Testpassword1';

    // Initializes WebDriver for Chrome
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to Cranium Cafe's website
        await driver.get('https://my.test.craniumcafe.com/');

        // Search for school
        await driver.wait(until.elementLocated(By.name('schoolSearch')), 20000);
        const searchBox = await driver.findElement(By.name('schoolSearch'));
        await searchBox.sendKeys('Cranium Cafe - Test', Key.RETURN);

        // Click on the redirect button
        await driver.wait(until.elementLocated(By.id('integration-redirect-button')), 20000);
        const redirectButton = await driver.findElement(By.id('integration-redirect-button'));
        await redirectButton.click();

        // Switch to the newly opened window
        await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2, 20000);
        const handles = await driver.getAllWindowHandles();
        await driver.switchTo().window(handles[1]);

        // Start guest registration process
        await driver.wait(until.urlContains('https://cc.test.craniumcafe.com/login'), 20000);
        await driver.wait(until.ableToSwitchToFrame(0), 20000);
        await driver.wait(until.elementLocated(By.id('craniumcafe-button')), 20000);
        const guestRegButton = await driver.findElement(By.id('craniumcafe-button'));
        await guestRegButton.click();

        // Switch to registration form
        await driver.wait(until.elementLocated(By.id('register-toggle-button')), 10000);
        const registerToggleButton = await driver.findElement(By.id('register-toggle-button'));
        await registerToggleButton.click();

        // Fill out registration form
        await driver.wait(until.elementLocated(By.id('fullname-text')), 10000);
        const fullNameInput = await driver.findElement(By.id('fullname-text'));
        await fullNameInput.sendKeys(testFullName);
        await driver.wait(until.elementLocated(By.id('email-text')), 10000);
        const emailInput = await driver.findElement(By.id('email-text'));
        await emailInput.sendKeys(testEmail);
        await driver.wait(until.elementLocated(By.id('create-password-text')), 10000);
        const passwordInput = await driver.findElement(By.id('create-password-text'));
        await passwordInput.sendKeys(testPassword);
        await driver.wait(until.elementLocated(By.id('confirm-password-text')), 10000);
        const confirmPasswordInput = await driver.findElement(By.id('confirm-password-text'));
        await confirmPasswordInput.sendKeys(testPassword);

        // Submit registration form
        await driver.wait(until.elementLocated(By.id('register-button')), 10000);
        const registerButton = await driver.findElement(By.id('register-button'));
        await registerButton.click();

        // Return to sign-in page
        await driver.wait(until.elementLocated(By.linkText('Return to sign in')), 10000);
        const returnToSignInButton = await driver.findElement(By.linkText('Return to sign in'));
        await returnToSignInButton.click();

        // Navigate back to login
        await driver.wait(until.urlContains('https://cc.test.craniumcafe.com/login'), 20000);
        await driver.switchTo().defaultContent();
        await driver.wait(until.ableToSwitchToFrame(0), 20000);
        await driver.wait(until.elementLocated(By.id('craniumcafe-button')), 20000);
        const secondGuestRegButton = await driver.findElement(By.id('craniumcafe-button'));
        await secondGuestRegButton.click();

        // Log in with the new user's credentials
        await driver.switchTo().defaultContent();
        await driver.wait(until.ableToSwitchToFrame(0), 20000);
        await driver.wait(until.elementLocated(By.id('login-text')), 10000);
        const emailLogin = await driver.findElement(By.id('login-text'));
        await emailLogin.sendKeys(testEmail);
        await driver.wait(until.elementLocated(By.id('password-text')), 10000);
        const passwordLogin = await driver.findElement(By.id('password-text'));
        await passwordLogin.sendKeys(testPassword);
        await driver.wait(until.elementLocated(By.id('login-button')), 10000);
        await driver.sleep(20000); // Added 20 seconds wait here to allow for verification in the recording.
        const loginButton = await driver.findElement(By.id('login-button'));
        await loginButton.click();


    } catch (error) {
        // Log any errors that occurred during the test
        console.error(`Error occurred during the test: ${error}`);
    } finally {
        // Ensure the browser window is closed even if an error occurred
        await driver.quit();
    }
}

// Run the test function
testCraniumCafeRegistration()