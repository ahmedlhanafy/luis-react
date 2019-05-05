import { gql } from 'apollo-boost';
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
