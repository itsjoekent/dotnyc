import React from 'react';
import parrots from '../parrots';

function randomParrot() {
  return parrots[Math.floor(Math.random() * parrots.length)];
}

const Parrot = (props) => {
  const parrot = randomParrot();

  return (
    <img src={parrot} alt="Menu" width="32px" height="32px" />
  );
};

export default Parrot;
