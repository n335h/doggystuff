import hamburgerclose from './hamburgerclose.svg';

import React from 'react';

interface CloseButtonProps {
  onClose: () => void;
}

function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <button className='close-button' onClick={onClose}>
      <img src={hamburgerclose} alt='close' />
    </button>
  );
}

export default CloseButton;