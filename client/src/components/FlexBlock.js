import Block from './Block';

const FlexBlock = Block.extend`
  display: flex;

  ${props => props.column ? `flex-direction: 'column'` : ''}
  ${props => props.row ? `flex-direction: row` : ''}

  ${props => props.justifyCenter ? 'justify-content: center' : ''}
  ${props => props.alignCenter ? 'align-items: center' : ''}
`;

export default FlexBlock;
