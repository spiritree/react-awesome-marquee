module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: ['>0.25%', 'not ie 11'],
        useBuiltIns: 'usage'
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import'
  ]
}
