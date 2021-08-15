module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],

  plugins: [
    ["module-resolver",
      {
        "alias": {
          "@config": ["./src/config"],
          "@domain": ["./src/domain"],
          "@errors": ["./src/errors"],
          "@infrastructure": ["./src/infrastructure"],
          "@migrations": ["./src/migrations"],
          "@providers": ["./src/providers"],
          "@useCases": ["./src/useCases"]
        }
      }
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
