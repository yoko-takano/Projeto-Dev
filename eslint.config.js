import { defineConfig } from "eslint/config";

export default defineConfig([
    {
		ignores: [".next/", "infra/migrations/"],
	},
	{
		files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
		rules: {
			"prefer-const": "warn",
			"no-constant-binary-expression": "error",
		},
	},
]);