'use strict';

const isNumeric = (string) => !isNaN(string) && !isNaN(parseFloat(string));

module.exports = { isNumeric };
