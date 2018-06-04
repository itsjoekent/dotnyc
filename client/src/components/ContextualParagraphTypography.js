import ParagraphTypography from './ParagraphTypography';

const ContextualParagraphTypography = ParagraphTypography.extend`
  color: ${props => props.theme.context.foreground};
`;

export default ContextualParagraphTypography;
