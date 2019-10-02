const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
    // This option controls if and how source maps are generated.
    // https://webpack.js.org/configuration/devtool/
    devtool: 'eval-cheap-module-source-map',

    // https://webpack.js.org/concepts/entry-points/#multi-page-application
    entry: {
        index: './src/page-index/main.js'
    },

    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        port: 8080,
        watchContentBase: true,
        writeToDisk: false // https://webpack.js.org/configuration/dev-server/#devserverwritetodisk-
    },

    // https://webpack.js.org/concepts/loaders/
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                postcssPresetEnv()
                            ]
                        }
                    }
                ]
            },
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // On development we want to see where the file is coming from, hence we preserve the [path]
                            name: '[path][name].[ext]?hash=[hash:20]',
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },

    // https://webpack.js.org/concepts/plugins/
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/page-index/tmpl.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html'
        })
    ],

    watch: true
};
