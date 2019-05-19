import React from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import Footer from './Footer';

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;

  padding-left: ${({ theme }) => theme.spacing.base}px;
  padding-right: ${({ theme }) => theme.spacing.base}px;

  width: 100%;
  min-height: 100vh;

  background-color: ${({ theme }) => theme.colors.blue[100]};
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
        <Nav />
        {children}
        <Footer />
      </MaxColumn>
    </PageContainer>
  );
}

export default Page;
