import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { RowAlignedCenter, Column } from './Flex';
import { BaseSpacer } from './Spacer';
import { NavTitle, NavSubtitle } from './Type';

const LogoColumn = styled(Column)`
  margin-right: ${props => props.theme.spacing.base}px;
`;

const Header = (props) => {
  return (
    <BaseSpacer as="header">
      <RowAlignedCenter>
        <LogoColumn>
          <Link to="/">
            <Logo />
          </Link>
        </LogoColumn>
        <Column>
          <NavTitle>Joe Kent</NavTitle>
          <NavSubtitle>Senior UI Engineer, Blue State Digital</NavSubtitle>
        </Column>
      </RowAlignedCenter>
    </BaseSpacer>
  );
};

export default Header;
