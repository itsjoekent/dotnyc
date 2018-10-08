import React from 'react';
import { Link } from 'react-router-dom';
import { BaseBottomSpacer } from './Spacer';
import { Centered, Column } from './Flex';
import { Header, PassiveLink } from './Type';

const backCopy = `← Back Home`;

const NotFound = (props) => {
  return (
    <Centered fillHeight>
      <Column>
        <BaseBottomSpacer>
          <Header tier={1}>Page not found.</Header>
        </BaseBottomSpacer>
        <Link to="/">
          <PassiveLink>{backCopy}</PassiveLink>
        </Link>
      </Column>
    </Centered>
  );
};

export default NotFound;
