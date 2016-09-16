module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "env": {
      "browser": true,
      "node": true,
      "es6": true
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"] }],
    }
};