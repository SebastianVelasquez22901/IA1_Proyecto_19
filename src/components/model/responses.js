const responses = {
  greeting: "¡Hola! ¿Cómo puedo ayudarte hoy?",
  goodbye: "¡Adiós! ¡Que tengas un gran día!",
  thanks: "¡De nada! Si tienes alguna otra pregunta, no dudes en preguntar.",
  product_inquiry:
    "Ofrecemos una variedad de productos, incluyendo electrónicos, libros, ropa y más. ¿En qué categoría estás interesado?",
  order_status:
    "Por favor, proporciona tu ID de pedido y con gusto verificaré el estado para ti.",
  shipping_info:
    "Ofrecemos varios métodos de envío, incluyendo estándar, exprés y entrega al día siguiente. Los tiempos y costos dependen del método elegido y tu ubicación.",
  return_policy:
    "Nuestra política de devoluciones permite devolver productos dentro de los 30 días posteriores a la compra. Visita nuestra página de devoluciones para más detalles.",
  payment_methods:
    "Aceptamos tarjetas de crédito/débito, PayPal y transferencias bancarias. Elige el método que prefieras al finalizar tu compra.",
  support_contact:
    "Puedes contactarnos por correo a soporte@ejemplo.com o llamarnos al 1-800-123-4567. También contamos con chat en línea.",
  business_hours:
    "Nuestro horario de atención es de lunes a viernes de 9:00 AM a 5:00 PM. Cerramos fines de semana y días festivos.",
  promotions:
    "Actualmente contamos con ofertas en varias categorías. Visita nuestra sección de promociones para más detalles.",
  account_help:
    "Para asistencia con tu cuenta, puedes recuperar contraseñas olvidadas, actualizar información personal o eliminar tu cuenta desde el panel de usuario.",
  feedback:
    "¡Gracias por compartir tu opinión! Puedes dejar comentarios o sugerencias en nuestra sección de contacto.",
  technical_support:
    "Lamentamos los inconvenientes. Por favor, describe el problema técnico y haremos todo lo posible para ayudarte.",
  product_recommendation:
    "Con gusto te ayudaremos a elegir un producto. Por favor, cuéntanos tus necesidades o preferencias.",
  order_cancellation:
    "Para cancelar un pedido, por favor proporciona tu ID de pedido. Verificaremos el estado y procederemos si es posible.",
  promotions_and_discounts:
    "Consulta nuestras ofertas y promociones actuales en la sección de descuentos de nuestra página web.",
  cuentaChiste:
    "¡Claro! Aquí tienes uno: ¿Por qué el libro de matemáticas estaba triste? ¡Porque tenía demasiados problemas!",
  firmativo: "¡Perfecto! Me alegra que estés de acuerdo.",
  negativo: "Entendido. Si necesitas algo más, no dudes en decírmelo.",
  gracias: "¡Es un placer ayudarte! Estoy aquí para lo que necesites.",
  despedida: "¡Hasta pronto! Cuídate mucho.",
  desconocido:
    "Mmm, no estoy segura de cómo responder a eso. ¿Puedes darme más detalles o preguntar algo diferente?",
  weather_inquiry:
    "El clima depende de tu ubicación. Puedes verificar el pronóstico en tu región específica con una app del tiempo.",
  motivational_quote:
    "“El éxito no se mide por lo que logras, sino por los obstáculos que superas en el camino.” ¡Tú puedes lograrlo!",
  fun_fact:
    "¿Sabías que el corazón humano late más de 100,000 veces al día? ¡Increíble, ¿verdad?!",
  trivia_question:
    "¿Sabes cuál es el animal terrestre más rápido del mundo? ¡El guepardo, que puede alcanzar hasta 112 km/h!",
  joke_request:
    "¡Claro! ¿Por qué el tomate fue al banco? ¡Porque quería ketchup!",
  health_tips:
    "Bebe al menos 8 vasos de agua al día y asegúrate de dormir entre 7 y 8 horas para mantener tu cuerpo y mente saludables.",
  cooking_recipe:
    "¡Aquí tienes una receta rápida de panqueques! Mezcla 1 taza de harina, 1 taza de leche, 1 huevo y una pizca de sal. Cocina en una sartén caliente y disfruta.",
  story_request:
    "¡Claro! Había una vez un pequeño pájaro que soñaba con volar más alto que las nubes. Aunque todos dudaban de él, practicó día tras día hasta que un día, llegó más allá de lo que nadie había imaginado.",
  language_learning:
    '¡Por supuesto! En inglés, "Hola, ¿cómo estás?" se dice "Hello, how are you?". ¿Te gustaría aprender más frases?',
  workout_tips:
    "Empieza con ejercicios simples como caminar, sentadillas y planchas. Dedica 20 minutos al día para construir el hábito. ¡Tu cuerpo te lo agradecerá!",
  tech_news:
    "Recientemente, se lanzaron avances en inteligencia artificial que prometen revolucionar la industria de la salud. ¿Te interesa saber más sobre alguna tecnología específica?",
  mindfulness_tips:
    "Dedica 5 minutos a la respiración consciente: inhala profundamente por la nariz durante 4 segundos, retén el aire por 7, y exhala lentamente por 8. Es un gran inicio.",
  book_recommendations:
    'Si te gustan las novelas emocionantes, te recomiendo "Cien años de soledad" de Gabriel García Márquez. Para algo más reciente, prueba "Sapiens" de Yuval Noah Harari.',
  pet_care:
    "Para cuidar a tu mascota, asegúrate de ofrecerle comida adecuada, ejercicio regular y visitas al veterinario. ¡El amor y la paciencia también son clave!",
  movie_recommendations:
    'Si buscas acción, prueba "Inception". Para una comedia, "The Grand Budapest Hotel". Y si prefieres algo emotivo, "La vida es bella" es una gran elección.',
  DIY_projects:
    "Puedes crear un estante flotante con madera y clavos, o hacer velas aromáticas caseras. Son proyectos fáciles y divertidos para empezar.",
  financial_advice:
    "Empieza creando un presupuesto mensual, separa un porcentaje para ahorrar y evita compras impulsivas. Considera también invertir en educación financiera.",
  life_hacks:
    "¿Sabías que usar una pinza de ropa para sostener un clavo facilita el martillado? ¡Pequeños trucos hacen una gran diferencia!",
  gardening_tips:
    "Riega tus plantas por la mañana para evitar la evaporación rápida, y asegúrate de darles suficiente luz solar según sus necesidades.",
  current_events:
    "Para estar al día con las noticias, revisa las últimas actualizaciones en un portal de confianza o pregunta sobre un tema específico que te interese.",
  travel_tips:
    "Planifica con anticipación, lleva solo lo necesario y revisa los requisitos de viaje de tu destino. ¡Siempre lleva un botiquín básico y una copia de tus documentos!",
  cooking_recipes:
    "Prueba hacer una pasta con salsa al pesto o un pollo al horno con especias. Ambos son fáciles y deliciosos. ¿Quieres más detalles?",
  exercise_ideas:
    "Comienza con 10 minutos de estiramientos, sigue con sentadillas, flexiones y planchas. ¡Incrementa la intensidad según te sientas cómodo!",
  motivational_quotes:
    '"El éxito es la suma de pequeños esfuerzos repetidos día tras día." - ¡No te rindas, vas por buen camino!',
  parenting_tips:
    "Escucha a tus hijos con atención, establece límites claros y dedica tiempo de calidad con ellos. Recuerda, cada niño es único y necesita comprensión.",
  learning_resources:
    "Plataformas como Coursera, Khan Academy y Duolingo son excelentes para aprender. También busca videos tutoriales en YouTube sobre el tema que te interese.",
  tech_troubleshooting:
    "Reinicia tu dispositivo, verifica las conexiones y asegúrate de que el software esté actualizado. Si el problema persiste, cuéntame más detalles y trataré de ayudarte.",
};

export { responses };
