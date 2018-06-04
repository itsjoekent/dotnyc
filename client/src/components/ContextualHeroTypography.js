import HeroTypography from './HeroTypography';

const ContextualHeroTypography = HeroTypography.extend`
  color: ${props => props.theme.context.complements[0]};
`;

export default ContextualHeroTypography;
