import React, { createElement } from 'react';
import styled from 'styled-components';
import marksy from 'marksy/components';
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
  Hero as HeroType,
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

const Hero = (props) => {
  const { children } = props;

  return (
    <DoubleVerticalSpacer>
      <SpacedLayoutSection>
        <HeroType>{children}</HeroType>
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
    Hero,
  },
});

const Markdown = (props) => {
  const { text, directory } = props;

  const result = compiler(text || '', null, { directory });

  return result.tree;
};

export default Markdown;
