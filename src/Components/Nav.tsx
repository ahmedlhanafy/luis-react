import React from 'react';
import { Nav } from 'office-ui-fabric-react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

export default withRouter(({ location, history }: RouteComponentProps) => {
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
                  url: '/application/intents',
                  key: 'intents',
                },
                {
                  name: 'Entities',
                  url: '/application/entities',
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
      selectedKey={
        location.pathname.includes('intents') ? 'intents' : 'entities'
      }
      expandButtonAriaLabel={'Expand or collapse'}
    />
  );
});
