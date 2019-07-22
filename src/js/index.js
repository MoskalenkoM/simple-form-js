import log from './modules/log';

import '../css/main.scss';

log('Max');

const a = {
  a: 1
};

const b = {
  b: 2
};

const c = {
  ...a,
  ...b
};

console.log(c);
