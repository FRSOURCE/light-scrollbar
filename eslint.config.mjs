import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintComments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import cypress from "eslint-plugin-cypress";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules",
      "dist",
      "cypress/plugins",
      "cypress/support",
      "cypress/fixtures",
      "cypress.config.ts",
      "scripts",
      "docs",
      "prettier.config.js",
      "eslint.config.mjs",
    ],
  },
  js.configs.recommended,
  eslintComments.recommended,
  ...tsPlugin.configs["flat/recommended"],
  prettier,
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2020,
      },
    },
    rules: {
      indent: ["error", 2],
      semi: 2,
    },
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
    },
  },
  {
    files: ["cypress/**/*.{spec,pageObject}.ts"],
    ...cypress.configs.recommended,
    rules: {
      ...cypress.configs.recommended.rules,
      "@typescript-eslint/no-namespace": "off",
    },
  },
];
