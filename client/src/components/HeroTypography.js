import Typography from './Typography';

const HeroTypography = Typography.extend`
  font-size: ${props => props.theme.fonts.sizes.yuge.mobile};
  font-family: ${props => props.theme.fonts.families.hero};
  font-weight: 800;
  font-style: italic;
  text-transform: uppercase;

  @media (min-width: 1024px) {
    font-size: ${props => props.theme.fonts.sizes.yuge.desktop};
  }
`;

export default HeroTypography.withComponent('h1');
