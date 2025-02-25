'use strict';

const path = require('node:path');
const fsp = require('node:fs/promises');
const { isNumeric } = require('./validators.js');

const exists = (path) => fsp.access(path).then(() => true, () => false);

// Reads coefficients a, b and c from file, validates and returns the array
module.exports = async (filename) => {
  const fullpath = path.join(__dirname, filename);
  const fileExists = await exists(fullpath);
  if (!fileExists) throw new Error(`File ${fullpath} does not exist`);
  const data = await fsp.readFile(fullpath, 'utf-8');
  const result = data.trim().split(' ');
  if (result.length !== 3) {
    throw new Error(`Invalid data format: ${data}`);
  }
  const coefficients = [];
  for (const number of result) {
    if (!isNumeric(number)) {
      throw new Error(`Coefficient is not a number: ${number}`)
    }
    coefficients.push(Number.parseFloat(number));
  }
  return coefficients;
};
