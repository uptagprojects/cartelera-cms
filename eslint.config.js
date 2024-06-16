module.exports = {
  "extends": [ "next", "next/core-web-vitals", "eslint-config-codely/typescript", "hexagonal-architecture", "prettier" ],
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "parserOptions": {
        "project": ["./tsconfig.json"]
      },
      "rules": {
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
      "files": ["**/contexts/{cma,cda,backoffice,shared}/**/*.ts"],
      "rules": {
        "hexagonal-architecture/enforce": ["error"]
      }
    },
    {
      "files": ["tests/**/*.test.ts"],
      "env": {
        "jest": true
      }
    }
  ]
}
