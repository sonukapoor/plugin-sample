import * as AngularCommon from '@angular/common';
import * as AngularCore from '@angular/core';
import * as AngularRouter from '@angular/router';

const withinBrowser = typeof window !== 'undefined';
const envGlobal: any = typeof self !== 'undefined' ? self : global;
let localSystemJS = withinBrowser ? envGlobal.SystemJS : undefined;

if (!localSystemJS) {
  // Using 0.21.0 version of SystemJS until this issue is resolved:
  // https://github.com/systemjs/systemjs/issues/1817
  // SystemJS will add
  localSystemJS = require('systemjs/dist/system');
}

envGlobal.angular = {
  core: AngularCore,
  common: AngularCommon,
  router: AngularRouter,
};

const SystemJS = localSystemJS;

// re-export global variable af
export { SystemJS };
