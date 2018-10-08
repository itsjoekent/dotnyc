import React from 'react';
import styled from 'styled-components';
import HeroTypography from './HeroTypography';
import HeaderTypography from './HeaderTypography';
import ParagraphTypography from './ParagraphTypography';
import UnstyledAnchor from './UnstyledAnchor';
import ClassicContainer from './ClassicContainer';
import WideButton from './WideButton';
import ButtonHint from './ButtonHint';

const p1 = `I will write some great placeholder text – and nobody writes better placeholder text than me, believe me – and I’ll write it very inexpensively. I will write some great, great text on your website’s Southern border, and I will make Google pay for that text. Mark my words. Despite the constant negative ipsum covfefe.`;
const p2 = `Look at that text! Would anyone use that? Can you imagine that, the text of your next webpage?! Some people have an ability to write placeholder text... It's an art you're basically born with. You either have it or you don't. This placeholder text is gonna be HUGE.`;

const TwitterHint = styled.div`
  position: absolute;
  left: calc(50% - 18px);
`;

const DirectoryPage = (props) => {
  return (
    <ClassicContainer doublePaddingTop>
      <HeroTypography basePaddingTop>Welcome Home Jimmy.</HeroTypography>
      <ParagraphTypography>{p1}</ParagraphTypography>
      <ParagraphTypography>{p2}</ParagraphTypography>
      <UnstyledAnchor href="https://twitter.com/itsjoekent">
        <WideButton doubleMarginTop>
          <HeaderTypography land>Follow me on Twitter dot com</HeaderTypography>
          <TwitterHint>
            <ButtonHint alwaysOn />
          </TwitterHint>
        </WideButton>
      </UnstyledAnchor>
    </ClassicContainer>
  );
};

export default DirectoryPage;