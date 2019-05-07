import React from 'react';
import { Nav } from 'office-ui-fabric-react';
import useReactRouter from 'use-react-router';

export default () => {
  const {
    history,
    match: {
      params: { applicationId, versionId },
    },
  } = useReactRouter();

  return (
    <Nav
      styles={{
        root: { width: 256, border: '1px solid #ccc;', height: '100%' },
      }}
      groups={[
        {
          links: [
            {
              name: 'App Assets',
              url: 'http://example.com',
              links: [
                {
                  name: 'Intents',
                  url: `/application/${applicationId}/version/${versionId}/intents`,
                  key: 'intents',
                },
                {
                  name: 'Entities',
                  url: `/application/${applicationId}/version/${versionId}/entities`,
                  key: 'entities',
                },
              ],
              isExpanded: true,
            },
            {
              name: 'Improve app Performance',
              url: 'http://example.com',
              key: 'key3',
              isExpanded: true,
              links: [
                {
                  name: 'Review endpoint utterances',
                  url: 'http://msn.com',
                  key: 'key4',
                },
                {
                  name: 'Phrase lists',
                  url: 'http://msn.com',
                  key: 'key5',
                },
                {
                  name: 'Patterns',
                  url: 'http://msn.com',
                  key: 'key2',
                },
              ],
            },
          ],
        },
      ]}
      onLinkClick={(e, item) => {
        if (e && item) {
          e.preventDefault();
          history.push(item.url);
        }
      }}
      expandedStateText={'expanded'}
      collapsedStateText={'collapsed'}
      selectedKey={location.pathname.includes('intents') ? 'intents' : 'entities'}
      expandButtonAriaLabel={'Expand or collapse'}
    />
  );
};
