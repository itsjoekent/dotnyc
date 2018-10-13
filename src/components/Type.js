import styled from 'styled-components';

export const NavTitle = styled.h3`
  color: ${props => props.theme.colors.black};
  font-family: ${props => props.theme.font.family};
  font-size: ${props => props.theme.font.sizing.base.mobile}px;
  font-weight: ${props => props.theme.font.weight.bold};

  ${props => props.theme.media.desktopSmall`
    font-size: ${props => props.theme.font.sizing.base.desktop}px;
  `}
`;

export const NavSubtitle = styled.p`
  color: ${props => props.theme.colors.black};
  font-family: ${props => props.theme.font.family};
  font-size: ${props => props.theme.font.sizing.small.mobile}px;
  font-weight: ${props => props.theme.font.weight.light};

  ${props => props.theme.media.desktopSmall`
    font-size: ${props => props.theme.font.sizing.small.desktop}px;
  `}
`;

export const Hero = styled.h1`
  color: ${props => props.theme.colors.lightBlue};
  font-family: ${props => props.theme.font.family};
  font-size: ${props => props.theme.font.sizing.hero.mobile}px;
  font-weight: ${props => props.theme.font.weight.dark};
  line-height: 1.1em;
  text-transform: uppercase;
  position: relative;

  &:after {
    content: '${props => props.children}';
    position: absolute;
    top: 0.1em;
    left: 0.1em;
    color: ${props => props.theme.colors.vividBlue};
    z-index: -1;
  }

  ${props => props.theme.media.desktopSmall`
    font-size: ${props => props.theme.font.sizing.hero.desktop}px;
  `}
`;

export const Header = styled.h1`
  color: ${props => props.theme.colors.black};
  font-family: ${props => props.theme.font.family};
  font-size: ${props => (props.theme.font.sizing.header.mobile / props.tier) + 4}px;
  font-weight: ${props => props.theme.font.weight.bold};
  line-height: 1.1em;

  ${props => props.theme.media.desktopSmall`
    font-size: ${props => (props.theme.font.sizing.header.desktop / props.tier) + 4}px;
  `}
`;

export const Paragraph = styled.p`
  color: ${props => props.theme.colors.darkBlue};
  font-family: ${props => props.theme.font.family};
  font-size: ${props => props.theme.font.sizing.base.mobile}px;
  font-weight: ${props => props.theme.font.weight.base};

  ${props => props.theme.media.desktopSmall`
    font-size: ${props => props.theme.font.sizing.base.desktop}px;
  `}
`;

export const Link = styled.a`
  display: inline;
  color: ${props => props.theme.colors.lightBlue};
  font-family: ${props => props.theme.font.family};
  font-size: ${props => props.theme.font.sizing.base.mobile}px;
  font-weight: ${props => props.theme.font.weight.light};
  text-decoration: none;

  &:visited {
    color: ${props => props.theme.colors.lightBlue};
  }

  ${props => props.theme.media.desktopSmall`
    font-size: ${props => props.theme.font.sizing.base.desktop}px;
  `}
`;

export const PassiveLink = styled.a`
  display: block;
  color: ${props => props.theme.colors.gray};
  font-family: ${props => props.theme.font.family};
  font-size: ${props => props.theme.font.sizing.small.mobile}px;
  font-weight: ${props => props.theme.font.weight.light};

  &:visited {
    color: ${props => props.theme.colors.gray};
  }

  ${props => props.theme.media.desktopSmall`
    font-size: ${props => props.theme.font.sizing.small.desktop}px;
  `}
`;
