const path = require('path');

module.exports = {
  use: {
    // Otros settings
  },
  projects: [
    {
      name: 'electron',
      testMatch: /.*\.spec\.js/,
      use: {
        // Playwright config for Electron
        launchOptions: {
          appImage: path.resolve(__dirname, './app/DevaidStarter_Dev-4.1.1.AppImage'),
          env: {
            DISPLAY: process.env.DISPLAY,
          },
        },
      },
    },
  ],
};
