import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { intents } from './intents';
import { responses } from './responses';

// Cargar el modelo Universal Sentence Encoder
let model;
use.load().then((loadedModel) => {
  model = loadedModel;
  console.log('Model loaded');
});

// Diccionario de sinónimos
const synonyms = {
  hola: ['buenos días', 'buenas tardes', 'buenas noches', 'qué tal', 'hola, ¿cómo estás?'],
  adiós: ['hasta luego', 'nos vemos', 'chau', 'hasta la próxima'],
  gracias: ['muchas gracias', 'te lo agradezco', 'muchísimas gracias'],
  // Agrega más sinónimos según sea necesario
};

// Función para reemplazar sinónimos
function replaceSynonyms(text) {
  for (const [key, values] of Object.entries(synonyms)) {
    for (const value of values) {
      if (text.includes(value)) {
        text = text.replace(value, key);
      }
    }
  }
  return text;
}

// Preprocesar texto
function preprocessText(text) {
  text = text.toLowerCase().replace(/[^a-záéíóúñü\s]/g, '').trim();
  text = replaceSynonyms(text);
  return text;
}

// Reconocer el Intent
export async function recognizeIntent(userInput) {
  if (!model) {
    throw new Error('El modelo no está cargado');
  }
  const preprocessedInput = preprocessText(userInput);
  const userInputEmb = await model.embed([preprocessedInput]);
  let maxScore = -1;
  let recognizedIntent = null;

  for (const [intent, examples] of Object.entries(intents)) {
    const preprocessedExamples = examples.map(preprocessText);
    const examplesEmb = await model.embed(preprocessedExamples);
    const scores = await tf.matMul(userInputEmb, examplesEmb, false, true).data();
    const maxExampleScore = Math.max(...scores);
    if (maxExampleScore > maxScore) {
      maxScore = maxExampleScore;
      recognizedIntent = intent;
    }
  }
  return recognizedIntent;
}

// Generar Respuesta
export async function generateResponse(userInput) {
  if (!model) {
    throw new Error('El modelo no está cargado');
  }
  const intent = await recognizeIntent(userInput);
  if (intent && responses[intent]) {
    const possibleResponses = responses[intent];
    if (Array.isArray(possibleResponses)) {
      // Seleccionar una respuesta aleatoria
      const randomIndex = Math.floor(Math.random() * possibleResponses.length);
      return possibleResponses[randomIndex];
    } else {
      return possibleResponses;
    }
  } else {
    return "Lo siento, no entiendo eso. ¿Puedes reformularlo?";
  }
}