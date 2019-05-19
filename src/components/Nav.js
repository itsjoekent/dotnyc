import React from 'react';
import styled, { keyframes } from 'styled-components';
import RouterLink from './RouterLink'

const NavRow = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.interval * 12}px;
`;

const SecondaryNavGroup = styled.nav`
  display: flex;
  flex-direction: row;
  margin-left: ${({ theme }) => theme.spacing.interval * 2}px;
  margin-top: ${({ theme }) => theme.spacing.interval * 2}px;
`;

const HomeButton = styled.span`
  display: block;

  transition: padding 0.25s;

  padding-top: ${({ theme }) => theme.spacing.interval * 2}px;
  padding-bottom: ${({ theme }) => theme.spacing.interval * 2}px;
  padding-left: ${({ theme }) => theme.spacing.interval * 4}px;
  padding-right: ${({ theme }) => theme.spacing.interval * 4}px;

  color: ${({ theme }) => theme.colors.blue[100]};
  background-color: ${({ theme }) => theme.colors.blue[900]};

  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.small}px;
  font-weight: ${({ theme }) => theme.font.weight.dark};

  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;

  &:hover {
    padding-top: ${({ theme }) => theme.spacing.interval * 3}px;
    padding-bottom: ${({ theme }) => theme.spacing.interval * 3}px;
  }
`;

const NavLinkSpacer = styled.div`
  display: block;

  padding-left: ${({ theme }) => theme.spacing.interval * 4}px;
  padding-right: ${({ theme }) => theme.spacing.interval * 4}px;
`;

const navLinkHoverAnimation = keyframes`
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
`;

const NavLink = styled.span`
  display: inline-block;
  position: relative;

  color: ${({ isActive, theme }) => isActive ? theme.colors.blue[900] : theme.colors.bw[800]};

  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.small}px;
  font-weight: ${({ theme }) => theme.font.weight.bold};

  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;

  &:hover {
    &:after {
      content: '';
      position: absolute;
      display: block;

      height: 2px;
      bottom: 0;
      left: 0;

      animation: ${navLinkHoverAnimation} 0.5s forwards;
      border-radius: 2px;
      background-color: ${({ theme }) => theme.colors.blue[900]};
    }
  }
`;

function Nav(props) {
  return (
    <NavRow>
      <RouterLink to="/">
        <HomeButton>Joe Kent</HomeButton>
      </RouterLink>
      <SecondaryNavGroup>
        <RouterLink to="/about">
          <NavLinkSpacer>
            <NavLink>About</NavLink>
          </NavLinkSpacer>
        </RouterLink>
        <RouterLink to="/blog">
          <NavLinkSpacer>
            <NavLink>Blog</NavLink>
          </NavLinkSpacer>
        </RouterLink>
      </SecondaryNavGroup>
    </NavRow>
  );
}

export default Nav;
