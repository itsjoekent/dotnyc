import Block from './Block';

const Typography = Block.extend`
  margin-bottom: 1em;

  ${props => props.land ? 'margin-bottom: 0' : ''}

  ${props => props.center ? 'text-align: center' : ''}
`;

export default Typography.withComponent('p');
