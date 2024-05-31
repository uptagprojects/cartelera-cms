const common = [
    '--require-module ts-node/register' // Load TypeScript module
];

const cms = [
    ...common,
    "test/apps/cms/api/features/**/*.feature",
    "--require test/apps/cms/api/steps/*.steps.ts"
].join(" ");

const backoffice = [
    ...common,
    "tests/apps/backoffice/api/features/**/*.feature",
    "--require tests/apps/backoffice/api/steps/*.steps.ts"
].join(" ");