const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  reporter: [['list'], ['html']],
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'normal-chromium',
      testMatch: /normal\/.*\.spec\.js$/,
      use: { browserName: 'chromium' },
    },
    {
      name: 'bug-chromium',
      testMatch: /bug\/.*\.spec\.js$/,
      use: { browserName: 'chromium' },
    },
  ],
});