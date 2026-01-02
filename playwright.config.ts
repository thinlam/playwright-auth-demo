import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npx serve .',
    port: 3000,
    timeout: 60 * 1000,
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:3000',
    headless: false,
    launchOptions: {
      slowMo: 1000, // ⬅️ mỗi action chậm 1 giây
    },
  },
});
