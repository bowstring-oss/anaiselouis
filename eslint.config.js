/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

const { configs: { all: allConfig, recommended: recommendedConfig } } = require("@eslint/js");
const { FlatCompat }                                                  = require("@eslint/eslintrc");


const flatCompat = new FlatCompat(
  {
    baseDirectory: __dirname,
    recommendedConfig,
    allConfig,
  },
);

module.exports = [
  {
    ignores: [
      "dist",
      "gha-creds-*.json",
      "node_modules",
      "temp",
      "tmp",
      "**/*-debug.log",
      "**/.DS_Store",
      ".angular",
      ".firebase",
      ".idea",
      ".runtimeconfig.json",
      ".service-account.json",
    ],
  },
  {
    plugins: {
      "@angular-eslint": require("@angular-eslint/eslint-plugin"),
      "@nx":             require("@nx/eslint-plugin"),
    },
  },
  ...flatCompat.extends(
    "plugin:@angular-eslint/template/accessibility",
    "plugin:@angular-eslint/template/recommended",
    "plugin:@nx/angular-template",
  ).map(
    (config) => ({
      ...config,
      files: [ "**/*.html" ],
    }),
  ),
  ...flatCompat.extends(
    "plugin:@nx/angular",
    "plugin:@nx/typescript",
  ).map(
    (config) => ({
      ...config,
      files: [ "**/*.ts" ],
    }),
  ),
  {
    files: [ "**/*.ts" ],
    rules: {
      "@angular-eslint/component-selector": [
        "error",
        {
          prefix: "bowstring-",
          style:  "kebab-case",
          type:   "element",
        },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          prefix: "bowstring",
          style:  "camelCase",
          type:   "attribute",
        },
      ],
      "@angular-eslint/no-input-rename":    [ "off" ],
      "@angular-eslint/no-output-rename":   [ "off" ],
      "@angular-eslint/pipe-prefix":        [
        "error",
        { prefixes: [ "bowstring" ] },
      ],
      "@nx/enforce-module-boundaries":      [
        "error",
        {
          allow:                         [],
          depConstraints:                [
            {
              onlyDependOnLibsWithTags: [ "*" ],
              sourceTag:                "*",
            },
          ],
          enforceBuildableLibDependency: true,
        },
      ],
    },
  },
  {
    files: [ "apps/**/*.ts" ],
    rules: {
      "@angular-eslint/component-selector": [
        "error",
        {
          prefix: "bowstring-app-",
          style:  "kebab-case",
          type:   "element",
        },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          prefix: "bowstringApp",
          style:  "camelCase",
          type:   "attribute",
        },
      ],
      "@angular-eslint/pipe-prefix":        [
        "error",
        { prefixes: [ "bowstringApp" ] },
      ],
    },
  },
  {
    files: [ "libs/commerce/src/lib/**/*.ts" ],
    rules: {
      "@angular-eslint/component-selector": [
        "error",
        {
          prefix: "bowstring-commerce-",
          style:  "kebab-case",
          type:   "element",
        },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          prefix: "bowstringCommerce",
          style:  "camelCase",
          type:   "attribute",
        },
      ],
      "@angular-eslint/pipe-prefix":        [
        "error",
        { prefixes: [ "bowstringCommerce" ] },
      ],
    },
  },
  {
    files: [ "libs/dispatch/src/lib/**/*.ts" ],
    rules: {
      "@angular-eslint/component-selector": [
        "error",
        {
          prefix: "bowstring-dispatch-",
          style:  "kebab-case",
          type:   "element",
        },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          prefix: "bowstringDispatch",
          style:  "camelCase",
          type:   "attribute",
        },
      ],
      "@angular-eslint/pipe-prefix":        [
        "error",
        { prefixes: [ "bowstringDispatch" ] },
      ],
    },
  },
  {
    files: [ "libs/media/src/lib/**/*.ts" ],
    rules: {
      "@angular-eslint/component-selector": [
        "error",
        {
          prefix: "bowstring-media-",
          style:  "kebab-case",
          type:   "element",
        },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          prefix: "bowstringMedia",
          style:  "camelCase",
          type:   "attribute",
        },
      ],
      "@angular-eslint/pipe-prefix":        [
        "error",
        { prefixes: [ "bowstringMedia" ] },
      ],
    },
  },
];
