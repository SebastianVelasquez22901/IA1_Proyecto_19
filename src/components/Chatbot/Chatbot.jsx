import React, { useState, useEffect } from 'react';
import { recognizeIntent, generateResponse } from '../model/model'; // Importa las funciones correctamente
import Message from '../Message/Message'; // Componente para mostrar mensajes
import InputField from '../InputField/InputField'; // Componente para el campo de entrada

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadModel() {
      try {
        await recognizeIntent(''); // Cargar el modelo
        setLoading(false);
        console.log("Modelo cargado y configurado");
      } catch (error) {
        console.error("Error al cargar el modelo:", error);
        setLoading(false);
      }
    }
    loadModel();
  }, []);

  const sendMessage = async (userMessage) => {
    if (!userMessage.trim()) {
      console.error("El mensaje está vacío");
      return;
    }

    // Asegurarse de que userMessage es una cadena de texto
    if (typeof userMessage !== 'string') {
      console.error("El mensaje debe ser una cadena de caracteres");
      return;
    }

    // Agrega el mensaje del usuario al estado de los mensajes
    setMessages((prev) => [...prev, { sender: 'Usuario', text: userMessage }]);
    console.log("Mensaje del usuario enviado:", userMessage);

    // Si el modelo no está listo, muestra un mensaje de espera
    if (loading) {
      console.error("El modelo no está listo");
      setMessages((prev) => [...prev, { sender: 'Bot', text: "Lo siento, el modelo aún no está listo para responder." }]);
      return;
    }

    try {
      console.log("Prediciendo respuesta...");
      // Predice la respuesta utilizando el modelo
      const botResponse = await generateResponse(userMessage);
      setMessages((prev) => [...prev, { sender: 'Bot', text: botResponse }]);
      console.log("Respuesta del bot:", botResponse);
    } catch (error) {
      console.error("Error al predecir la respuesta:", error);
      setMessages((prev) => [...prev, { sender: 'Bot', text: "Hubo un error al procesar tu solicitud." }]);
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h2>Chatbot</h2>
      </div>
      <div className="chatbox-messages">
        {loading ? (
          <div className="loading">Cargando el modelo... Por favor, espera.</div>
        ) : (
          messages.map((msg, index) => (
            <Message key={index} sender={msg.sender} text={msg.text} />
          ))
        )}
      </div>
      <InputField onSend={sendMessage} />
    </div>
  );
};

export default Chatbox;