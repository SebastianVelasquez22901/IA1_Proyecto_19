import React from 'react';

const Message = ({ sender, text }) => (
  <div className={`message ${sender}`}>
    <strong>{sender}: </strong>{text}
  </div>
);

export default Message;
