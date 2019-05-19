import React from 'react';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 80vh;
`;

const Header = styled.h1`
  color: ${({ theme }) => theme.colors.blue[600]};

  text-transform: uppercase;

  margin-bottom: ${({ theme }) => theme.spacing.base}px;

  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.hero}px;
  font-weight: ${({ theme }) => theme.font.weight.dark};
`;

const Gif = styled.img`
  max-width: 400px;
`;

function NotFound(props) {
  return (
    <NotFoundContainer>
      <Header>page not found</Header>
      <Gif src={process.env.PUBLIC_URL + '/pizza-rat.gif'} alt="NYC Pizza rat" />
    </NotFoundContainer>
  );
}

export default NotFound;
