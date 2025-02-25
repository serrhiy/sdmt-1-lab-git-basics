'use strict';

const process = require('node:process');
const automated = require('./automated');
const interactive = require('./interactive');

const main = async () => {
  const { argv } = process;
  const promise = argv.length > 2 ? automated(argv[2]) : interactive();
  await promise;
};

main();
