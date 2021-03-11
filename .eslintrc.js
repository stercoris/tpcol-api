module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        "airbnb/base",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: [
        "@typescript-eslint",
    ],
    rules: {
        indent: "off",
        "linebreak-style": 0,
        quotes: ["error", "double"],
        camelcase: "off",
        "import/extensions": ["error", "never"],
        "import/no-unresolved": "off",
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],
        "no-useless-constructor": "off",
        "no-async-promise-executor": "off",
        "no-cond-assign": "off",
        "valid-jsdoc": ["error", {
            requireReturnType: false,
            requireParamType: false,
            requireParamDescription: false,
        }],
        "no-underscore-dangle": "off",
        "max-classes-per-file": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "class-methods-use-this": "off",
    },
};
