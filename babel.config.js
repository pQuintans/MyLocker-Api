module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        "@controllers": "./src/controllers",
        "@entities": "./src/entities",
        "@services": "./src/services",
        "@repositories": "./src/repositories"
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}