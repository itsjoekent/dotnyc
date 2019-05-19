import React, { useContext } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { ContentContext } from './ContentContainer';

function select(source, path) {
   let value = source;

   for (const key of path.split('.')) {
      if (! value[key]) {
        return null;
      }

      value = value[key];
   }

   return value;
}

const PostArticle = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StandardSpacing = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.base}px;
`;

const DoubleSpacing = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.base * 2}px;
`;

const PostTitle = styled.h1`
  color: ${({ theme }) => theme.colors.blue[600]};

  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.hero}px;
  font-weight: ${({ theme }) => theme.font.weight.dark};
`;

const PostLede = styled.h3`
  color: ${({ theme }) => theme.colors.bw[500]};

  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.base}px;
  font-weight: ${({ theme }) => theme.font.weight.light};
`;

const CoverImage = styled.img`
  display: block;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.base}px;
`;

const CoverImageMetaContainer = styled.div`
  display: block;
  position: relative;

  padding-left: ${({ theme }) => theme.spacing.base / 2}px;
  margin-top: ${({ theme }) => theme.spacing.base / 2}px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 2px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.bw[500]};
  }
`;

const CoverImageTitle = styled.span`
  color: ${({ theme }) => theme.colors.bw[500]};

  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.small}px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const CoverImageDescription = styled.span`
  color: ${({ theme }) => theme.colors.bw[300]};

  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.small}px;
  font-weight: ${({ theme }) => theme.font.weight.light};
`;

const Paragraph = styled.p`
  max-width: 560px;

  color: ${({ theme }) => theme.colors.bw[800]};

  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.base}px;
  font-weight: ${({ theme }) => theme.font.weight.base};
`;

const Link = styled.a`
  display: inline;

  color: ${({ theme }) => theme.colors.blue[900]};

  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.base}px;
  font-weight: ${({ theme }) => theme.font.weight.base};

  text-decoration: underline;
  cursor: pointer;
`;

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 100%;
`;

const GalleryItem = styled.div`
  flex: 0 0 100%;
  margin-bottom: ${({ theme }) => theme.spacing.base / 2}px;

  ${({ theme }) => theme.media.tablet`
    margin-bottom: 0;
    flex: ${({ itemWidth, theme }) => `0 0 calc(${itemWidth} - ${theme.spacing.base}px)`};
  `}
`;

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <StandardSpacing>
        <Paragraph>{children}</Paragraph>
      </StandardSpacing>
    ),
    [INLINES.HYPERLINK]: (node, children) => (
      <Link href={node.data.uri}>{children}</Link>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { title, description, file: { url } } = select(node, 'data.target.fields');

      return (
        <DoubleSpacing>
          <CoverImage src={url} alt={title} />
          <CoverImageMetaContainer>
            {title && <CoverImageTitle>{title}</CoverImageTitle>}
            {description && <CoverImageDescription>{description}</CoverImageDescription>}
          </CoverImageMetaContainer>
        </DoubleSpacing>
      );
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const { media } = select(node, 'data.target.fields');

      const itemWidth = media.length <= 2 ? '50%' : '33.33%';

      return (
        <DoubleSpacing>
          <GalleryContainer>
            {media.map((item) => {
              const { sys, fields } = item;

              const { id } = sys;
              const { title, description, file } = fields;
              const { url } = file;

              return (
                <GalleryItem key={id} itemWidth={itemWidth}>
                  <CoverImage src={url} alt={title} />
                  <CoverImageMetaContainer>
                    {title && <CoverImageTitle>{title}</CoverImageTitle>}
                    {description && <CoverImageDescription>{description}</CoverImageDescription>}
                  </CoverImageMetaContainer>
                </GalleryItem>
              );
            })}
          </GalleryContainer>
        </DoubleSpacing>
      );
    },
  },
};

function Post(props) {
  const content = useContext(ContentContext);

  if (! content) {
    return null;
  }

  const { fields: { title, lede, markup } } = content;

  return (
    <PostArticle>
      <Helmet>
        <title>{title} | Joe Kent</title>
        <meta property="og:title" content={`${title} | Joe Kent`} />
        {lede && <meta name="description" content={lede} />}
      </Helmet>
      <DoubleSpacing>
        <PostTitle>{title}</PostTitle>
        {lede && <PostLede>{lede}</PostLede>}
      </DoubleSpacing>
      {documentToReactComponents(markup, options)}
      {/* Body */}
      {/* Published date ? */}
    </PostArticle>
  );
}

export default Post;
