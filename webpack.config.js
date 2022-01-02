const path = require("path");

module.exports = {
   mode: "development",
   devtool: false,
   entry: "./src/Leaderboard.ts",
   module: {
      rules: [
         {
            test: /\.ts$/,
            use: "ts-loader",
            exclude: /node_modules/
         },
         {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader", "sass-loader"]
         }
      ]
   },
   resolve: {
      extensions: [".tsx", ".ts", ".js"]
   },
   output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist")
   }
};
