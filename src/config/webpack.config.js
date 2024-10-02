const path = require('path');

module.exports = {
    entry: './tests/static/js/cube_render.js', // Adjust this path to point to your main JavaScript file
    output: {
        filename: 'bundle.js', // The name of the output file
        path: path.resolve(__dirname, 'static/js'), // Adjust this path as needed to your static directory
    },
    resolve: {
        alias: {
            three: path.resolve(__dirname, '/node_modules/three'), // Resolves 'three' to the correct path
        },
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Transpile JavaScript files
                exclude: /node_modules/, // Exclude the node_modules directory
                use: {
                    loader: 'babel-loader', // If you are using Babel, ensure you have it installed
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js'], // Resolves extensions when importing
    },
};
