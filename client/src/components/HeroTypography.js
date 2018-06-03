import Typography from './Typography';

const HeroTypography = Typography.extend`
  font-size: ${props => props.theme.fonts.sizes.yuge}
  font-family: ${props => props.theme.fonts.families.hero}
  font-weight: 800;
  font-style: italic;
  text-transform: uppercase;
`;

export default HeroTypography.withComponent('h1');
