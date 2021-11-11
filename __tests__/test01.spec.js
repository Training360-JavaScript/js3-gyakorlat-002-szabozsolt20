// Defining the timeout for the test
const timeout = process.env.SLOWMO ? 6000 : 2500;
const puppeteer = require('puppeteer');
const myServer = require('../server');

const getText = (page, elementHandle) => {
    return page.evaluate(el => el.innerText, elementHandle);
};

let page = null;

// Go to the specified path and wait for the domcontent to load before running the tests
beforeAll(async () => {
    myServer.start();

    // For console outputs, add this param: {dumpio: true}
    const browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://127.0.0.1:9000', { waitUntil: 'networkidle0' });
});

afterAll( async () => {
    await myServer.stop();
});

describe('1. feladat', () => {
    test('A token nevű cookie-t el kellene tárolni 15 percre.', async () => {
        await page.waitForSelector('#for-test');
        
        const pageData = await page.evaluate(() => {
            return {
                href: location.href,
                cookie: document.cookie,
            };
        });

        expect(pageData.cookie).toMatch(/token\=testTokenValue/i);
    });
});
