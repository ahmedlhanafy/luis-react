import gql from 'graphql-tag';

export default gql`
  mutation CreateNewApp($name: String!, $description: String) {
    createApplication(name: $name, description: $description, culture: enus) {
      id
      name
      culture
      activeVersion
      endpointHitsCount
      intents {
        id
        key: id
        name
      }
    }
  }
`;
