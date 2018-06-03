import Typography from './Typography';

const QuoteTypography = Typography.extend`
  font-size: ${props => props.theme.fonts.sizes.big};
  font-family: ${props => props.theme.fonts.families.base};
  font-weight: 200;
  font-style: italic;
  color: ${props => props.theme.colors.rainyCloud};
`;

export default QuoteTypography.withComponent('h4');
