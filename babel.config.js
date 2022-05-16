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
        "@repositories": "./src/repositories",
        "@models": "./src/models",
        "@adapters": "./src/adapters"
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}