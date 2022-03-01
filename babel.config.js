module.exports = {
  presets: [['@babel/preset-env', { targets: 'last 2 version' }]],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
  ],
};
