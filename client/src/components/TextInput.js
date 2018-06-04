import Block from './Block';

const TextInput = Block.extend`
  font-size: ${props => props.theme.fonts.sizes.normal};
  font-family: ${props => props.theme.fonts.families.base};
  font-weight: 400;
  width: 100%;
  padding: 0.5em 1em;
  border: 2px solid ${props => props.theme.colors.pen}
  box-shadow: 0px 0px 11px 0px ${props => props.theme.colors.pen};
  transition: box-shadow 0.25s;
  outline: none;

  &:focus {
    box-shadow: 0px 0px 1px 0px ${props => props.theme.colors.pen};
  }
`;

export default TextInput.withComponent('input');
