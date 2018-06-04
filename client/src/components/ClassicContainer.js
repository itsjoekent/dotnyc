import Block from './Block';

const ClassicContainer = Block.extend`
  width: 100%;
  max-width: ${props => props.theme.maxWidth}
  margin-left: auto;
  margin-right: auto;
  padding-left: 1em;
  padding-right: 1em;
  box-sizing: border-box;
`;

export default ClassicContainer;
