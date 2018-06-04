import styled from 'styled-components';

const Block = styled.div`
  display: block;
  ${props => props.inline ? 'display: inline' : ''}
  ${props => props.inlineBlock ? 'display: inline-block' : ''}

  box-sizing: border-box;

  padding: 0;
  margin: 0;

  ${props => props.fillWidth ? 'width: 100%;' : ''}
  ${props => props.fillHeight ? 'height: 100%' : ''}

  ${props => props.basePadding ? `padding: 1em` : ''}
  ${props => props.basePaddingTop ? `padding-top: 1em` : ''}
  ${props => props.basePaddingBottom ? `padding-bottom: 1em` : ''}
  ${props => props.basePaddingLeft ? `padding-left: 1em` : ''}
  ${props => props.basePaddingRight ? `padding-right: 1em` : ''}

  ${props => props.doublePadding ? `padding: 4em` : ''}
  ${props => props.doublePaddingTop ? `padding-top: 4em` : ''}
  ${props => props.doublePaddingBottom ? `padding-bottom: 4em` : ''}
  ${props => props.doublePaddingLeft ? `padding-left: 4em` : ''}
  ${props => props.doublePaddingRight ? `padding-right: 4em` : ''}

  ${props => props.baseMargin ? `margin: 1em` : ''}
  ${props => props.baseMarginTop ? `margin-top: 1em` : ''}
  ${props => props.baseMarginBottom ? `margin-bottom: 1em` : ''}
  ${props => props.baseMarginLeft ? `margin-left: 1em` : ''}
  ${props => props.baseMarginRight ? `margin-right: 1em` : ''}

  ${props => props.doubleMargin ? `margin: 4em` : ''}
  ${props => props.doubleMarginTop ? `margin-top: 4em` : ''}
  ${props => props.doubleMarginBottom ? `margin-bottom: 4em` : ''}
  ${props => props.doubleMarginLeft ? `margin-left: 4em` : ''}
  ${props => props.doubleMarginRight ? `margin-right: 4em` : ''}
`;

export default Block;
