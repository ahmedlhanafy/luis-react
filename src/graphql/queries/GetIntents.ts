import gql from 'graphql-tag';

export default gql`
  query GetIntents($applicationId: String!) {
    application(id: $applicationId) {
      id
      name
      activeVersion
      intents {
        id
        key: id
        name
      }
    }
  }
`;
