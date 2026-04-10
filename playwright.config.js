const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: [['list'], ['html']],
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'normal-chromium',
      testMatch: /normal\/.*\.spec\.js$/,
      retries: 2,
      use: { browserName: 'chromium' },
    },
    {
      name: 'bug-chromium',
      testMatch: /bug\/.*\.spec\.js$/,
      retries: 0,
      use: { browserName: 'chromium' },
    },
  ],
});