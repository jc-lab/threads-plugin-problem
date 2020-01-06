const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const NodeExternals = require('webpack-node-externals');
const ThreadPlugin = require('threads-plugin');

const TS_LOADER = {
    loader: "ts-loader",
    options: {
        configFile: path.resolve(__dirname, './tsconfig.json')
    }
};

module.exports = {
    target: 'node',
    entry: {
        main: './src/index.ts'
    },
    output: {
        filename: 'bundle.js',
        path: process.env.BUNDLE_JS_DIR ? path.resolve(process.env.BUNDLE_JS_DIR) : path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                ...TS_LOADER,
                exclude: [
                    path.join(__dirname, "node_modules")
                ],
            }
        ]
    },
    plugins: [new ThreadPlugin()],
    optimization: {
        minimize: false
    },
    externals: [NodeExternals()]
};
