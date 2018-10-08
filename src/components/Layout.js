import styled from 'styled-components';

export const LayoutSection = styled.section`
  display: block;
`;

export const SpacedLayoutSection = styled(LayoutSection)`
  padding-left: ${props => props.theme.spacing.base}px;
  padding-right: ${props => props.theme.spacing.base}px;

  ${props => props.theme.media.desktopSmall`
    padding-left: 0;
    padding-right: ${props => props.theme.spacing.base * 2}px;
  `}
`;

export const WrappedLayoutSection = styled(LayoutSection)``;

export const WrappedSpacedLayoutSection = styled(SpacedLayoutSection)`
  ${props => props.theme.media.desktopSmall`
    padding-left: 0;
    padding-right: 0;
  `}
`;

export const Layout = styled.article`
  width: 100%;
  
  ${props => props.theme.media.tablet`
    padding-left: ${props => props.theme.spacing.base * 4}px;
  `}

  ${props => props.theme.media.desktopSmall`
    padding-left: ${props => props.theme.spacing.base * 16}px;
    margin-top: ${props => props.theme.spacing.base * 4}px;

    ${WrappedLayoutSection}, ${WrappedSpacedLayoutSection} {
      max-width: ${props => props.theme.spacing.base * 40}px;
    }
  `}
`;
