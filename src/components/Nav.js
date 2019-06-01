import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
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

  padding-top: ${({ theme }) => theme.spacing.interval * 2}px;
  padding-bottom: ${({ theme }) => theme.spacing.interval * 2}px;
  padding-left: ${({ theme }) => theme.spacing.interval * 4}px;
  padding-right: ${({ theme }) => theme.spacing.interval * 4}px;

  color: ${({ theme }) => theme.colors.bw[700]};
  background-color: ${({ theme }) => theme.colors.lime[500]};

  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.small}px;
  font-weight: ${({ theme }) => theme.font.weight.dark};

  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;

  transition: color 0.15s linear;

  &:hover {
    color: ${({ theme }) => theme.colors.bw[100]};
  }
`;

const NavLinkSpacer = styled.div`
  display: block;

  padding-left: ${({ theme }) => theme.spacing.interval * 4}px;
  padding-right: ${({ theme }) => theme.spacing.interval * 4}px;

  &:hover {
    color: ${({ theme }) => theme.colors.bw[700]};
  }
`;

const NavLink = styled.span`
  display: inline-block;
  position: relative;

  color: ${({ isActive, theme }) => isActive ? theme.colors.lime[500] : theme.colors.bw[500]};

  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.small}px;
  font-weight: ${({ theme }) => theme.font.weight.bold};

  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;

  &:after {
    content: '';
    width: 90%;
    height: ${({ isActive }) => isActive ? '2' : '0'}px;
    display: block;
    position: absolute;
    left: 0px;
    bottom: -4px;
    background-color: ${({ theme }) => theme.colors.lime[500]};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.bw[700]};

    &:after {
      background-color: ${({ theme }) => theme.colors.bw[700]};
    }
  }
`;

function Nav(props) {
  const { location: { pathname } } = props;

  function isActive(path) {
    return pathname === path;
  }

  return (
    <NavRow>
      <RouterLink to="/">
        <HomeButton>Joe Kent</HomeButton>
      </RouterLink>
      <SecondaryNavGroup>
        <RouterLink to="/about">
          <NavLinkSpacer>
            <NavLink isActive={isActive('/about')}>About</NavLink>
          </NavLinkSpacer>
        </RouterLink>
        <RouterLink to="/blog">
          <NavLinkSpacer>
            <NavLink isActive={isActive('/blog')}>Blog</NavLink>
          </NavLinkSpacer>
        </RouterLink>
      </SecondaryNavGroup>
    </NavRow>
  );
}

export default withRouter(Nav);
