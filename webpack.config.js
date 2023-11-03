module.exports = {
    //...
    module: {
        rules: [
            //...
            {
                test: /\.node$/,
                loader: 'node-loader',
                exclude: /node_modules/
            },
        ],
    },
  };