const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /.(ts|tsx)$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: /node_modules/
            },
            {
                test: /.(glsl|vert|frag)$/,
                use: [
                  'raw-loader',
                  'glslify-loader'
                ],
                include: [path.resolve(__dirname, 'src')],
                exclude: /node_modules/
              }
        ]
    },

    devServer: {
        open: true,
        openPage: "index.html",
        contentBase: path.join(__dirname, "dist"),
        watchContentBase: true,
        port: 8080
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.vert', '.frag'],
        modules: ["node_modules"]
    }
};