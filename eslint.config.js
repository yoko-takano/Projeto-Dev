import { defineConfig } from "eslint/config";
import react from "eslint-plugin-react";

export default defineConfig([
	{
		ignores: [".next/", "infra/migrations/"],
	},
	{
		files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
		plugins: {
			react,
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			"prefer-const": "warn",
			"no-constant-binary-expression": "error",
		},
	},
]);