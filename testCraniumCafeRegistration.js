// Start of test

const { Builder, By, Key, until } = require('selenium-webdriver');

async function testCraniumCafeRegistration() {
    // Enter in the information of who's account you're trying to create
    const testFullName = 'Test Name';
    const testEmail = 'BN@test.com';
    const testPassword = 'Testpassword1';

  // Initializes Driver
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    // Open's URL
    await driver.get('https://my.test.craniumcafe.com/');

    // Searches for School
    
      await driver.wait(until.elementLocated(By.name('schoolSearch')), 20000);
      const searchBox = await driver.findElement(By.name('schoolSearch'));
      await searchBox.sendKeys('Cranium Cafe - Test', Key.RETURN);
      await driver.sleep(1500); // Delay of 1.5 Sec 
    
    // Clicks redirect button after search is executed
    
      await driver.wait(until.elementLocated(By.id('integration-redirect-button')), 20000);
      await driver.sleep(1500); 
      const redirectButton = await driver.findElement(By.id('integration-redirect-button'));
      await redirectButton.click();
      await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2, 20000);
      const handles = await driver.getAllWindowHandles();
      await driver.switchTo().window(handles[1]);
      await driver.wait(until.urlContains('https://cc.test.craniumcafe.com/login'), 20000);
      await driver.wait(until.ableToSwitchToFrame(0), 20000);
      await driver.wait(until.elementLocated(By.id('craniumcafe-button')), 20000);
      const guestRegButton = await driver.findElement(By.id('craniumcafe-button'));
      await guestRegButton.click();
      await driver.sleep(1500); 
      await driver.wait(until.elementLocated(By.id('register-toggle-button')), 10000);
      const registerToggleButton = await driver.findElement(By.id('register-toggle-button'));
      await registerToggleButton.click();
      await driver.sleep(1500); 

    // Fills out registration form
    
      await driver.wait(until.elementLocated(By.id('fullname-text')), 10000);
      const fullNameInput = await driver.findElement(By.id('fullname-text'));
      await fullNameInput.sendKeys(testFullName);
      await driver.sleep(1500); 
      await driver.wait(until.elementLocated(By.id('email-text')), 10000);
      const emailInput = await driver.findElement(By.id('email-text'));
      await emailInput.sendKeys(testEmail);
      await driver.sleep(1500); 
      await driver.wait(until.elementLocated(By.id('create-password-text')), 10000);
      const passwordInput = await driver.findElement(By.id('create-password-text'));
      await passwordInput.sendKeys(testPassword);
      await driver.sleep(1500); 
      await driver.wait(until.elementLocated(By.id('confirm-password-text')), 10000);
      const confirmPasswordInput = await driver.findElement(By.id('confirm-password-text'));
      await confirmPasswordInput.sendKeys(testPassword);
      await driver.sleep(1500); 

    // Clicks register button
    
      await driver.wait(until.elementLocated(By.id('register-button')), 10000);
      const registerButton = await driver.findElement(By.id('register-button'));
      await registerButton.click();
      await driver.sleep(1500); 

    // Clicks return to sign in
    
      await driver.wait(until.elementLocated(By.linkText('Return to sign in')), 10000);
      const returnToSignInButton = await driver.findElement(By.linkText('Return to sign in'));
      await returnToSignInButton.click();
      await driver.sleep(1500); 

    // Navigates back to login
    
      await driver.wait(until.urlContains('https://cc.test.craniumcafe.com/login'), 20000);
      await driver.switchTo().defaultContent();
      await driver.wait(until.ableToSwitchToFrame(0), 20000);
      await driver.wait(until.elementLocated(By.id('craniumcafe-button')), 20000);
      const secondGuestRegButton = await driver.findElement(By.id('craniumcafe-button'));
      await secondGuestRegButton.click();
      await driver.sleep(1500); 

    // Logs you in based off what Name, Email and Password you enter
    
      await driver.switchTo().defaultContent();
      await driver.wait(until.ableToSwitchToFrame(0), 20000);
      await driver.wait(until.elementLocated(By.id('login-text')), 10000);
      const emailLogin = await driver.findElement(By.id('login-text'));
      await emailLogin.sendKeys(testEmail);
      await driver.sleep(1500); 
      await driver.wait(until.elementLocated(By.id('password-text')), 10000);
      const passwordLogin = await driver.findElement(By.id('password-text'));
      await passwordLogin.sendKeys(testPassword);
      await driver.sleep(1500); 
      await driver.wait(until.elementLocated(By.id('login-button')), 10000);
      const loginButton = await driver.findElement(By.id('login-button'));
      await loginButton.click();
      await driver.sleep(1500); 

  } catch (error) {
    // Catches errors
  } finally {
    // Terminates driver
    await driver.quit();
  }
}

// Calls test function
testCraniumCafeRegistration().then(() => console.log('Test function called.'));