module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "react-app",
        "airbnb",
        "airbnb-typescript",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        },
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project":"./tsconfig.json"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "import/prefer-default-export": "off",

        "react/react-in-jsx-scope": "off",
        "react/require-default-props": "off", // TODO: enable and add default props

        "max-len": ["error", 120]
    },
    ignorePatterns: ['.eslintrc.js', '**/*.css']
}
