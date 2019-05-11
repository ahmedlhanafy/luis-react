module.exports = {
  client: {
    includes: [__dirname + '/src/**/*.ts'],
    service: {
      name: "luis-graphql",
      localSchemaFile: "./src/graphql-schema.json"
    }
  },
};
