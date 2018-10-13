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
  LayoutSection,
  SpacedLayoutSection,
  NarrowLayoutSection,
  IndentedLayoutSection,
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
    <NarrowLayoutSection>
      <DoubleVerticalSpacer>
        <Header id={id} tier={1}>{children}</Header>
      </DoubleVerticalSpacer>
    </NarrowLayoutSection>
  );
};

const h2 = (props) => {
  const { id, children } = props;

  return (
    <NarrowLayoutSection>
      <DoubleVerticalSpacer>
        <Header id={id} tier={2}>{children}</Header>
      </DoubleVerticalSpacer>
    </NarrowLayoutSection>
  );
};

const h3 = (props) => {
  const { id, children } = props;

  return (
    <NarrowLayoutSection>
      <BaseVerticalSpacer>
        <Header id={id} tier={3}>{children}</Header>
      </BaseVerticalSpacer>
    </NarrowLayoutSection>
  );
};

const h4 = (props) => {
  const { id, children } = props;

  return (
    <NarrowLayoutSection>
      <BaseVerticalSpacer>
        <Header id={id} tier={4}>{children}</Header>
      </BaseVerticalSpacer>
    </NarrowLayoutSection>
  );
};

const h5 = (props) => {
  const { id, children } = props;

  return (
    <NarrowLayoutSection>
      <BaseVerticalSpacer>
        <Header id={id} tier={5}>{children}</Header>
      </BaseVerticalSpacer>
    </NarrowLayoutSection>
  );
};

const h6 = (props) => {
  const { id, children } = props;

  return (
    <NarrowLayoutSection>
      <BaseVerticalSpacer>
        <Header id={id} tier={6}>{children}</Header>
      </BaseVerticalSpacer>
    </NarrowLayoutSection>
  );
};

const p = (props) => {
  const { children } = props;

  return (
    <NarrowLayoutSection>
      <BaseBottomSpacer>
        <Paragraph>{children}</Paragraph>
      </BaseBottomSpacer>
    </NarrowLayoutSection>
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
    <NarrowLayoutSection>
      <DoubleVerticalSpacer>
        <DividingLine />
      </DoubleVerticalSpacer>
    </NarrowLayoutSection>
  );
};

const MarkdownHero = (props) => {
  const { children } = props;

  return (
    <IndentedLayoutSection>
      <DoubleVerticalSpacer>
        <Hero>{children}</Hero>
      </DoubleVerticalSpacer>
    </IndentedLayoutSection>
  );
};

const MarkdownImage = (props) => {
  const { alt, context, layout, src } = props;
  const { directory } = context;

  let LayoutComponent = null;

  switch (layout) {
    case 'column': LayoutComponent = NarrowLayoutSection; break;
    case 'outset': LayoutComponent = SpacedLayoutSection; break;
    case 'screen': LayoutComponent = LayoutSection; break;
    default: LayoutComponent = NarrowLayoutSection; break;
  }

  return (
    <LayoutComponent>
      <DoubleVerticalSpacer>
        <Image alt={alt} src={src} directory={directory} />
      </DoubleVerticalSpacer>
    </LayoutComponent>
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
