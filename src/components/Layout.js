import styled from 'styled-components';

export const LayoutSection = styled.section`
  display: block;
  width: 100%;
`;

export const SpacedLayoutSection = styled(LayoutSection)`
  padding-left: ${props => props.theme.spacing.base}px;
  padding-right: ${props => props.theme.spacing.base}px;
`;

export const WideLayoutSection = styled(SpacedLayoutSection)`
  ${props => props.theme.media.desktopSmall`
    max-width: 80vw;
    margin-left: auto;
    margin-right: auto;
  `}
`;

export const IndentedLayoutSection = styled(SpacedLayoutSection)`
  ${props => props.theme.media.tablet`
    padding-left: ${props => props.theme.spacing.base * 4}px;
  `}

  ${props => props.theme.media.desktopSmall`
    padding-left: ${props => props.theme.spacing.base * 16}px;
  `}
`;

export const NarrowLayoutSection = styled(IndentedLayoutSection)`
  ${props => props.theme.media.desktopSmall`
    max-width: 960px;
  `}
`;

export const Layout = styled.article`
  display: block;
  width: 100%;
  margin-top: ${props => props.theme.spacing.base}px;

  ${props => props.theme.media.tablet`
    margin-top: ${props => props.theme.spacing.base * 2}px;
  `}
`;
