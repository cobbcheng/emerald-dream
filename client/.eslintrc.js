module.exports = {
  "extends": ["taro/react"],
  "globals": {
    definePageConfig: true,
    defineAppConfig: true,
    wx: true,
  },
  "rules": {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "no-commonjs": "off",
  }
}
