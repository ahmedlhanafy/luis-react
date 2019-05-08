import gql from 'graphql-tag';

export default gql`
  mutation DeleteApps($ids: [String!]!) {
    deleteApplications(ids: $ids)
  }
`;
