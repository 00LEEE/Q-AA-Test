console.log('Starting the test.');

const { Builder, By, Key, until } = require('selenium-webdriver');

async function testCraniumCafeRegistration() {
  console.log('Initializing driver.');
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    console.log('Opening URL.');
    await driver.get('https://my.test.craniumcafe.com/');

    console.log('Searching for school...');
    try {
      await driver.wait(until.elementLocated(By.name('schoolSearch')), 20000);
      let searchBox = await driver.findElement(By.name('schoolSearch'));
      await searchBox.sendKeys('Cranium Cafe - Test', Key.RETURN);
    } catch (error) {
      console.log("Error in searching for and selecting 'Cranium Cafe - Test':", error);
      throw error;
    }

    console.log('Clicking redirect button...');
    try {
      await driver.wait(until.elementLocated(By.id('integration-redirect-button')), 20000);

      await driver.sleep(2000);

      let redirectButton = await driver.findElement(By.id('integration-redirect-button'));
      await redirectButton.click();

      await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2, 20000);

      const handles = await driver.getAllWindowHandles();
      await driver.switchTo().window(handles[1]);

      await driver.wait(until.urlContains('https://cc.test.craniumcafe.com/login'), 20000);

      await driver.switchTo().frame(0);

      await driver.wait(until.elementLocated(By.xpath('/html/body/div[1]/div[5]/div[2]/button')), 20000);
      let guestRegButton = await driver.findElement(By.xpath('/html/body/div[1]/div[5]/div[2]/button'));
      await guestRegButton.click();

      await driver.wait(until.elementLocated(By.id('register-toggle-button')), 10000);
      let registerToggleButton = await driver.findElement(By.id('register-toggle-button'));
      await registerToggleButton.click();
    } catch (error) {
      console.log("Error in clicking 'Guest Registration':", error);
      throw error;
    }

    let testFullname = 'John Pork';
    let testEmail = '';
    let testPassword = 'Testpassword1';

    console.log('Completing registration form...');
    try {
      await driver.wait(until.elementLocated(By.id('fullname-text')), 10000);
      let fullnameInput = await driver.findElement(By.id('fullname-text'));
      await fullnameInput.sendKeys(testFullname);

      await driver.wait(until.elementLocated(By.id('email-text')), 10000);
      let emailInput = await driver.findElement(By.id('email-text'));
      await emailInput.sendKeys(testEmail);

      await driver.wait(until.elementLocated(By.id('create-password-text')), 10000);
      let passwordInput = await driver.findElement(By.id('create-password-text'));
      await passwordInput.sendKeys(testPassword);

      await driver.wait(until.elementLocated(By.id('confirm-password-text')), 10000);
      let confirmPasswordInput = await driver.findElement(By.id('confirm-password-text'));
      await confirmPasswordInput.sendKeys(testPassword);
    } catch (error) {
      console.log("Error in completing registration form:", error);
      throw error;
    }

    console.log('Clicking register button...');
    try {
      await driver.wait(until.elementLocated(By.id('register-button')), 10000);
      let registerButton = await driver.findElement(By.id('register-button'));
      await registerButton.click();
    } catch (error) {
      console.log("Error in clicking the register button:", error);
      throw error;
    }

    console.log('Logging in...');
    try {
      await driver.wait(until.elementLocated(By.name('email-login')), 10000);
      let emailLogin = await driver.findElement(By.name('email-login'));
      await emailLogin.sendKeys(testEmail);

      await driver.wait(until.elementLocated(By.name('password-login')), 10000);
      let passwordLogin = await driver.findElement(By.name('password-login'));
      await passwordLogin.sendKeys(testPassword);

      await driver.wait(until.elementLocated(By.name('login-button')), 10000);
      let loginButton = await driver.findElement(By.name('login-button'));
      await loginButton.click();
    } catch (error) {
      console.log("Error in logging in:", error);
      throw error;
    }
  } catch (error) {
    console.log("Caught an error:", error);
  } finally {
    console.log('Quitting driver.');
    await driver.quit();
  }
}

console.log('Calling test function.');
testCraniumCafeRegistration().then(() => console.log('Test function called.'));
