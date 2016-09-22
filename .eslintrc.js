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
        "no-underscore-dangle": ["error", {"allow": ["__server", "__client", "before_", "beforeEach_", "it_", "xit_", "_id", "__itemId"]}],
        "react/prop-types": 0,
        "new-cap": ["error", {"capIsNew": false}],
        "react/no-string-refs": 1
    }
};