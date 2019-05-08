module.exports = {
  client: {
    includes: [__dirname + '/src/**/*.ts'],
    target: 'typescript',
    service: {
      name: 'luis-graphql',
      url: 'https://luis-graphql.herokuapp.com/graphql',
    },
  },
};
