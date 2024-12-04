const path = require('path');

module.exports = {
    entry: {
        app: './playground/static/js/app.js',
        index: './playground/static/js/index.js'
    },
    output: {
        filename: '[name].bundle.js', // This will create app.bundle.js and styles.bundle.js
        path: path.resolve(__dirname, 'static/js'), // Adjust this path as needed to your static directory
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Transpile JavaScript files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // If you are using Babel
                },
            },
            {
                test: /\.scss$/,
                use: [
                  "style-loader", //3. Inject styles into DOM
                  "css-loader", //2. Turns css into commonjs
                  "sass-loader" //1. Turns sass into css
                ]
            }
        ],
    },
};
