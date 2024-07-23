// components/Modal.js

import React from 'react';
import './Modal.css'; // Custom styles for modal

const Modal = ({ isOpen, onRequestClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onRequestClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="modal-close" onClick={onRequestClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
