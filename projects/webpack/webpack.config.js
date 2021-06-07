const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const merge = require("webpack-merge");

const nodeModules =
  require("module").builtinModules || Object.keys(process.binding("natives"));
const angularModules = ["@angular/core", "@angular/common"];

function getAngularPath(request) {
  for (let i = 0; i < angularModules.length; i++) {
    if (request.includes(angularModules[i])) {
      return angularModules[i].replace("@", "").split("/");
    }
  }

  return undefined;
}

module.exports = function (libName, extensions) {
  console.log("path is", path.resolve(__dirname, "../../src/assets/plugins/"));
  const root = path.resolve(__dirname, "..", libName);
  const tsConfig = path.resolve(root, "tsconfig.lib.json");
  const baseConfig = {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            configFile: tsConfig,
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      plugins: [new TsconfigPathsPlugin({ configFile: tsConfig })],
    },
    mode: "development",
    output: {
      libraryTarget: "commonjs2",
      filename: "[name].js",
      path: path.resolve(__dirname, "../../src/assets/", libName),
    },
    externals: [
      function (_, request, callback) {
        if (nodeModules.includes(request)) {
          return callback(null, [`window.require("${request}")`], "node");
        }
        const angularMod = getAngularPath(request);
        if (Array.isArray(angularMod)) {
          return callback(null, angularMod, "global");
        }

        callback();
      },
    ],

    // target: "electron-renderer",
    optimization: {
      // The following flags enable tree-shaking within webpack
      usedExports: true,
      sideEffects: true,
    },
  };

  const mergedConfig = merge(baseConfig, extensions);
  return mergedConfig;
};
