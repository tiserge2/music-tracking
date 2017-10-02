config = {
    entry:'./src/index.js',

    output: {
        path:'/',
        filename: 'bundle.js'
    },

    devServer: {
        inline: true,
        port: 3000,
        contentBase: './dist'

    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query:{
                    presets:['es2015', 'react']
                }
            },

            {
                test: /\.css/,
                loader:'css-loader!style-loader'
            },

            {
                test: /\.scss/,
                loader: 'sass-loader!style-loader!css-loader'
            }
        ]
    }
}

module.exports = config;