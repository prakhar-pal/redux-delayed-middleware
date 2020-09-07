const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        libraryTarget: 'umd'
    }
}

