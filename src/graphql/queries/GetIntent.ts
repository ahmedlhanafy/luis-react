import gql from 'graphql-tag';

export default gql`
  query GetIntent($applicationId: String!, $intentId: String!) {
    application(id: $applicationId) {
      id
      name
      activeVersion
      intent(id: $intentId) {
        id
        key: id
        name
        utterances(take: 10) {
          text
          tokenizedText
          entityLabels {
            startTokenIndex
            endTokenIndex
            entity {
              id
              name
            }
          }
        }
      }
    }
  }
`;
