import block from './Block';

const ParrotButton = block.extend`
  position: absolute;
  top: 0;
  left: 0;
  margin: 1em;
  padding: 0.5em;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.cloud};
  box-shadow: 0px 0px 11px 0px ${props => props.theme.colors.pen};
  transition: box-shadow 0.25s;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 3px 0px ${props => props.theme.colors.pen};
  }
`;

export default ParrotButton;
