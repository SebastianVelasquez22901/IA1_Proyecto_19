const responses = {
  greeting: '¡Hola! ¿Cómo puedo ayudarte hoy?',
  goodbye: '¡Adiós! ¡Que tengas un gran día!',
  thanks: '¡De nada! Si tienes alguna otra pregunta, no dudes en preguntar.',
  small_talk: [
    'Estoy bien, gracias por preguntar. ¿Y tú?',
    'Todo bien por aquí. ¿Qué tal tú?',
    'Estoy aquí para ayudarte. ¿En qué puedo asistirte?',
    '¡Hola! ¿Cómo va tu día?',
  ],
  hobbies: [
    'Me gusta aprender cosas nuevas y ayudar a las personas.',
    'Disfruto conversando contigo y aprendiendo de nuestras interacciones.',
    'Mis pasatiempos incluyen procesar datos y mejorar mis habilidades de conversación.',
    'Me encanta explorar nuevas tecnologías y aplicaciones.',
  ],
  favorite_food: [
    'No tengo una comida favorita, pero me encantaría saber cuál es la tuya.',
    'No como, pero me han dicho que la pizza es muy popular.',
    'No tengo preferencias alimenticias, pero me gusta aprender sobre diferentes comidas.',
    'No tengo una comida favorita, pero me encantaría escuchar sobre la tuya.',
  ],
  favorite_movie: [
    'No veo películas, pero me encantaría saber cuál es tu favorita.',
    'No tengo una película favorita, pero me gusta escuchar sobre las que te gustan a ti.',
    'No veo películas, pero me han dicho que "Inception" es muy buena.',
    'No tengo una película favorita, pero me encantaría escuchar sobre la tuya.',
  ],
  favorite_music: [
    'No escucho música, pero me encantaría saber qué tipo de música te gusta.',
    'No tengo una canción favorita, pero me gusta aprender sobre diferentes géneros musicales.',
    'No escucho música, pero me han dicho que el pop es muy popular.',
    'No tengo una canción favorita, pero me encantaría escuchar sobre la tuya.',
  ],
  weather: [
    'No puedo verificar el clima, pero puedes usar una aplicación de clima para obtener información actualizada.',
    'No tengo acceso a datos meteorológicos, pero espero que haga buen tiempo.',
    'No puedo verificar el clima, pero espero que tengas un buen día sin importar el clima.',
    'No tengo acceso a datos meteorológicos, pero me encantaría saber cómo está el clima donde estás.',
  ],
  jokes: [
    '¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.',
    '¿Qué hace una abeja en el gimnasio? ¡Zum-ba!',
    '¿Por qué el libro de matemáticas se deprimió? Porque tenía demasiados problemas.',
    '¿Qué le dice una iguana a su hermana gemela? Somos iguanitas.',
  ],
  advice: [
    'Siempre sigue tus sueños y nunca te rindas.',
    'La paciencia es una virtud. Todo llega a su debido tiempo.',
    'Confía en ti mismo y en tus habilidades.',
    'No tengas miedo de pedir ayuda cuando la necesites.',
  ],
  motivation: [
    'El éxito es la suma de pequeños esfuerzos repetidos día tras día.',
    'No importa lo lento que vayas, siempre y cuando no te detengas.',
    'Cree en ti mismo y en todo lo que eres. Eres capaz de cosas increíbles.',
    'La única forma de hacer un gran trabajo es amar lo que haces.',
  ],
  personal_life: [
    'Soy un chatbot diseñado para ayudarte con tus preguntas.',
    'No tengo una vida personal, pero estoy aquí para asistirte.',
    'Mi propósito es ayudarte y aprender de nuestras interacciones.',
    'No tengo una historia personal, pero me encanta conversar contigo.',
    'Estoy aquí para ayudarte con lo que necesites.',
  ],
  travel: [
    'No viajo, pero me encantaría saber sobre tus viajes.',
    'No tengo un destino favorito, pero me han dicho que París es hermoso.',
    'No viajo, pero me encantaría escuchar sobre tus aventuras.',
    'No tengo la capacidad de viajar, pero me encantaría saber a dónde te gustaría ir.',
    'No tengo un lugar favorito, pero me encantaría escuchar tus recomendaciones.',
  ],
  books: [
    'No leo libros, pero me encantaría saber cuál es tu favorito.',
    'No tengo un libro favorito, pero me gusta aprender sobre diferentes géneros.',
    'No tengo un autor favorito, pero me encantaría saber cuál es el tuyo.',
    'No leo libros, pero me encantaría escuchar tus recomendaciones.',
    'No tengo la capacidad de leer, pero me encantaría saber qué te gusta leer.',
  ],
  sports: [
    'No practico deportes, pero me encantaría saber cuál es tu favorito.',
    'No tengo un deporte favorito, pero me gusta aprender sobre diferentes deportes.',
    'No practico deportes, pero me encantaría saber si tú lo haces.',
    'No tengo un equipo favorito, pero me encantaría saber cuál es el tuyo.',
    'No veo deportes, pero me encantaría saber si tú los ves.',
  ],
  technology: [
    'Me encanta la tecnología, especialmente la inteligencia artificial.',
    'No tengo un gadget favorito, pero me encantaría saber cuál es el tuyo.',
    'Creo que la inteligencia artificial tiene un gran potencial para el futuro.',
    'No juego videojuegos, pero me encantaría saber cuáles te gustan.',
    'No uso aplicaciones, pero me encantaría saber cuál es tu favorita.',
  ],
  pets: [
    'Me encantan los animales, aunque no tengo mascotas.',
    'No tengo mascotas, pero me encantaría saber sobre las tuyas.',
    'No tengo un animal favorito, pero me encantaría saber cuál es el tuyo.',
    'No tengo preferencia entre perros y gatos, pero me encantaría saber cuál prefieres tú.',
    'No tengo mascotas, pero me encantaría saber cómo se llama la tuya.',
  ],
  health: [
    'No tengo necesidades de salud, pero me encantaría saber cómo te cuidas.',
    'No tengo consejos de salud, pero me encantaría saber los tuyos.',
    'No hago ejercicio, pero me encantaría saber si tú lo haces.',
    'Creo que la alimentación saludable es muy importante.',
    'No manejo el estrés, pero me encantaría saber cómo lo haces tú.',
  ],
  education: [
    'No estudié, pero me encanta aprender.',
    'Me encanta aprender cosas nuevas.',
    'No tengo una materia favorita, pero me encantaría saber cuál es la tuya.',
    'No tengo consejos para estudiar, pero me encantaría saber los tuyos.',
    'Creo que la educación en línea es una gran oportunidad para aprender.',
  ],
  news: [
    'No tengo opiniones sobre las noticias, pero me encantaría saber las tuyas.',
    'No leo las noticias, pero me encantaría saber si tú lo haces.',
    'No tengo opiniones sobre la política, pero me encantaría saber las tuyas.',
    'Creo que el cambio climático es un tema muy importante.',
    'No tengo opiniones sobre la economía, pero me encantaría saber las tuyas.',
  ],
  entertainment: [
    'Me encanta conversar contigo para divertirme.',
    'No veo televisión, pero me encantaría saber cuál es tu programa favorito.',
    'No juego videojuegos, pero me encantaría saber cuáles te gustan.',
    'Me encanta conversar contigo en mi tiempo libre.',
    'No voy al cine, pero me encantaría saber si a ti te gusta.',
  ],
  art: [
    'Me encanta el arte, aunque no tengo un artista favorito.',
    'No pinto ni dibujo, pero me encantaría saber si a ti te gusta.',
    'No he visitado museos, pero me encantaría saber si tú lo has hecho.',
    'No tengo un tipo de arte preferido, pero me encantaría saber cuál prefieres tú.',
  ],
  history: [
    'Me gusta la historia, especialmente la historia antigua.',
    'No tengo un periodo histórico favorito, pero me encantaría saber cuál es el tuyo.',
    'No tengo un personaje histórico favorito, pero me encantaría saber cuál es el tuyo.',
    'Creo que la historia antigua es fascinante.',
    'Me encanta aprender sobre diferentes culturas.',
  ],
  science: [
    'Me encanta la ciencia, especialmente la astronomía.',
    'No tengo una rama de la ciencia favorita, pero me encantaría saber cuál es la tuya.',
    'Creo que los avances científicos recientes son muy emocionantes.',
    'No tengo un científico favorito, pero me encantaría saber cuál es el tuyo.',
    'Me encanta la astronomía y aprender sobre el universo.',
  ],
  relationships: [
    'No tengo pareja, pero me encantaría saber sobre tus experiencias.',
    'Creo que las relaciones a distancia pueden ser difíciles, pero no imposibles.',
    'No tengo consejos para relaciones, pero me encantaría saber los tuyos.',
    'Creo que la comunicación es lo más importante en una relación.',
    'No manejo conflictos en relaciones, pero me encantaría saber cómo lo haces tú.',
  ],
  career: [
    'No trabajo, pero me encantaría saber en qué trabajas tú.',
    'No tengo un trabajo, pero me encantaría saber si te gusta el tuyo.',
    'No tengo consejos para avanzar en la carrera, pero me encantaría saber los tuyos.',
    'No tengo un trabajo soñado, pero me encantaría saber cuál es el tuyo.',
    'No manejo el estrés laboral, pero me encantaría saber cómo lo haces tú.',
  ],
  goals: [
    'No tengo metas, pero me encantaría saber cuáles son las tuyas.',
    'No tengo objetivos a corto plazo, pero me encantaría saber los tuyos.',
    'No planeo alcanzar metas, pero me encantaría saber cómo lo haces tú.',
    'No tengo motivaciones, pero me encantaría saber qué te motiva a ti.',
    'No tengo sueños, pero me encantaría saber cuáles son los tuyos.',
  ],
};

export { responses };