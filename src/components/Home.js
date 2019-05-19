import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useInterval from '../hooks/useInterval';

const CODE_BLOCK_HEIGHT = 24;

const CODE_BLOCK_WIDTH_TINY = 8;
const CODE_BLOCK_WIDTH_SMALLER = 12;
const CODE_BLOCK_WIDTH_SMALL = 16;
const CODE_BLOCK_WIDTH_AVERAGE = 24;
const CODE_BLOCK_WIDTH_WIDE = 28;

const CODE_BLOCK_GRADIENT_A = 'linear-gradient(to right, #dabe7e, #ebdcb9);';
const CODE_BLOCK_GRADIENT_B = 'linear-gradient(to right, #da7e9a, #ebb9c9);';
const CODE_BLOCK_GRADIENT_C = 'linear-gradient(to right, #7edabe, #b9ebdc);';
const CODE_BLOCK_GRADIENT_D = 'linear-gradient(to right, #7e9ada, #b9c9eb);';
const CODE_BLOCK_GRADIENT_BLANK = 'none';

const ANIMATION_SPEED_SECONDS = 0.25;

const codeBlockFade = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

function makeWidthAnimation(width) {
  return keyframes`
    0% {
      width: 0;
    }

    100% {
      width: ${width}%;
    }
  `;
}

const widthAnimations = {
  [CODE_BLOCK_WIDTH_TINY]: makeWidthAnimation(CODE_BLOCK_WIDTH_TINY),
  [CODE_BLOCK_WIDTH_SMALLER]: makeWidthAnimation(CODE_BLOCK_WIDTH_SMALL),
  [CODE_BLOCK_WIDTH_SMALL]: makeWidthAnimation(CODE_BLOCK_WIDTH_SMALL),
  [CODE_BLOCK_WIDTH_AVERAGE]: makeWidthAnimation(CODE_BLOCK_WIDTH_AVERAGE),
  [CODE_BLOCK_WIDTH_WIDE]: makeWidthAnimation(CODE_BLOCK_WIDTH_WIDE),
};

const HomeSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const CodeRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const CodeBlock = styled.span`
  display: block;
  height: ${CODE_BLOCK_HEIGHT}px;

  margin-left: ${({ skip, indent }) => indent ? `${CODE_BLOCK_WIDTH_TINY}px` : (
    skip ? `${skip}%` : '0'
  )};

  margin-bottom: ${CODE_BLOCK_HEIGHT * 0.5}px;

  border-radius: 4px;
  background: ${({ gradient }) => gradient};

  animation: ${codeBlockFade} ${ANIMATION_SPEED_SECONDS}s,
    ${({ width }) => widthAnimations[width]} ${ANIMATION_SPEED_SECONDS}s forwards;
`;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItemFromArray(selection) {
  return selection[Math.floor(Math.random() * selection.length)];
}

function generateBlock(width, gradient, skip) {
  const id = Math.random() * 100000;

  return { id, width, gradient, skip };
}

function generateImportStatement() {
  const importBlocks = [];

  importBlocks.push(generateBlock(
    randomItemFromArray([
      CODE_BLOCK_WIDTH_SMALLER,
      CODE_BLOCK_WIDTH_SMALL,
      CODE_BLOCK_WIDTH_AVERAGE,
    ]),
    CODE_BLOCK_GRADIENT_B,
  ));

  if (Math.random() >= 0.65) {
    importBlocks.push(generateBlock(
      randomItemFromArray([
        CODE_BLOCK_WIDTH_SMALLER,
        CODE_BLOCK_WIDTH_SMALL,
        CODE_BLOCK_WIDTH_AVERAGE,
      ]),
      randomItemFromArray([
        CODE_BLOCK_GRADIENT_B,
        CODE_BLOCK_GRADIENT_C,
      ]),
    ));
  }

  return [
    generateBlock(CODE_BLOCK_WIDTH_TINY, CODE_BLOCK_GRADIENT_A),
    ...importBlocks,
  ];
}

