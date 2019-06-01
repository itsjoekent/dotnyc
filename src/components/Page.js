import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Nav from './Nav';

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;

  padding-left: ${({ theme }) => theme.spacing.base}px;
  padding-right: ${({ theme }) => theme.spacing.base}px;
  padding-bottom: ${({ theme }) => theme.spacing.base * 2}px;

  width: 100%;
  min-height: 100vh;

  padding-top: 4px;
  position: relative;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: ${({ theme }) => theme.colors.lime[500]};
  }
`;

const MaxColumn = styled.article`
  display: block;
  width: 100%;

  max-width: 960px;
  margin-left: 0;

  ${({ theme }) => theme.media.desktopSmall`
    margin-left: 128px;
  `}
`;

function Page(props) {
  const { children } = props;

  return (
    <PageContainer>
      <MaxColumn>
        <Helmet>
          <title>Joe Kent</title>
          <meta name="description" content="Joe Kent's portfolio site" />
        </Helmet>
        <Nav />
        {children}
      </MaxColumn>
    </PageContainer>
  );
}

export default Page;
