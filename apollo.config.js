module.exports = {
  client: {
    includes: [__dirname + '/src/**/*.ts'],
    target: 'typescript',
    service: {
      name: 'luis-graphql',
      url: 'http://localhost:8080/graphql',
    },
  },
};
