import { PlaywrightTestConfig, defineConfig, devices } from "@playwright/test";


const config: PlaywrightTestConfig = {
    testDir: './tests',
    timeout: 600000,
    retries: 0,
    use: {
        headless: true,
        viewport: { width: 1920, height: 1080 },
        actionTimeout: 40000,
        ignoreHTTPSErrors: true,
        video: 'on',
        screenshot: 'on',
    },

    projects: [
        {
            name: 'SD-Chromium',
            use: {
                browserName: 'chromium',
                baseURL: 'https://www.saucedemo.com/'
            },
        },
        {
            name: 'SD-Firefox',
            use: {
                browserName: 'firefox',
                baseURL: 'https://www.saucedemo.com/'
            },
        },
        {
            name: 'SD-Webkit',
            use: {
                browserName: 'webkit',
                baseURL: 'https://www.saucedemo.com/'
            },
        }
    ]
}

export default config