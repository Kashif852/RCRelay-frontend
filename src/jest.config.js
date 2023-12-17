module.exports = {
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
      '\\.(css|less|sass|scss)$': "identity-obj-proxy",
      '\\.(jpg|jpeg|png|gif|webp|svg)$': "<rootDir>/src/__mocks__/fileMock.js"
    },
    testEnvironment: 'jsdom',
    // setupFilesAfterEnv: [
    //   "<rootDir>/src/setupTests.js"
    // ],
  };
  