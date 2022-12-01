import React, { FC } from 'react';
import Confetti from 'react-confetti';

const ConfettiSplash: FC<{ confetti: boolean }> = ({ confetti }) => (
  <div className={`opacity-on ${confetti ? '' : 'opacity-off'}`}>
    <Confetti />
  </div>
);

export default ConfettiSplash;