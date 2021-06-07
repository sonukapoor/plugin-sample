const root = __dirname + "/src/";

module.exports = require("../webpack/webpack.config")("plugins", {
  entry: {
    "my-plugin": `${root}/public-api.ts`,
  },

  module: {
    rules: [
      {
        test: /\.(html)$/,

        use: {
          loader: "html-loader",
        },
      },

      {
        test: /\.(scss)$/,

        use: {
          loader: "sass-loader",
        },
      },
    ],
  },
});
