const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const readline = require('readline');

// Use Puppeteer Extra with the Stealth Plugin
puppeteer.use(StealthPlugin());

// Utility function to delay execution
<<<<<<< HEAD
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to calculate the remaining time until the flash sale and format it into hours, minutes, and seconds
=======
function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

// Function to calculate the remaining time until the flash sale
>>>>>>> 574d6054169ccfdfadb8ad654a15ab36ca7c6977
function getTimeUntil(targetHour, targetMinute) {
    const now = new Date();
    const target = new Date();
    target.setHours(targetHour, targetMinute, 0, 0);

    // If the target time is earlier today, set to the next day
    if (target.getTime() <= now.getTime()) {
        target.setDate(target.getDate() + 1);
    }

<<<<<<< HEAD
    const timeDiff = target.getTime() - now.getTime();

    const hours = Math.floor(timeDiff / 1000 / 60 / 60);
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    return { timeDiff, hours, minutes, seconds };
=======
    return target.getTime() - now.getTime();
>>>>>>> 574d6054169ccfdfadb8ad654a15ab36ca7c6977
}

// Promisified readline function to ask user input
function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => rl.question(query, (ans) => {
        rl.close();
        resolve(ans);
    }));
}

// Main function to automate the process
(async () => {
    const productUrl = await askQuestion('Enter the product URL: ');
    const desiredPrice = parseFloat(await askQuestion('Enter the desired price: '));
    const saleHour = parseInt(await askQuestion('Enter the sale hour (24-hour format): '), 10);
    const saleMinute = parseInt(await askQuestion('Enter the sale minute: '), 10);

<<<<<<< HEAD
    // Configure Puppeteer to run in headless mode and optimize performance
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
=======
    // Configure Puppeteer to run in headless mode
    const browser = await puppeteer.launch({ headless: false });
>>>>>>> 574d6054169ccfdfadb8ad654a15ab36ca7c6977
    const page = await browser.newPage();

    await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36'
    );

<<<<<<< HEAD
    // Block images and stylesheets for faster page loading
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (['image'].includes(request.resourceType())) {
            request.abort();
        } else {
            request.continue();
        }
    });

=======
>>>>>>> 574d6054169ccfdfadb8ad654a15ab36ca7c6977
    // Hardcoded credentials for automated login
    const email = 'njigupaul22@gmail.com'; // Replace with your email
    const password = 'njigupaul22'; // Replace with your password

    // Navigate to the Kilimall login page
    await page.goto('https://www.kilimall.co.ke/login', { waitUntil: 'networkidle2' });

<<<<<<< HEAD
    // ** Add a wait for the login form to load **
    try {
        await page.waitForSelector('input[name="account"]', { visible: true, timeout: 30000 });
    } catch (error) {
        console.error('Login form did not load or selector changed. Please check the website and update the selector.', error);
        await browser.close();
        return;
    }

=======
>>>>>>> 574d6054169ccfdfadb8ad654a15ab36ca7c6977
    // Automate the login process
    await page.type('input[name="account"]', email, { delay: 100 });
    await page.type('input[name="password"]', password, { delay: 100 });
    await page.click('#__nuxt > div > div.login-wrapper > div > div:nth-child(1) > div > form > div.submit-button > button');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    console.log('Logged in successfully! Preparing for the flash sale...');

    // Calculate time until flash sale starts
<<<<<<< HEAD
    const { timeDiff, hours, minutes, seconds } = getTimeUntil(saleHour, saleMinute);
    console.log(`Waiting ${hours} hours, ${minutes} minutes, and ${seconds} seconds until the flash sale starts.`);

    // Wait until the flash sale starts
    await delay(timeDiff);
=======
    const timeUntilSale = getTimeUntil(saleHour, saleMinute);

    console.log(`Waiting ${Math.ceil(timeUntilSale / 1000)} seconds until the flash sale starts.`);

    // Wait until the flash sale starts
    await delay(timeUntilSale);
