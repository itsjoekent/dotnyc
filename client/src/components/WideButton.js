import Block from './Block';

const WideButton = Block.extend`
  width: 100%;
  padding: 2em 1em;
  border: 4px solid ${props => props.theme.colors.pen};
  background-color: ${props => props.theme.colors.cloud};
  cursor: pointer;
  position: relative;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0.25em;
    left: 0.25em;
    border: 4px solid ${props => props.theme.colors.pen};
    background-color: ${props => props.theme.colors.rainCloud};
    width: 100%;
    height: 100%;
    z-index: -1;
    transition: top 0.25s, left 0.25s;
  }

  &:hover:after {
    left: -4px;
    top: -4px;
  }
`;

export default WideButton.withComponent('button');
