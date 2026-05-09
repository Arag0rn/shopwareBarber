const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        'barbershop-theme': './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../../public'),
        filename: 'js/[name].js',
        clean: false
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ],
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000
    }
};
