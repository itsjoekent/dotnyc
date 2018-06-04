import HeaderTypography from './HeaderTypography';

const ContextualHeaderTypography = HeaderTypography.extend`
  color: ${props => props.theme.context.foreground};
`;

export default ContextualHeaderTypography;
