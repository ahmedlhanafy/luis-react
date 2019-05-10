import gql from 'graphql-tag';

export default gql`
  query GetApps {
    applications(take: 10) {
      id
      key: id
      name
      culture
      endpointHitsCount
      activeVersion
    }
  }
`;
