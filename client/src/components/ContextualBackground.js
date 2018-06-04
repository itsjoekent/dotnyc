import Block from './Block';

const ContextualBackground = Block.extend`
  background-color: ${props => props.theme.context.primary};
  min-height: 100vh;
`;

export default ContextualBackground;
