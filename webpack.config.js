
config = {
    entry:'./client/index.js',

    output: {
        path:__dirname + '/client/',
        filename: 'bundle.js'
    },
    

    devServer: {
        inline: true,
        port: 3001,
        hot: true,
        contentBase: './client',
        proxy: {
            "*": "http://localhost:8080"
        }
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
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
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