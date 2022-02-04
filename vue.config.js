module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.(vert|frag|glsl)$/,
                    use: {
                    loader: 'webpack-glsl-loader'
                    }
                }
            ],
        },
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: '@import "./src/assets/scss/main.scss";'
            }
        }
    }
};