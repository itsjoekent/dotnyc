import Typography from './Typography';

const ParagraphTypography = Typography.extend`
  font-size: ${props => props.theme.fonts.sizes.normal}
  font-family: ${props => props.theme.fonts.families.base}
  font-weight: 400;

  ${props => props.italic ? 'font-style: italic' : ''}
`;

export default ParagraphTypography;
