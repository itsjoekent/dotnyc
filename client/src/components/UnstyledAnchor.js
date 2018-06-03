import Typography from './Typography';

const UnstyledAnchor = Typography.extend`
  text-decoration: none;
`;

export default UnstyledAnchor.withComponent('a');
