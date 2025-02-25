'use strict';

const process = require('node:process');
const { isNumeric } = require('./validators.js');
const readline = require('node:readline/promises');
const logger = require('./logger.js');

const prompts = ['a = ', 'b = ', 'c = '];

const forever = (method) => {
  return method().catch((reason) => {
    throw new Error('Cannot read from the terminal', { cause: reason });
  }).then((string) => {
    if (isNumeric(string)) return Number.parseFloat(string);
    throw new Error(`Coefficient is not a number: ${string}`);
  }).catch((reason) => {
    logger.error(reason.message);
    return forever(method);
  });
};

const interactive = async (rl) => {
  const coefficients = [];
  for (const prompt of prompts) {
    const coefficient = await forever(rl.question.bind(rl, prompt));
    coefficients.push(coefficient);
  }
  return coefficients;
};

// Reads coefficients a, b and c from stdin, validates and returns the array
module.exports = () => {
  const options = { input: process.stdin, output: process.stdout };
  const rl = readline.createInterface(options);
  return interactive(rl).finally(rl.close.bind(rl));
};
