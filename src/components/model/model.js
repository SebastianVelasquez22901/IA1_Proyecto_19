import * as tf from '@tensorflow/tfjs';

// Crear y entrenar el modelo
export async function createAndTrainModel(data) {
  const { questions, answers } = data;

  // Construir vocabulario y mapear índices a respuestas completas
  const tokenizer = new Set(questions.join(' ').split(' '));
  const vocab = Array.from(tokenizer);
  const vocabMap = vocab.reduce((map, word, i) => {
    map[word] = i + 1; // Comenzamos en 1, reservamos 0 para padding
    return map;
  }, {});

  const tokenize = (sentence) =>
    sentence.split(' ').map((word) => vocabMap[word] || 0);

  const maxLen = 20; // Aumentar la longitud máxima de las secuencias

  // Procesar preguntas y respuestas
  const inputs = questions.map((q) => {
    const tokens = tokenize(q);
    const padded = new Array(maxLen).fill(0);
    for (let i = 0; i < Math.min(tokens.length, maxLen); i++) {
      padded[i] = tokens[i];
    }
    return padded;
  });

  const outputMap = answers.reduce((map, ans, idx) => {
    map[ans] = idx;
    return map;
  }, {});

  const outputs = answers.map((ans) => outputMap[ans]);

  const xs = tf.tensor2d(inputs);
  const ys = tf.oneHot(tf.tensor1d(outputs, 'int32'), answers.length);

  // Crear modelo
  const input = tf.input({ shape: [maxLen] });
  const embed = tf.layers.embedding({ inputDim: vocab.length + 1, outputDim: 50 }).apply(input); // Aumentar la dimensión del embedding
  const lstm1 = tf.layers.lstm({ units: 64, returnSequences: true }).apply(embed); // Agregar más capas LSTM
  const lstm2 = tf.layers.lstm({ units: 64 }).apply(lstm1);
  const dense = tf.layers.dense({ units: answers.length, activation: 'softmax' }).apply(lstm2);

  const model = tf.model({ inputs: input, outputs: dense });
  model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

  // Entrenar el modelo
  await model.fit(xs, ys, { epochs: 20, batchSize: 32 }); // Ajustar el número de épocas y el tamaño del lote

  return { model, vocab, vocabMap, outputMap, answers };
}

// Predecir respuesta
export async function predictResponse(model, vocab, inputText, vocabMap, outputMap, answers) {
  const tokenize = (sentence) =>
    sentence.split(' ').map((word) => vocabMap[word] || 0);

  const maxLen = 20; // Asegúrate de que la longitud coincida con maxLen
  const tokenizedInput = tokenize(inputText);
  const paddedInput = new Array(maxLen).fill(0);
  for (let i = 0; i < Math.min(tokenizedInput.length, maxLen); i++) {
    paddedInput[i] = tokenizedInput[i];
  }

  const inputTensor = tf.tensor2d([paddedInput]);
  const prediction = model.predict(inputTensor).dataSync();

  const predictedIndex = prediction.indexOf(Math.max(...prediction));
  return answers[predictedIndex];
}