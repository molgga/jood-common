# @jood/common

javascript array, string, number, point, color, cache, date utility/helper

> __[Documentation](https://molgga.github.io/jood-common)__
| __[Package source](https://github.com/molgga/jood-common/tree/master/projects/packages)__
| __[NPM](https://www.npmjs.com/package/@jood/common)__
\
\
![Typescript](https://img.shields.io/static/v1.svg?label=&style=flat-square&logoColor=white&color=3178c6&logo=typescript&message=Typescript)
![TRAVIS](https://travis-ci.org/molgga/jood-common.svg?branch=master)
![Codecov branch](https://img.shields.io/codecov/c/github/molgga/jood-common/master)
![NPM version](https://img.shields.io/npm/v/@jood/common.svg)
![NPM license](https://img.shields.io/npm/l/@jood/common)
![NPM download](https://img.shields.io/npm/dt/@jood/common)
![NPM bundle size](https://img.shields.io/bundlephobia/min/@jood/common)

---

## Quick sample

```typescript
import { replaceAll } from "@jood/common/string";
import { isNumber } from "@jood/common/number";
import { insert } from "@jood/common/array";
import { toFormat } from "@jood/common/date";
import { isIntersect } from "@jood/common/point";
import { TTLCache } from "@jood/common/cache";
import { BrowserCookie, BrowserScroll, DomScroll } from "@jood/common/web";
import { JdString, JdNumber, JdArray, JdDate, JdPoint } from "@jood/common";

console.log(replaceAll("hello-foo", "-", "#")); // "hello#foo"
console.log(JdString.replaceAll("hello-foo", "-", "#")); // "hello#foo"
```

---

This library was generated with [Angular CLI](https://github.com/angular/angular-cli)
