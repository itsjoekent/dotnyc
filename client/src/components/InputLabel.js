import Typography from './Typography';

const InputLabel = Typography.extend`
  font-size: ${props => props.theme.fonts.sizes.tiny};
  font-family: ${props => props.theme.fonts.families.base};
  font-weight: 200;
  font-style: italic;
  color: ${props => props.theme.colors.rainyCloud};
`;

export default InputLabel.withComponent('label');
