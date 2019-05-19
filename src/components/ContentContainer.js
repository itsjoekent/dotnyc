import React, { createContext, useEffect, useState } from 'react';
import AsyncPost from './AsyncPost';
import NotFound from './NotFound';

export const ContentContext = createContext(null);

function ContentContainer(props) {
  const { match } = props;
  const [contentValue, setContentValue] = useState(null);
  const [pageNotFound, setPageNotFound] = useState(false);

  const { path } = match;

  useEffect(() => {
    async function fetchContent() {
      const CONTENTFUL_SPACE_ID = process.env.REACT_APP_CONTENTFUL_SPACE_ID;
      const CONTENTFUL_ACCESS_TOKEN = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;

      const contentful = await import('contentful');

      const client = contentful.createClient({
        space: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_ACCESS_TOKEN,
      });

      const { items } = await client.getEntries({
        'content_type': 'post',
        'fields.path': path,
        include: 10,
      });

      const [match] = items;

      if (! match) {
        setPageNotFound(true);
        return;
      }

      setPageNotFound(false);
      setContentValue(match);
    }

    fetchContent();
  }, [path]);

  if (pageNotFound) {
    return (
      <NotFound />
    );
  }

  return (
    <ContentContext.Provider value={contentValue}>
      <AsyncPost />
    </ContentContext.Provider>
  );
}

export default ContentContainer;
