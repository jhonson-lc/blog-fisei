/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: ["standard", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "no-console": "warn",
    "import/order": ["warn", { "newlines-between": "always" }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/ban-ts-comment": "off", // turn warn
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-use-before-define": "error",
  },
  extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
  rules: {
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    "react/no-unknown-property": "off",
    "react/jsx-no-useless-fragment": "error",
    "react/self-closing-comp": "error",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/role-supports-aria-props": "off",
    "react/self-closing-comp": "warn",
    "react-hooks/rules-of-hooks": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
