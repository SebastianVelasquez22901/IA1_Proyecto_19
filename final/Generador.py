import random

# Frases para generar preguntas y respuestas
preguntas_basicas = [
    "Hola", "¿Cómo estás?", "¿Qué tal?", "¿Cuál es tu nombre?", "¿Dónde vives?", 
    "¿Qué haces?", "¿Qué hora es?", "¿Cuál es tu comida favorita?", 
    "¿Tienes mascotas?", "¿Cuál es tu color favorito?"
]

respuestas_basicas = [
    "Hola", "Estoy bien, ¿y tú?", "Todo bien, gracias", "Mi nombre es ChatGPT", 
    "Vivo en el servidor", "Nada, ¿y tú?", "No tengo reloj", 
    "Me gustan las pizzas", "No, no tengo mascotas", "Me gusta el azul"
]

preguntas_intermedias = [
    "¿Qué opinas de la inteligencia artificial?", "¿Qué es la programación?", 
    "¿Cuál es la capital de España?", "¿Qué son las redes neuronales?", 
    "¿Puedes explicarme el álgebra lineal?"
]

respuestas_intermedias = [
    "Es fascinante, está transformando el mundo", 
    "Es el arte de crear software", "La capital de España es Madrid", 
    "Son modelos inspirados en el cerebro humano", 
    "Es una rama de las matemáticas que estudia vectores y matrices"
]

preguntas_complejas = [
    "¿Cómo se desarrolla un modelo de aprendizaje automático?", 
    "¿Qué es la mecánica cuántica?", 
    "¿Cómo funciona el sistema inmunológico?", 
    "¿Qué opinas sobre los agujeros negros?"
]

respuestas_complejas = [
    "Requiere muchos datos y algoritmos avanzados", 
    "Es la rama de la física que estudia lo más pequeño", 
    "Es un sistema que protege el cuerpo contra infecciones", 
    "Son regiones del espacio-tiempo con gravedad extrema"
]

# Generar líneas
def generar_dataset(num_lineas):
    dataset = []
    for _ in range(num_lineas):
        nivel = random.choice(["basico", "intermedio", "complejo"])
        if nivel == "basico":
            pregunta = random.choice(preguntas_basicas)
            respuesta = random.choice(respuestas_basicas)
        elif nivel == "intermedio":
            pregunta = random.choice(preguntas_intermedias)
            respuesta = random.choice(respuestas_intermedias)
        else:
            pregunta = random.choice(preguntas_complejas)
            respuesta = random.choice(respuestas_complejas)
        dataset.append(f"{pregunta}\t{respuesta}")
    return dataset

# Crear archivo con cientos de miles de líneas
num_lineas = 3000
dataset = generar_dataset(num_lineas)

# Guardar en archivo .txt
file_path = "preguntas_respuestas.txt"
with open(file_path, "w", encoding="utf-8") as f:
    f.write("\n".join(dataset))

print(f"Archivo generado: {file_path}")