>>>>>>> 574d6054169ccfdfadb8ad654a15ab36ca7c6977

    // Function to check the price and attempt a purchase
    async function checkPriceAndPurchase() {
        try {
            console.log('Navigating to the product page...');
<<<<<<< HEAD
            await page.goto(productUrl, { waitUntil: 'networkidle2', timeout: 60000 });

            console.log('Waiting for the page to fully load...');
            await page.waitForFunction(() => document.readyState === 'complete', { timeout: 60000 });

            // Check for the price element
=======
            // Navigate to the product page with increased timeout
            await page.goto(productUrl, { waitUntil: 'networkidle2', timeout: 60000 });

            console.log('Waiting for the page to fully load...');
            // Ensure that the page is fully loaded
            await page.waitForFunction(() => {
                return document.readyState === 'complete';
            }, { timeout: 60000 });

            // Check if the necessary elements are available
>>>>>>> 574d6054169ccfdfadb8ad654a15ab36ca7c6977
            const priceSelector = '.sale-price'; // Replace with the actual price selector
            const buyButtonSelector = '#__nuxt > div > div.pc__listing-detail-page > div.sku-wrapper > div.content-box > div.buyer-infos > div.opt-button-bar.info-item > button.van-button.van-button--primary.van-button--normal.opt-btn.red-btn'; // Replace with the actual buy button selector

            // Wait for the price element to be available
<<<<<<< HEAD
            await page.waitForSelector(priceSelector, { visible: true, timeout: 30000 });

            // Extract the product price
            const priceText = await page.$eval(priceSelector, el => el.textContent);
            const currentPrice = parseFloat(priceText.replace(/[^0-9.-]+/g, ''));

            console.log(`Current price: Ksh. ${currentPrice}`);

            // If the price is within the desired range, attempt to purchase
            if (currentPrice <= desiredPrice) {
                console.log('Price is within the desired range, attempting to purchase...');

                await page.waitForSelector(buyButtonSelector, { visible: true, timeout: 10000 });

                // Listen for a new page (tab) to open
                const [newPage] = await Promise.all([
                    new Promise(resolve => browser.once('targetcreated', target => resolve(target.page()))),
                    page.click(buyButtonSelector), // Click the button that triggers the new tab
                ]);

                console.log('Navigating to checkout...');

                // Wait for the new tab to be fully loaded
                await newPage.waitForNavigation({ waitUntil: 'networkidle2' });

                const purchaseButtonSelector = '#__nuxt > div > div.pc__order-checkout > div.order-card.price-card > div.place-order > button';
                await newPage.waitForSelector(purchaseButtonSelector, { visible: true, timeout: 60000 });

                await newPage.click(purchaseButtonSelector);

                console.log('Attempting to complete the purchase...');

                // Handle any modals or confirmations in the new tab
                const modalSelector = '#__nuxt > div > div.van-popup.van-popup--round.van-popup--center > div';
                const modalButtonSelector = '#__nuxt > div > div.van-popup.van-popup--round.van-popup--center > div > div > button';

                // Debugging step: Take a screenshot before waiting for the modal
                await newPage.screenshot({ path: 'before-waiting-for-modal.png' });

                try {
                    console.log('Waiting for the modal to appear...');
                    await newPage.waitForSelector(modalSelector, { visible: true, timeout: 60000 });
                    console.log('Modal is visible.');

                    await newPage.waitForSelector(modalButtonSelector, { visible: true, timeout: 60000 });

                    const isButtonEnabled = await newPage.$eval(modalButtonSelector, button => !button.disabled);
                    if (isButtonEnabled) {
                        await newPage.click(modalButtonSelector);
                        console.log('Purchase confirmed!');
                        await newPage.screenshot({ path: 'modal-button-clicked.png' });
                    } else {
                        console.error('Purchase button is disabled.');
                    }
                } catch (error) {
                    console.error('Modal or button inside the modal did not appear or took too long to load:', error);
                    await newPage.screenshot({ path: 'modal-not-found.png' }); // Screenshot if the modal fails to load
=======
            try {
                await page.waitForSelector(priceSelector, { visible: true, timeout: 30000 }); // Increased timeout
                console.log('Price element is available.');
            } catch (error) {
                console.error('Price element not found or not visible:', error);
                return;
            }

            // Extract the product price from the page
            const priceElement = await page.$(priceSelector);
            const priceText = await page.evaluate(el => el.textContent, priceElement);
            const currentPrice = parseFloat(priceText.replace(/[^0-9.-]+/g, '')); // Convert price to a number

            console.log(`Current price: Ksh. ${currentPrice}`);

            // If the price is less than or equal to the desired price, proceed to purchase
            if (currentPrice <= desiredPrice) {
                console.log('Price is within the desired range, attempting to purchase...');

                // Wait for the "Buy Now" button text to appear
                await page.waitForFunction(
                    (selector, text) => {
                        const button = document.querySelector(selector);
                        return button && button.textContent.includes(text);
                    },
                    { timeout: 30000 },
                    buyButtonSelector,
                    'Buy Now'
                );

                console.log('Buy Now button is available, clicking it.');
                // Click the "Buy Now" button
                await page.click(buyButtonSelector);

                console.log('Waiting for the checkout page to load...');

                // Wait a bit to ensure the new tab has time to open
                await delay(2000);

                // Get all open pages (tabs)
                const pages = await browser.pages();

                // Find the checkout tab by URL
                const checkoutPage = pages.find(p => p.url().includes('https://www.kilimall.co.ke/checkout'));

                if (checkoutPage) {
                    console.log('Checkout tab found. Switching to checkout tab...');

                    // Bring the checkout page to the foreground
                    await checkoutPage.bringToFront();

                    // Selector for the purchase button on the checkout page
                    const purchaseButtonSelector = '#__nuxt > div > div.pc__order-checkout > div.order-card.price-card > div.place-order > button';

                    // Wait for the button to be available and visible
                    try {
                        await checkoutPage.waitForSelector(purchaseButtonSelector, { visible: true, timeout: 30000 });
                        console.log('Purchase button is visible.');
                    } catch (error) {
                        console.error('Purchase button not found or not visible:', error);
                        return;
                    }

                    // Ensure the button is in view and clickable
                    console.log('Ensuring the button is in view and not covered by other elements...');
                    await checkoutPage.evaluate((selector) => {
                        const button = document.querySelector(selector);
                        if (button) {
                            button.scrollIntoView();
                            button.style.display = 'block';  // Ensuring the button is not hidden
                        }
                    }, purchaseButtonSelector);

                    // Wait briefly to ensure all animations or dynamic changes are complete
                    await delay(1000);

                    // Attempt to click the purchase button using a more robust method
                    console.log('Clicking the purchase button...');
                    try {
                        await checkoutPage.evaluate((selector) => {
                            const button = document.querySelector(selector);
                            if (button) {
                                button.click();
                            }
                        }, purchaseButtonSelector);
                    } catch (error) {
                        console.error('Failed to click the purchase button:', error);
                        return;
                    }

                    // Wait for the modal to appear
                    const modalSelector = '#__nuxt > div > div.van-popup.van-popup--round.van-popup--center > div';
                    const modalButtonSelector = '#__nuxt > div > div.van-popup.van-popup--round.van-popup--center > div > div > button';

                    try {
                        console.log('Waiting for the modal to appear...');
                        await checkoutPage.waitForSelector(modalSelector, { visible: true, timeout: 30000 });
                        console.log('Modal is visible.');

                        // Ensure the modal button is visible and interactable
                        await checkoutPage.waitForSelector(modalButtonSelector, { visible: true, timeout: 30000 });
                        console.log('Modal button is visible and interactable.');

                        await checkoutPage.screenshot({ path: 'before-modal-click.png' });

                        // Verify if the button is not disabled
                        const isButtonEnabled = await checkoutPage.evaluate((selector) => {
                            const button = document.querySelector(selector);
                            return button && !button.disabled;
                        }, modalButtonSelector);

                        if (!isButtonEnabled) {
                            console.error('Modal button is present but disabled.');
                            return;
                        }

                        // Click the button inside the modal
                        console.log('Clicking the button inside the modal...');
                        await checkoutPage.click(modalButtonSelector, { delay: 100 });

                        // Add a manual delay to wait for any further actions or changes
                        await new Promise(resolve => setTimeout(resolve, 2000));

                        await checkoutPage.screenshot({ path: 'after-modal-click.png' });
                        console.log('Button clicked inside the modal successfully.');


                    } catch (error) {
                        console.error('Modal or button inside the modal not found, not visible, or clicking failed:', error);
                    }


                    console.log('Purchase completed or attempted.');
                    // Close the browser after purchase
                    // await browser.close();
                } else {
                    console.error('Checkout tab not found.');
>>>>>>> 574d6054169ccfdfadb8ad654a15ab36ca7c6977
                }

            } else {
                console.log('Price is still too high. Checking again in 5 seconds...');
                setTimeout(checkPriceAndPurchase, 5000);
            }
        } catch (error) {
<<<<<<< HEAD
            console.error('Error during the purchase process:', error);
        }
    }

    // Start the price check and purchase process
    await checkPriceAndPurchase();

    // Close the browser after the script completes
    await browser.close();
=======
            console.error('Error checking price or making purchase:', error);
        }
    }

    // Delay function for waiting
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Start the price check and purchase process
    await checkPriceAndPurchase();

>>>>>>> 574d6054169ccfdfadb8ad654a15ab36ca7c6977
})();
