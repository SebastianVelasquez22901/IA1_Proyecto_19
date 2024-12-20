import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { intents } from './intents';
import { responses } from './responses';

// Cargar el modelo Universal Sentence Encoder
let model;

// Función para cargar el modelo
async function loadModel() {
  try {
    model = await use.load();
    console.log('Model loaded successfully');
  } catch (error) {
    console.error('Error loading model:', error);
  }
}

// Inicializar modelo al cargar
loadModel();

const synonyms = {
  // Español
  hola: ['buenos días', 'buenas tardes', 'buenas noches', 'qué tal', 'hola, ¿cómo estás?', 'hola, ¿qué tal?', 'hola, ¿cómo va todo?', 'saludos', 'buenas'],
  adiós: ['hasta luego', 'nos vemos', 'chau', 'hasta la próxima', 'me despido', 'hasta pronto', 'cuídate', 'adiós, que estés bien', 'nos vemos pronto'],
  gracias: ['muchas gracias', 'te lo agradezco', 'muchísimas gracias', 'mil gracias', 'gracias por tu ayuda', 'gracias por todo', 'agradecido', 'gracias, de verdad'],
  cómo_estás: ['¿cómo estás?', '¿qué tal?', '¿qué haces?', 'cuéntame algo', '¿cómo va tu día?', '¿qué planes tienes para hoy?', '¿cómo te sientes?', '¿qué hay de nuevo?', '¿cómo va todo?', '¿qué tal tu día?'],
  hobbies: ['¿cuáles son tus hobbies?', '¿qué te gusta hacer?', '¿tienes algún pasatiempo?', '¿qué haces en tu tiempo libre?', '¿qué te apasiona?', '¿qué actividades disfrutas?', '¿qué te gusta hacer para divertirte?', '¿qué te gusta hacer en tu tiempo libre?', '¿qué te entretiene?'],
  comida_favorita: ['¿cuál es tu comida favorita?', '¿qué te gusta comer?', '¿tienes algún plato favorito?', '¿qué comida prefieres?', '¿cuál es tu postre favorito?', '¿qué tipo de comida te gusta?', '¿te gusta la comida rápida?', '¿qué te gusta cenar?', '¿qué te gusta desayunar?'],
  película_favorita: ['¿cuál es tu película favorita?', '¿qué películas te gustan?', '¿tienes alguna película favorita?', '¿qué película me recomiendas?', '¿cuál es tu género de cine favorito?', '¿te gustan las películas de acción?', '¿cuál es la última película que viste?', '¿qué tipo de películas te gustan?', '¿te gustan las comedias?'],
  música_favorita: ['¿qué tipo de música te gusta?', '¿cuál es tu canción favorita?', '¿tienes algún artista favorito?', '¿qué música prefieres?', '¿te gusta la música clásica?', '¿cuál es tu banda favorita?', '¿qué género musical te gusta más?', '¿qué tipo de música escuchas?', '¿te gusta el rock?'],
  clima: ['¿cómo está el clima?', '¿qué tiempo hace?', '¿va a llover hoy?', '¿cómo estará el clima mañana?', '¿hace frío?', '¿hace calor?', '¿necesito un paraguas hoy?', '¿cómo está el tiempo?', '¿va a hacer sol?', '¿va a nevar?'],
  chistes: ['cuéntame un chiste', 'dime algo gracioso', '¿sabes algún chiste?', 'hazme reír', 'cuéntame algo divertido', 'dime un chiste corto', '¿tienes algún chiste?', 'dime algo chistoso', 'cuéntame una broma'],
  consejos: ['dame un consejo', '¿tienes algún consejo para mí?', 'necesito un consejo', '¿qué me recomiendas?', '¿qué debería hacer?', 'dame un buen consejo', '¿tienes algún tip?', 'dame un consejo útil', '¿qué me sugieres?'],
  motivación: ['dame una frase motivadora', 'necesito motivación', 'anímame', 'dime algo inspirador', 'dame una cita motivacional', 'necesito inspiración', 'motívame'],
  vida_personal: ['cuéntame sobre ti', '¿quién eres?', 'háblame de ti', '¿qué haces?', '¿cuál es tu historia?', '¿cómo es tu vida?', '¿qué te gusta hacer en tu tiempo libre?'],
  viajes: ['¿te gusta viajar?', '¿cuál es tu destino de viaje favorito?', '¿has viajado alguna vez?', '¿dónde te gustaría ir?', '¿cuál es el mejor lugar para visitar?', '¿qué país te gustaría conocer?', '¿te gusta conocer nuevos lugares?'],
  libros: ['¿cuál es tu libro favorito?', '¿qué libros te gustan?', '¿tienes algún autor favorito?', '¿qué libro me recomiendas?', '¿te gusta leer?', '¿qué tipo de libros te gustan?', '¿cuál es el último libro que leíste?'],
  deportes: ['¿te gustan los deportes?', '¿cuál es tu deporte favorito?', '¿practicas algún deporte?', '¿qué equipo te gusta?', '¿ves deportes?', '¿te gusta el fútbol?', '¿cuál es tu jugador favorito?'],
  tecnología: ['¿te gusta la tecnología?', '¿cuál es tu gadget favorito?', '¿qué opinas de la inteligencia artificial?', '¿te gustan los videojuegos?', '¿cuál es tu aplicación favorita?', '¿qué opinas de los avances tecnológicos?', '¿te gusta estar al día con la tecnología?'],
  mascotas: ['¿te gustan los animales?', '¿tienes mascotas?', '¿cuál es tu animal favorito?', '¿te gustan los perros o los gatos?', '¿cómo se llama tu mascota?', '¿te gustaría tener una mascota?', '¿cuál es tu raza de perro favorita?'],
  salud: ['¿cómo te cuidas?', '¿tienes algún consejo de salud?', '¿haces ejercicio?', '¿qué opinas de la alimentación saludable?', '¿cómo manejas el estrés?', '¿te gusta hacer deporte?', '¿tienes algún hábito saludable?'],
  educación: ['¿qué estudiaste?', '¿te gusta aprender?', '¿cuál es tu materia favorita?', '¿tienes algún consejo para estudiar?', '¿qué opinas de la educación en línea?', '¿te gusta ir a la escuela?', '¿cuál es tu asignatura favorita?'],
  noticias: ['¿qué opinas de las noticias actuales?', '¿lees las noticias?', '¿qué piensas sobre la política?', '¿qué opinas del cambio climático?', '¿qué piensas sobre la economía?', '¿te gusta estar informado?', '¿qué opinas de las noticias internacionales?'],
  entretenimiento: ['¿qué te gusta hacer para divertirte?', '¿cuál es tu programa de televisión favorito?', '¿te gustan los videojuegos?', '¿qué haces en tu tiempo libre?', '¿te gusta ir al cine?', '¿cuál es tu serie favorita?', '¿qué tipo de entretenimiento prefieres?'],

  // Inglés
  hello: ['good morning', 'good afternoon', 'good evening', 'how are you', 'hi, how are you?', 'hi there', 'hey, how are you?', 'greetings', 'hello'],
  goodbye: ['see you later', 'see you', 'bye', 'until next time', 'take care', 'catch you later', 'farewell', 'goodbye', 'see you soon'],
  thank_you: ['thanks a lot', 'I appreciate it', 'thank you very much', 'many thanks', 'thanks for your help', 'thanks for everything', 'grateful', 'thanks, really'],
  how_are_you: ['how are you?', 'what’s up?', 'what are you doing?', 'tell me something', 'how’s your day going?', 'any plans for today?', 'how do you feel?', 'what’s new?', 'how’s everything?', 'how’s your day?'],
  hobbies: ['what are your hobbies?', 'what do you like to do?', 'do you have any hobbies?', 'what do you do in your free time?', 'what are you passionate about?', 'what activities do you enjoy?', 'what do you like to do for fun?', 'what do you like to do in your free time?', 'what entertains you?'],
  favorite_food: ['what’s your favorite food?', 'what do you like to eat?', 'do you have a favorite dish?', 'what food do you prefer?', 'what’s your favorite dessert?', 'what kind of food do you like?', 'do you like fast food?', 'what do you like for dinner?', 'what do you like for breakfast?'],
  favorite_movie: ['what’s your favorite movie?', 'what movies do you like?', 'do you have a favorite movie?', 'what movie do you recommend?', 'what’s your favorite film genre?', 'do you like action movies?', 'what’s the last movie you watched?', 'what kind of movies do you like?', 'do you like comedies?'],
  favorite_music: ['what kind of music do you like?', 'what’s your favorite song?', 'do you have a favorite artist?', 'what music do you prefer?', 'do you like classical music?', 'what’s your favorite band?', 'what’s your favorite music genre?', 'what kind of music do you listen to?', 'do you like rock?'],
  weather: ['how’s the weather?', 'what’s the weather like?', 'is it going to rain today?', 'how will the weather be tomorrow?', 'is it cold?', 'is it hot?', 'do I need an umbrella today?', 'how’s the weather?', 'is it going to be sunny?', 'is it going to snow?'],
  jokes: ['tell me a joke', 'say something funny', 'do you know any jokes?', 'make me laugh', 'tell me something funny', 'tell me a short joke', 'do you have any jokes?', 'say something funny', 'tell me a joke'],
  advice: ['give me some advice', 'do you have any advice for me?', 'I need some advice', 'what do you recommend?', 'what should I do?', 'give me a good piece of advice', 'do you have any tips?', 'give me useful advice', 'what do you suggest?'],
  motivation: ['give me a motivational quote', 'I need some motivation', 'cheer me up', 'say something inspiring', 'give me a motivational quote', 'I need inspiration', 'motivate me'],
  personal_life: ['tell me about yourself', 'who are you?', 'tell me about you', 'what do you do?', 'what’s your story?', 'how’s your life?', 'what do you like to do in your free time?'],
  travel: ['do you like to travel?', 'what’s your favorite travel destination?', 'have you ever traveled?', 'where would you like to go?', 'what’s the best place to visit?', 'what country would you like to visit?', 'do you like to explore new places?'],
  books: ['what’s your favorite book?', 'what books do you like?', 'do you have a favorite author?', 'what book do you recommend?', 'do you like to read?', 'what kind of books do you like?', 'what’s the last book you read?'],
  sports: ['do you like sports?', 'what’s your favorite sport?', 'do you play any sports?', 'what’s your favorite team?', 'do you watch sports?', 'do you like soccer?', 'who’s your favorite player?'],
  technology: ['do you like technology?', 'what’s your favorite gadget?', 'what do you think about artificial intelligence?', 'do you like video games?', 'what’s your favorite app?', 'what do you think about technological advancements?', 'do you like to stay updated with technology?'],
  pets: ['do you like animals?', 'do you have pets?', 'what’s your favorite animal?', 'do you like dogs or cats?', 'what’s your pet’s name?', 'would you like to have a pet?', 'what’s your favorite dog breed?'],
  health: ['how do you take care of yourself?', 'do you have any health tips?', 'do you exercise?', 'what do you think about healthy eating?', 'how do you manage stress?', 'do you like to play sports?', 'do you have any healthy habits?'],
  education: ['what did you study?', 'do you like to learn?', 'what’s your favorite subject?', 'do you have any study tips?', 'what do you think about online education?', 'do you like going to school?', 'what’s your favorite class?'],
  news: ['what do you think about current news?', 'do you read the news?', 'what do you think about politics?', 'what do you think about climate change?', 'what do you think about the economy?', 'do you like to stay informed?', 'what do you think about international news?'],
  entertainment: ['what do you like to do for fun?', 'what’s your favorite TV show?', 'do you like video games?', 'what do you do in your free time?', 'do you like going to the movies?', 'what’s your favorite series?', 'what kind of entertainment do you prefer?']
};

