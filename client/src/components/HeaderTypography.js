import Typography from './Typography';

const HeaderTypography = Typography.extend`
  font-size: ${props => props.theme.fonts.sizes.big};
  font-family: ${props => props.theme.fonts.families.base};
  font-weight: 700;
`;

export default HeaderTypography.withComponent('h2');