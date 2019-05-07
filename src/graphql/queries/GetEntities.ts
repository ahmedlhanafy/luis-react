import gql from 'graphql-tag';

export default gql`
  query GetEntities($applicationId: String!) {
    application(id: $applicationId) {
      id
      name
      activeVersion
      entities {
        id
        key: id
        name
      }
    }
  }
`;
