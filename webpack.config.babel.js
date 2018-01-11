const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

module.exports = {
 entry: [ "./src/index.js"],
 output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: "bundle.js"
 },
 module: {

   loaders: [
     {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ 
                fallback: 'style-loader',
                use: ['css-loader','sass-loader']
            })
      },
      {
            test: /\.(png|jp(e*)g|svg)$/,  
            use: [{
                loader: 'url-loader',
                options: { 
                    limit: 8000, // Convert images < 8kb to base64 strings
                    name: 'images/[hash]-[name].[ext]'
                } 
            }]
        },
     {
       test: /\.js$/,
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
          presets: ['react', 'es2015'] 
       }
      }
   ]
 }
}



