'use strict';

const logger = require('./logger.js');
const process = require('node:process');
const automated = require('./automated');
const interactive = require('./interactive');
const discriminant = require('./discriminant.js');

const getEquation = (a, b, c) => (
  `(${a}) x^2 + (${b}) x + (${c}) = 0`
);

const main = async () => {
  const { argv } = process;
  const promise = argv.length > 2 ? automated(argv[2]) : interactive();
  const [a, b, c] = await promise;
  const equation = getEquation(a, b, c);
  logger.success(`Equation is: ${equation}`);
  if (a === 0) {
    return void logger.error('It is not a quadratic equation');
  }
  const result = discriminant(a, b, c);
  if (result.length === 0) {
    return void logger.warning('Equation has no real roots');
  }
  if (result.length === 1) {
    logger.success('Equation has 1 root');
    return void logger.success(`x1 = ${result[0]}`);
  }
  logger.success('Equation has 2 roots');
  logger.success(`x1 = ${result[0]}`);
  logger.success(`x2 = ${result[1]}`);
};

main().catch((reason) => logger.error(reason.message));
