import React, { createElement } from 'react';
import styled from 'styled-components';
import marksy from 'marksy/jsx';
import Image from './Image';
import {
  BaseBottomSpacer,
  BaseVerticalSpacer,
  DoubleVerticalSpacer,
} from './Spacer';
import {
  SpacedLayoutSection,
  WrappedSpacedLayoutSection,
} from './Layout';
import {
  Header,
  Paragraph,
  Hero,
  Link,
} from './Type';

const h1 = (props) => {
  const { id, children } = props;

  return (
    <DoubleVerticalSpacer>
      <WrappedSpacedLayoutSection>
        <Header id={id} tier={1}>{children}</Header>
      </WrappedSpacedLayoutSection>
    </DoubleVerticalSpacer>
  );
};

const h2 = (props) => {
  const { id, children } = props;

  return (
    <DoubleVerticalSpacer>
      <WrappedSpacedLayoutSection>
        <Header id={id} tier={2}>{children}</Header>
      </WrappedSpacedLayoutSection>
    </DoubleVerticalSpacer>
  );
};

const h3 = (props) => {
  const { id, children } = props;

  return (
    <BaseVerticalSpacer>
      <WrappedSpacedLayoutSection>
        <Header id={id} tier={3}>{children}</Header>
      </WrappedSpacedLayoutSection>
    </BaseVerticalSpacer>
  );
};

const h4 = (props) => {
  const { id, children } = props;

  return (
    <BaseVerticalSpacer>
      <WrappedSpacedLayoutSection>
        <Header id={id} tier={4}>{children}</Header>
      </WrappedSpacedLayoutSection>
    </BaseVerticalSpacer>
  );
};

const h5 = (props) => {
  const { id, children } = props;

  return (
    <BaseVerticalSpacer>
      <WrappedSpacedLayoutSection>
        <Header id={id} tier={5}>{children}</Header>
      </WrappedSpacedLayoutSection>
    </BaseVerticalSpacer>
  );
};

const h6 = (props) => {
  const { id, children } = props;

  return (
    <BaseVerticalSpacer>
      <WrappedSpacedLayoutSection>
        <Header id={id} tier={6}>{children}</Header>
      </WrappedSpacedLayoutSection>
    </BaseVerticalSpacer>
  );
};

const p = (props) => {
  const { children } = props;

  return (
    <BaseBottomSpacer>
      <WrappedSpacedLayoutSection>
        <Paragraph>{children}</Paragraph>
      </WrappedSpacedLayoutSection>
    </BaseBottomSpacer>
  );
};

const DividingLine = styled.div`
  display: block;
  width: 100%;
  height: 2px;
  background-color: ${props => props.theme.colors.gray};
`;

const hr = (props) => {
  return (
    <DoubleVerticalSpacer>
      <WrappedSpacedLayoutSection>
        <DividingLine />
      </WrappedSpacedLayoutSection>
    </DoubleVerticalSpacer>
  );
};

const MarkdownHero = (props) => {
  const { children } = props;

  return (
    <DoubleVerticalSpacer>
      <SpacedLayoutSection>
        <Hero>{children}</Hero>
      </SpacedLayoutSection>
    </DoubleVerticalSpacer>
  );
};

const MarkdownImage = (props) => {
  const { alt, context, src } = props;
  const { directory } = context;

  return (
    <DoubleVerticalSpacer>
      <SpacedLayoutSection>
        <Image alt={alt} src={src} directory={directory} />
      </SpacedLayoutSection>
    </DoubleVerticalSpacer>
  );
};

const compiler = marksy({
  createElement,
  elements: {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    hr,
    a: Link,
  },
  components: {
    Hero: MarkdownHero,
    Image: MarkdownImage,
  },
});

const Markdown = (props) => {
  const { text, directory } = props;

  const result = compiler(text || '', null, { directory });

  return result.tree;
};

export default Markdown;
