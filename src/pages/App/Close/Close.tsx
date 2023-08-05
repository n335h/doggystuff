

import React from 'react';

interface CloseButtonProps {
  onClose: () => void;
}

function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <button className='close-button' onClick={onClose}>
      Close
    </button>
  );
}

export default CloseButton;