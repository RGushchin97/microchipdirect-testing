module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  parser: "babel-eslint",
  rules: {
    "indent": ["error", 2],
    "semi": ["error", "always"],
    "no-extra-semi": ["error"],
    "no-multi-spaces": ["error"],
    "no-multiple-empty-lines": [1, {"max": 1}],
    "max-classes-per-file": ["error", 1],
    "no-empty-function": ["error"],
    "no-magic-numbers": ["error", {
      "ignoreArrayIndexes": true,
      "ignore": [0, 1],
    }],
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": true,
        "FunctionExpression": true,
      }
    }],
    "valid-jsdoc": ["error", {
      "requireReturn": false,
      "requireReturnType": true,
      "requireParamDescription": true,
      "requireReturnDescription": true,
      "requireParamType": true,
    }],
    "complexity": ["warn", {
      "max": 4,
    }],
    "max-len": [0],
    "max-depth": ["error", {
      "max": 4,
    }],
    "max-statements": ["warn", {
      "max": 8,
    }],
    "curly": ["error", "all"],
    "arrow-spacing": ["error", {
      before: true,
      after: true
    }],
  },
};
