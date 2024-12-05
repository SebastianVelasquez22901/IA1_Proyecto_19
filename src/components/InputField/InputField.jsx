import React, { useState } from 'react';

const InputField = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    onSend(input);
    setInput('');
  };

  return (
    <div className="input-field">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu mensaje..."
      />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
};

export default InputField;
