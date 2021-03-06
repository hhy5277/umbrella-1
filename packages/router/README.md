# @thi.ng/router

[![npm version](https://img.shields.io/npm/v/@thi.ng/router.svg)](https://www.npmjs.com/package/@thi.ng/router)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/router.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Generic router for browser & non-browser based applications with support
for:

- Declarative route definitions
- Parametric routes, each param with optional value coercion &
  validation
- Route authentication handler to enable/disable routes based on other
  state factors
- Fallback route
- Enforced initial route (optional)
- Route formatting (with params)
- HTML5 history & hash fragment support

## Installation

```bash
yarn add @thi.ng/router
```

**New since 2018-03-15: You can now create a preconfigured app skeleton
using @thi.ng/atom, @thi.ng/hdom & @thi.ng/router using the
[create-hdom-app](https://github.com/thi-ng/create-hdom-app) project
generator:**

```bash
yarn create hdom-app my-app

cd my-app
yarn install
yarn start
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/master/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)

## Usage examples

A complete, full commented demo app is here:

[Source](https://github.com/thi-ng/umbrella/blob/master/examples/router-basics/) |
[Live demo](https://demo.thi.ng/umbrella/router-basics/)

```ts
import * as r from "@thi.ng/router";

// router configuration
const config = {

    // use hash fragment for routes
    useFragment: true,

    // fallback route (when no other matches)
    defaultRouteID: "home",

    // optional enforced route when router starts
    initialRouteID: "home",

    // Optional route path component separator. Default: `/`
    separator: "/",

    // Route prefix. Default: `/`. All routes to be parsed by `route()`
    // are assumed to have this prefix. All routes returned by
    // `format()` will include this prefix.
    prefix: "/",

    // actual route defs
    // these are checked in given order
    // IMPORTANT: rules with common prefixes MUST be specified in
    // order of highest precision / longest path
    routes: [
        {
            // each route MUST have an ID
            id: "home",
            // optional title for UI purposes (no internal function)
            title: "Home page",
            // this array defines the route path items
            match: ["home"]
        },
        {
            id: "user-profile",
            // this rule is parametric
            // variable items are prefixed with `?`
            match: ["users", "?id"],
            // coercion & validation handlers for "?id" param
            // coercion fn is applied BEFORE validator
            validate: {
                id: {
                    coerce: (x) => parseInt(x),
                    check: (x)=> x > 0 && x < 100
                }
            }
        },
        {
            id: "image",
            // this route has 2 params and matches (for example):
            // "/images/07a9d87b-c07a-42e3-82cf-baea2f94facc/xl"
            match: ["images", "?id", "?size"],
            validate: {
                id: {
                    check: (x)=> isUUID(x)
                },
                size: {
                    check: (x)=> /^(s|m|l|xl)$/.test(x)
                }
            },
            // enable auth for this route
            // (see info about authenticator functions below)
            auth: true
        },
        {
            id: "group-list",
            // matches only: "/users" or "/images"
            match: ["?type"],
            validate: {
                type: {
                    check: (x) => /^(users|images)$/.test(x)
                }
            },
            auth: true
        },
    ]
};


// `HTMLRouter` ONLY works in browser environments
// for non-browser use cases use `BasicRouter`
const router = new r.HTMLRouter(config);
router.addListener(r.EV_ROUTE_CHANGED, console.log);

router.start();
```

See [further comments in source
code](https://github.com/thi-ng/umbrella/blob/master/packages/router/src/api.ts)

## Authors

- Karsten Schmidt

## License

&copy; 2014-2018 Karsten Schmidt // Apache Software License 2.0
