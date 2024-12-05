import React, { useState, useEffect } from 'react';
import { createAndTrainModel, predictResponse } from '../model/model'; // Asegúrate de importar estas funciones correctamente
import Message from '../Message/Message'; // Componente para mostrar mensajes
import InputField from '../InputField/InputField'; // Componente para el campo de entrada
import data from '../model/data.json'; // Datos JSON para entrenar el modelo

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [model, setModel] = useState(null);
  const [vocabMap, setVocabMap] = useState({});
  const [vocab, setVocab] = useState([]);
  const [outputMap, setOutputMap] = useState({});
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function trainModel() {
      try {
        const { model, vocab, vocabMap, outputMap, answers } = await createAndTrainModel(data);
        setModel(model);
        setVocab(vocab);
        setVocabMap(vocabMap);
        setOutputMap(outputMap);
        setAnswers(answers);
        setLoading(false);
        console.log("Modelo entrenado y configurado:", model);
      } catch (error) {
        console.error("Error al entrenar el modelo:", error);
        setLoading(false);
      }
    }
    trainModel();
  }, []);

  const sendMessage = async (userMessage) => {
    if (!userMessage.trim()) {
      console.error("El mensaje está vacío");
      return;
    }

    setMessages((prev) => [...prev, { sender: 'Usuario', text: userMessage }]);
    console.log("Mensaje del usuario enviado:", userMessage);

    if (!model) {
      console.error("El modelo no está listo");
      setMessages((prev) => [...prev, { sender: 'Bot', text: "Lo siento, el modelo aún no está listo para responder." }]);
      return;
    }

    try {
      console.log("Prediciendo respuesta...");
      const botResponse = await predictResponse(model, vocab, userMessage, vocabMap, outputMap, answers); // Pasar outputMap y answers
      setMessages((prev) => [...prev, { sender: 'Bot', text: botResponse }]);
      console.log("Respuesta del bot:", botResponse);
    } catch (error) {
      console.error("Error al predecir la respuesta:", error);
      setMessages((prev) => [...prev, { sender: 'Bot', text: "Hubo un error al procesar tu solicitud." }]);
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox">
        {loading ? (
          <div className="loading">Entrenando el modelo... Por favor, espera.</div>
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
