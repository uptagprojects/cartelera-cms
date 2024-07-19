module.exports = {
    "default": {
        "requireModule": ["ts-node/register"],
        "require": [
            "tests/features/step_definitions/*.steps.ts",
            "test/features/**/*.steps.ts"
        ],
        "paths": [
            "tests/features/**/*.feature"
        ],
        "format": [
            "progress-bar",
            ["junit", "coverage/junit.xml"]
        ]
    },
    "cms": {
        "requireModule": ["ts-node/register"],
        "require": [
            "tests/features/step_definitions/*.steps.ts",
            "test/features/cms/step_definitions/*.steps.ts"
        ],
        "paths": [
            "tests/features/cms/**/*.feature"
        ],
        "format": [
            "progress-bar",
            ["junit", "coverage/junit.xml"]
        ]
    },
    "backoffice": {
        "requireModule": ["ts-node/register"],
        "require": [
            "tests/features/step_definitions/*.steps.ts",
            "test/features/backoffice/step_definitions/*.steps.ts"
        ],
        "paths": [
            "tests/features/backoffice/**/*.feature"
        ],
        "format": [
            "progress-bar",
            ["junit", "coverage/junit.xml"]
        ]
    }
}