// Función para reemplazar sinónimos
function replaceSynonyms(text) {
  for (const [key, values] of Object.entries(synonyms)) {
    const regex = new RegExp(`\\b(${values.join('|')})\\b`, 'gi');
    text = text.replace(regex, key);
  }
  return text;
}

// Preprocesar texto
function preprocessText(text) {
  text = text.toLowerCase().replace(/[^a-záéíóúñü\s]/g, '').trim();
  text = replaceSynonyms(text);
  return text;
}



// Detectar idioma
function detectLanguage(text) {
  const spanishKeywords = [
    'hola', 'buenos días', 'buenas tardes', 'buenas noches', 'qué tal', 'hola, ¿cómo estás?', 'hola, ¿qué tal?', 'hola, ¿cómo va todo?',
    'adiós', 'hasta luego', 'nos vemos', 'chau', 'hasta la próxima', 'me despido', 'hasta pronto', 'cuídate',
    'gracias', 'muchas gracias', 'te lo agradezco', 'muchísimas gracias', 'mil gracias', 'gracias por tu ayuda', 'gracias por todo',
    '¿cómo estás?', '¿qué tal?', '¿qué haces?', 'cuéntame algo', '¿cómo va tu día?', '¿qué planes tienes para hoy?', '¿cómo te sientes?', '¿qué hay de nuevo?',
    '¿cuáles son tus hobbies?', '¿qué te gusta hacer?', '¿tienes algún pasatiempo?', '¿qué haces en tu tiempo libre?', '¿qué te apasiona?', '¿qué actividades disfrutas?', '¿qué te gusta hacer para divertirte?',
    '¿cuál es tu comida favorita?', '¿qué te gusta comer?', '¿tienes algún plato favorito?', '¿qué comida prefieres?', '¿cuál es tu postre favorito?', '¿qué tipo de comida te gusta?', '¿te gusta la comida rápida?',
    '¿cuál es tu película favorita?', '¿qué películas te gustan?', '¿tienes alguna película favorita?', '¿qué película me recomiendas?', '¿cuál es tu género de cine favorito?', '¿te gustan las películas de acción?', '¿cuál es la última película que viste?',
    '¿qué tipo de música te gusta?', '¿cuál es tu canción favorita?', '¿tienes algún artista favorito?', '¿qué música prefieres?', '¿te gusta la música clásica?', '¿cuál es tu banda favorita?', '¿qué género musical te gusta más?',
    '¿cómo está el clima?', '¿qué tiempo hace?', '¿va a llover hoy?', '¿cómo estará el clima mañana?', '¿hace frío?', '¿hace calor?', '¿necesito un paraguas hoy?',
    'cuéntame un chiste', 'dime algo gracioso', '¿sabes algún chiste?', 'hazme reír', 'cuéntame algo divertido', 'dime un chiste corto', '¿tienes algún chiste?',
    'dame un consejo', '¿tienes algún consejo para mí?', 'necesito un consejo', '¿qué me recomiendas?', '¿qué debería hacer?', 'dame un buen consejo', '¿tienes algún tip?',
    'dame una frase motivadora', 'necesito motivación', 'anímame', 'dime algo inspirador', 'dame una cita motivacional', 'necesito inspiración', 'motívame',
    'cuéntame sobre ti', '¿quién eres?', 'háblame de ti', '¿qué haces?', '¿cuál es tu historia?', '¿cómo es tu vida?', '¿qué te gusta hacer en tu tiempo libre?',
    '¿te gusta viajar?', '¿cuál es tu destino de viaje favorito?', '¿has viajado alguna vez?', '¿dónde te gustaría ir?', '¿cuál es el mejor lugar para visitar?', '¿qué país te gustaría conocer?', '¿te gusta conocer nuevos lugares?',
    '¿cuál es tu libro favorito?', '¿qué libros te gustan?', '¿tienes algún autor favorito?', '¿qué libro me recomiendas?', '¿te gusta leer?', '¿qué tipo de libros te gustan?', '¿cuál es el último libro que leíste?',
    '¿te gustan los deportes?', '¿cuál es tu deporte favorito?', '¿practicas algún deporte?', '¿qué equipo te gusta?', '¿ves deportes?', '¿te gusta el fútbol?', '¿cuál es tu jugador favorito?',
    '¿te gusta la tecnología?', '¿cuál es tu gadget favorito?', '¿qué opinas de la inteligencia artificial?', '¿te gustan los videojuegos?', '¿cuál es tu aplicación favorita?', '¿qué opinas de los avances tecnológicos?', '¿te gusta estar al día con la tecnología?',
    '¿te gustan los animales?', '¿tienes mascotas?', '¿cuál es tu animal favorito?', '¿te gustan los perros o los gatos?', '¿cómo se llama tu mascota?', '¿te gustaría tener una mascota?', '¿cuál es tu raza de perro favorita?',
    '¿cómo te cuidas?', '¿tienes algún consejo de salud?', '¿haces ejercicio?', '¿qué opinas de la alimentación saludable?', '¿cómo manejas el estrés?', '¿te gusta hacer deporte?', '¿tienes algún hábito saludable?',
    '¿qué estudiaste?', '¿te gusta aprender?', '¿cuál es tu materia favorita?', '¿tienes algún consejo para estudiar?', '¿qué opinas de la educación en línea?', '¿te gusta ir a la escuela?', '¿cuál es tu asignatura favorita?',
    '¿qué opinas de las noticias actuales?', '¿lees las noticias?', '¿qué piensas sobre la política?', '¿qué opinas del cambio climático?', '¿qué piensas sobre la economía?', '¿te gusta estar informado?', '¿qué opinas de las noticias internacionales?',
    '¿qué te gusta hacer para divertirte?', '¿cuál es tu programa de televisión favorito?', '¿te gustan los videojuegos?', '¿qué haces en tu tiempo libre?', '¿te gusta ir al cine?', '¿cuál es tu serie favorita?', '¿qué tipo de entretenimiento prefieres?'
  ];
  
  const englishKeywords = [
    'hello', 'good morning', 'good afternoon', 'good evening', 'how are you', 'hi, how are you?', 'hi there', 'hey, how are you?',
    'goodbye', 'see you later', 'see you', 'bye', 'until next time', 'take care', 'catch you later', 'farewell',
    'thank you', 'thanks a lot', 'I appreciate it', 'thank you very much', 'many thanks', 'thanks for your help', 'thanks for everything',
    'how are you?', 'what’s up?', 'what are you doing?', 'tell me something', 'how’s your day going?', 'any plans for today?', 'how do you feel?', 'what’s new?',
    'what are your hobbies?', 'what do you like to do?', 'do you have any hobbies?', 'what do you do in your free time?', 'what are you passionate about?', 'what activities do you enjoy?', 'what do you like to do for fun?',
    'what’s your favorite food?', 'what do you like to eat?', 'do you have a favorite dish?', 'what food do you prefer?', 'what’s your favorite dessert?', 'what kind of food do you like?', 'do you like fast food?',
    'what’s your favorite movie?', 'what movies do you like?', 'do you have a favorite movie?', 'what movie do you recommend?', 'what’s your favorite film genre?', 'do you like action movies?', 'what’s the last movie you watched?',
    'what kind of music do you like?', 'what’s your favorite song?', 'do you have a favorite artist?', 'what music do you prefer?', 'do you like classical music?', 'what’s your favorite band?', 'what’s your favorite music genre?',
    'how’s the weather?', 'what’s the weather like?', 'is it going to rain today?', 'how will the weather be tomorrow?', 'is it cold?', 'is it hot?', 'do I need an umbrella today?',
    'tell me a joke', 'say something funny', 'do you know any jokes?', 'make me laugh', 'tell me something funny', 'tell me a short joke', 'do you have any jokes?',
    'give me some advice', 'do you have any advice for me?', 'I need some advice', 'what do you recommend?', 'what should I do?', 'give me a good piece of advice', 'do you have any tips?',
    'give me a motivational quote', 'I need some motivation', 'cheer me up', 'say something inspiring', 'give me a motivational quote', 'I need some inspiration', 'motivate me',
    'tell me about yourself', 'who are you?', 'tell me about you', 'what do you do?', 'what’s your story?', 'how’s your life?', 'what do you like to do in your free time?',
    'do you like to travel?', 'what’s your favorite travel destination?', 'have you ever traveled?', 'where would you like to go?', 'what’s the best place to visit?', 'what country would you like to visit?', 'do you like to explore new places?',
    'what’s your favorite book?', 'what books do you like?', 'do you have a favorite author?', 'what book do you recommend?', 'do you like to read?', 'what kind of books do you like?', 'what’s the last book you read?',
    'do you like sports?', 'what’s your favorite sport?', 'do you play any sports?', 'what’s your favorite team?', 'do you watch sports?', 'do you like soccer?', 'who’s your favorite player?',
    'do you like technology?', 'what’s your favorite gadget?', 'what do you think about artificial intelligence?', 'do you like video games?', 'what’s your favorite app?', 'what do you think about technological advancements?', 'do you like to stay updated with technology?',
    'do you like animals?', 'do you have pets?', 'what’s your favorite animal?', 'do you like dogs or cats?', 'what’s your pet’s name?', 'would you like to have a pet?', 'what’s your favorite dog breed?',
    'how do you take care of yourself?', 'do you have any health tips?', 'do you exercise?', 'what do you think about healthy eating?', 'how do you manage stress?', 'do you like to play sports?', 'do you have any healthy habits?',
    'what did you study?', 'do you like to learn?', 'what’s your favorite subject?', 'do you have any study tips?', 'what do you think about online education?', 'do you like going to school?', 'what’s your favorite class?',
    'what do you think about current news?', 'do you read the news?', 'what do you think about politics?', 'what do you think about climate change?', 'what do you think about the economy?', 'do you like to stay informed?', 'what do you think about international news?',
    'what do you like to do for fun?', 'what’s your favorite TV show?', 'do you like video games?', 'what do you do in your free time?', 'do you like going to the movies?', 'what’s your favorite series?', 'what kind of entertainment do you prefer?'
  ];

  let spanishScore = 0;
  let englishScore = 0;

  const words = text.split(' ');
  for (const word of words) {
    if (spanishKeywords.includes(word)) {
      spanishScore++;
    }
    if (englishKeywords.includes(word)) {
      englishScore++;
    }
  }

  return spanishScore >= englishScore ? 'es' : 'en';
}

// Reconocer el Intent
export async function recognizeIntent(userInput, language) {
  if (!model) {
    throw new Error('El modelo no está cargado');
  }
  const preprocessedInput = preprocessText(userInput);
  const userInputEmb = await model.embed([preprocessedInput]);
  let maxScore = -1;
  let recognizedIntent = null;

  const intentsForLanguage = intents[language];

  for (const [intent, examples] of Object.entries(intentsForLanguage)) {
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
  const language = detectLanguage(userInput);
  const intent = await recognizeIntent(userInput, language);
  const responsesForLanguage = responses[language];
  if (intent && responsesForLanguage[intent]) {
    const possibleResponses = responsesForLanguage[intent];
    if (Array.isArray(possibleResponses)) {
      // Seleccionar una respuesta aleatoria
      const randomIndex = Math.floor(Math.random() * possibleResponses.length);
      return possibleResponses[randomIndex];
    } else {
      return possibleResponses;
    }
  } else {
    return language === 'es' ? "Lo siento, no entiendo eso. ¿Puedes reformularlo?" : "Sorry, I don't understand that. Can you rephrase it?";
  }
}