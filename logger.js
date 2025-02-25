'use strict';

const reset = '\x1b[0m';

const codes = {
  info: '\x1b[1;37m',
  error: '\x1b[1;31m',
  success: '\x1b[1;32;',
  warning: '\x1b[1;33m',
};

const makeLogger = (level = 'info') => (string) => {
  const message = codes[level] + string + reset;
  console.log(message);
};

module.exports = {
  info: makeLogger('info'),
  error: makeLogger('error'),
  success: makeLogger('success'),
  warning: makeLogger('warning'),
};
