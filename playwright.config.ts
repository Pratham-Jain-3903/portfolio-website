import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://127.0.0.1:9002';
const browserChannel = process.env.PLAYWRIGHT_BROWSER_CHANNEL
  ?? (!process.env.CI && process.platform === 'win32' ? 'chrome' : undefined);
const channel = browserChannel ? { channel: browserChannel } : {};

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'], ...channel },
    },
    {
      name: 'chromium-mobile',
      use: { ...devices['Pixel 7'], ...channel },
    },
  ],
  webServer: {
    command: process.env.CI
      ? 'npm run start -- --port 9002'
      : 'npm run dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});