var path = require('path');

module.exports = {
    entry: ['babel-polyfill',path.resolve(__dirname, './_javascript/index.js')],
    output: {
        path: path.resolve(__dirname, './gh-pages/js'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
          {
            test: /\.js$/,
            loaders: [ 'babel' ],
            exclude: /node_modules/,
            include: __dirname
          }
        ]
    }
};
