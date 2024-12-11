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

// Reconocer el Intent
export async function recognizeIntent(userInput) {
  if (!model) {
    throw new Error('El modelo no está cargado');
  }
  const userInputEmb = await model.embed([userInput]);
  let maxScore = -1;
  let recognizedIntent = null;

  for (const [intent, examples] of Object.entries(intents)) {
    const examplesEmb = await model.embed(examples);
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
    return responses[intent];
  } else {
    return "I'm sorry, I don't understand that. Can you please rephrase?";
  }
}