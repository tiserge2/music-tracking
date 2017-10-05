
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
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query:{
                    presets:['es2015', 'react', 'latest', 'stage-0']
                }
            },

            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                loader: 'css-loader!style-loader'
            },

            {
                test: /\.scss$/,
                exclude: /(node_modules)/,
                loader: 'sass-loader!css-loader!style-loader'
            }
        ]
    }
}

module.exports = config;