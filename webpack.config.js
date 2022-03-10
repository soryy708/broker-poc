const path = require('path');

const configs = [
    {
        target: 'node',
        module: {
            rules: [
                {
                    test: /\.[tj]s$/u,
                    exclude: '/node_modules/',
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            symlinks: false,
            extensions: ['.ts', '.js'],
        },
        watchOptions: {
            ignored: ['node_modules'],
        },
        entry: [path.join(__dirname, 'src', 'index.ts')],
        externals: [
            'pg-native', // sequelize
        ],
        output: {
            filename: 'index.js',
            libraryTarget: 'commonjs2',
        },
        node: {
            // Looks like webpack messes with Node globals: https://webpack.js.org/configuration/node/
            // We don't want that when building for node, so we disable it.
            __dirname: false,
            __filename: false,
        },
    },
];

if (process.env.BUILD_ENV === 'production') {
    module.exports = configs.map(config => ({
        ...config,
        mode: 'production',
        output: {
            filename: config.output.filename,
            path: path.resolve(__dirname, 'dist', 'prod'),
            libraryTarget: config.output.libraryTarget,
        },
    }));
} else {
    module.exports = configs.map(config => ({
        ...config,
        mode: 'development',
        output: {
            filename: config.output.filename,
            path: path.resolve(__dirname, 'dist', 'dev'),
            libraryTarget: config.output.libraryTarget,
        },
        devtool: 'source-map',
    }));
}
