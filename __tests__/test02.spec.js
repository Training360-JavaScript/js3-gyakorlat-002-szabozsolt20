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
    myServer.start('index2.html', 9000);

    // For console outputs, add this param: {dumpio: true}
    const browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://127.0.0.1:9000', { waitUntil: 'networkidle0' });
});

afterAll(async () => {
    await myServer.stop();
});

describe('2. feladat', () => {
    test('Kellene lennie három előre beállított sütinek az oldalon.', async () => {
        await page.waitForSelector('#for-test');

        const pageData = await page.evaluate(() => {
            return {
                href: location.href,
                cookie: document.cookie,
            };
        });

        expect(pageData.cookie).toMatch(/viewed\=5/i);
        expect(pageData.cookie).toMatch(/uid\=354774631237/i);
        expect(pageData.cookie).toMatch(/ssid\=Bx55OWbHJ0Vt_IGIF/i);
    });
    
    test('A cookieHandler.getAll metódusnak vissza kellene adnia az összes sütit.', async () => {
        await page.waitForSelector('#for-test');

        const pageData = await page.evaluate(() => {
            return window.cookieHandler.getAll();
        });

        expect(String(pageData.viewed)).toEqual('5');
        expect(String(pageData.uid)).toEqual('354774631237');
        expect(String(pageData.ssid)).toEqual('Bx55OWbHJ0Vt_IGIF');
    });
    
    test('A cookieHandler.toSessionStorage metódusnak el kellene mentenie az összes sütit a sessionStorage-ba.', async () => {
        await page.waitForSelector('#for-test');

        const pageData = await page.evaluate(() => {
            window.cookieHandler.toSessionStorage();
            const session = {};
            Object.keys(sessionStorage).forEach( key => {
                session[key] = sessionStorage.getItem(key);
            } );
            return session;
        });

        expect(String(pageData.viewed)).toEqual('5');
        expect(String(pageData.uid)).toEqual('354774631237');
        expect(String(pageData.ssid)).toEqual('Bx55OWbHJ0Vt_IGIF');
    });
    
    test('A cookieHandler.flush metódusnak az összes sütit törölnie kellene.', async () => {
        await page.evaluate(() => {
            window.cookieHandler.flush();
        });

        await new Promise( r => setTimeout( () => r(), 1000 ) );

        const pageData = await page.evaluate(() => {
            return {
                href: location.href,
                cookie: document.cookie,
            };
        });

        expect(String(pageData.cookie)).toEqual('');
    });
});
