import gql from 'graphql-tag';

export default gql`
  mutation RenameEntity($applicationId: String!, $versionId: String!, $id: String!, $name: String!) {
    renameEntity(applicationId: $applicationId, versionId: $versionId, id: $id, name: $name) {
      id
      name
      __typename
    }
  }
`;
