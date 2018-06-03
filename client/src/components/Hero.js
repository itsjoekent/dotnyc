import React from 'react';
import HeroTypography from './HeroTypography';
import Block from './Block';

const HeroTypeContainer = Block.extend`
  background-color: ${props => props.theme.colors.cloud}
`;

const Hero = (props) => {
  const { children } = props;

  return (
    <HeroTypeContainer basePadding>
      <HeroTypography center land>{children}</HeroTypography>
    </HeroTypeContainer>
  );
};

export default Hero;
