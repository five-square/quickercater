//
// This code is to allow all test files to easily require
// the test helper file, regardless of nested folder location.
//
// e.g. require(TEST_HELPER)
// const path = require('path');
console.log(`${__dirname}/test-helper.js`);

global.TEST_HELPER = `${__dirname}/test-helper.js`;
