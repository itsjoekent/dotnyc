import React, { createElement } from 'react';
import marksy from 'marksy';
import ContextualHero from './ContextualHero';
import ContextualHeroTypography from './ContextualHeroTypography';
import ContextualHeaderTypography from './ContextualHeaderTypography';
import ContextualParagraphTypography from './ContextualParagraphTypography';

const compile = marksy({
  createElement,
  elements: {
    h1: (props) => {
      return (
        <ContextualHero {...props}/>
      );
    },
    h2: (props) => {
      return (
        <ContextualHeaderTypography {...props} />
      );
    },
    p: (props) => {
      return (
        <ContextualParagraphTypography {...props} />
      );
    },
  },
});

const Markdown = (props) => {
  const { text } = props;
  if (! text) {
    return null;
  }

  const compiled = compile(text);
  return compiled.tree;
};

export default Markdown;
