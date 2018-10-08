import styled from 'styled-components';

export const HalfSpacer = styled.div`
  display: block;
  padding: ${props => props.theme.spacing.base / 2}px;
`;

export const BaseSpacer = styled.div`
  display: block;
  padding: ${props => props.theme.spacing.base}px;
`;

export const BaseVerticalSpacer = styled.div`
  display: block;
  padding-top: ${props => props.theme.spacing.base}px;
  padding-bottom: ${props => props.theme.spacing.base}px;
`;

export const BaseBottomSpacer = styled.div`
  display: block;
  padding-bottom: ${props => props.theme.spacing.base}px;
`;

export const DoubleSpacer = styled.div`
  display: block;
  padding: ${props => props.theme.spacing.base * 2}px;
`;

export const DoubleVerticalSpacer = styled.div`
  display: block;
  padding-top: ${props => props.theme.spacing.base * 2}px;
  padding-bottom: ${props => props.theme.spacing.base * 2}px;
`;

export const DoubleBottomSpacer = styled.div`
  display: block;
  padding-bottom: ${props => props.theme.spacing.base * 2}px;
`;
