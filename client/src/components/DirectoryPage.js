import React from 'react';
import HeroTypography from './HeroTypography';
import ParagraphTypography from './ParagraphTypography';
import ClassicContainer from './ClassicContainer';

const p1 = `I will write some great placeholder text – and nobody writes better placeholder text than me, believe me – and I’ll write it very inexpensively. I will write some great, great text on your website’s Southern border, and I will make Google pay for that text. Mark my words. Despite the constant negative ipsum covfefe.`;
const p2 = `Look at that text! Would anyone use that? Can you imagine that, the text of your next webpage?! Some people have an ability to write placeholder text... It's an art you're basically born with. You either have it or you don't. This placeholder text is gonna be HUGE.`;

const DirectoryPage = (props) => {
  return (
    <ClassicContainer>
      <HeroTypography>Welcome Home Jimmy.</HeroTypography>
      <ParagraphTypography>{p1}</ParagraphTypography>
      <ParagraphTypography>{p2}</ParagraphTypography>
    </ClassicContainer>
  );
};

export default DirectoryPage;
