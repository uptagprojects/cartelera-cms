import eslintConfigCodely from "eslint-config-codely";
import eslintConfigPrettier from "eslint-config-prettier";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    eslintConfigCodely.ts,
    eslintConfigPrettier,
    {
        files: ["*.ts", "*.tsx"],
        parserOptions: {
            project: ["./tsconfig.json"]
        },
        rules: {
            "@typescript-eslint/ban-types": "off",
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/require-await": "off"
        }
    },
    {
        files: ["*.test.ts"],
        env: {
            jest: true
        }
    }
];

export default eslintConfig;
