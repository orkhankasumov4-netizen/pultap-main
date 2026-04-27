import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import i18nextPlugin from "eslint-plugin-i18next";

export default tseslint.config(
  { ignores: ["dist", "scratch"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "i18next": i18nextPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
      "i18next/no-literal-string": ["warn", { 
        markupOnly: true,
        ignoreAttribute: ["className", "id", "type", "name", "variant", "size", "to", "href", "data-*"] 
      }]
    },
  },
);