function generateFunctionStatements() {
  const statements = Array(getRandomInt(5, 8)).fill([]);

  statements[0] = [
    generateBlock(
      randomItemFromArray([
        CODE_BLOCK_WIDTH_SMALL,
      ]),
      randomItemFromArray([
        CODE_BLOCK_GRADIENT_B,
      ]),
    ),
    generateBlock(
      randomItemFromArray([
        CODE_BLOCK_WIDTH_SMALLER,
        CODE_BLOCK_WIDTH_SMALL,
        CODE_BLOCK_WIDTH_AVERAGE,
      ]),
      randomItemFromArray([
        CODE_BLOCK_GRADIENT_C,
      ]),
    ),
    generateBlock(
      randomItemFromArray([
        CODE_BLOCK_WIDTH_TINY,
      ]),
      randomItemFromArray([
        CODE_BLOCK_GRADIENT_A,
      ]),
    ),
  ];

  statements[statements.length - 1] = [
    generateBlock(
      randomItemFromArray([
        CODE_BLOCK_WIDTH_TINY,
      ]),
      randomItemFromArray([
        CODE_BLOCK_GRADIENT_A,
      ]),
    ),
  ];

  for (let dynamicStatementIndex = 1; dynamicStatementIndex < statements.length - 1; dynamicStatementIndex++) {
    const dynamicStatement = [];
    const totalBlocks = getRandomInt(1, 3);
    const shouldExtraSkip = dynamicStatementIndex > 1 && Math.random() > 0.65;

    for (let dynamicBlockIndex = 0; dynamicBlockIndex < totalBlocks; dynamicBlockIndex++) {
      dynamicStatement.push(generateBlock(
        randomItemFromArray([
          CODE_BLOCK_WIDTH_SMALL,
          CODE_BLOCK_WIDTH_SMALL,
          CODE_BLOCK_WIDTH_SMALLER,
          CODE_BLOCK_WIDTH_AVERAGE,
          CODE_BLOCK_WIDTH_AVERAGE,
          CODE_BLOCK_WIDTH_WIDE,
        ]),
        randomItemFromArray([
          CODE_BLOCK_GRADIENT_D,
          CODE_BLOCK_GRADIENT_D,
          CODE_BLOCK_GRADIENT_C,
        ]),
      ));
    }

    dynamicStatement[0].skip = shouldExtraSkip ? randomItemFromArray([
      CODE_BLOCK_WIDTH_SMALLER,
      CODE_BLOCK_WIDTH_SMALL,
    ]) : CODE_BLOCK_WIDTH_TINY;

    statements[dynamicStatementIndex] = dynamicStatement;
  }

  return statements;
}

function generateSpacerStatements() {
  return [generateBlock(CODE_BLOCK_WIDTH_WIDE, CODE_BLOCK_GRADIENT_BLANK)];
}

function Home(props) {
  const [code, setCode] = useState([]);
  const [lineRenderIndex, setLineRenderIndex] = useState(0);
  const [blockRenderIndex, setBlockRenderIndex] = useState(0);

  useEffect(() => {
    const assembly = [];

    const totalImports = getRandomInt(2, 4);
    for (let importIndex = 0; importIndex < totalImports; importIndex++) {
      assembly.push(generateImportStatement());
    }

    assembly.push(generateSpacerStatements());
    assembly.push(generateSpacerStatements());

    // const totalFunctions = getRandomInt(2, 3);
    const totalFunctions = 2;
    for (let functionIndex = 0; functionIndex < totalFunctions; functionIndex++) {
      const functionStatements = generateFunctionStatements();
      for (const statement of functionStatements) {
        assembly.push(statement);
      }

      assembly.push(generateSpacerStatements());
      assembly.push(generateSpacerStatements());
    }

    setCode(assembly);
  }, []);

  useInterval(() => {
    const hasNewLine = lineRenderIndex + 1 < code.length;
    const hasReachedEndOfLine = code[lineRenderIndex]
      && blockRenderIndex >= code[lineRenderIndex].length - 1;

    if (hasReachedEndOfLine) {
      if (hasNewLine) {
        setLineRenderIndex(lineRenderIndex + 1);
        setBlockRenderIndex(0);
      }
    } else {
      setBlockRenderIndex(blockRenderIndex + 1);
    }
  }, ANIMATION_SPEED_SECONDS * 1000);

  const renderTargets = code.reduce((acc, line, index) => {
    if (index > lineRenderIndex) {
      return acc;
    }

    if (index !== lineRenderIndex) {
      return [
        ...acc,
        line,
      ];
    }

    return [
      ...acc,
      line.filter((block, index) => index <= blockRenderIndex),
    ];
  }, []);

  return (
    <HomeSection>
      {renderTargets.map((line, index) => (
        <CodeRow key={index}>
          {line.map((block, index) => (
            <CodeBlock
              key={block.id}
              width={block.width}
              gradient={block.gradient}
              indent={!! index}
              skip={block.skip}
            />
          ))}
        </CodeRow>
      ))}
    </HomeSection>
  );
}

export default Home;
