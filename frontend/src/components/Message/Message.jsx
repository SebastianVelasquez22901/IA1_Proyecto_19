import React from 'react';
import './Message.css'; // Importa el archivo CSS para los estilos

const Message = ({ sender, text }) => {
  return (
    <div className={`message ${sender}`}>
      <p>{text}</p>
    </div>
  );
};

export default Message;