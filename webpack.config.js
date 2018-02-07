var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin');

var APP_DIR = path.resolve(__dirname + '/src/js')
var OUTPUT_DIR = path.resolve(__dirname + '/dist')


module.exports = {
    entry: APP_DIR + '/main.jsx',

    output: {
        path: OUTPUT_DIR,
        filename: 'js/main.jsx'
    },

    plugins: [
      new CopyWebpackPlugin([
          { from: 'src/index.html' },
          { from: 'src/css', to: 'css/'},
          { from: 'src/fonts', to: 'fonts/'},
          { from: 'src/img', to: 'img/'}
      ])
    ],

    devServer: {
        inline: true,
        contentBase: OUTPUT_DIR,
        port: 9000
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    
    module : {
        loaders: [{
            test: /\.jsx?$/,
            include: APP_DIR,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            },
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader" 
        },
        {
            test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
            loader: 'file'
        }
        ]
    }
};
