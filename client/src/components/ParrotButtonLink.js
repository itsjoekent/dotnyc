import React from 'react';
import Parrot from './Parrot';
import ParrotButton from './ParrotButton';
import { withRouter, Link } from 'react-router-dom';
import { HOME_PATH, DIRECTORY_PATH } from '../routes';

const ParrotButtonLink = (props) => {
  const { pathname } = props.location;
  const isDirectory = pathname === DIRECTORY_PATH;

  const to = isDirectory ? HOME_PATH : DIRECTORY_PATH;

  return (
    <Link to={to}>
      <ParrotButton>
        <Parrot />
      </ParrotButton>
    </Link>
  );
};

export default withRouter(ParrotButtonLink);
