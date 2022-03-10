// Only for Jest's transpilation. Not used when making the build artifacts.
module.exports = {
    presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
};
