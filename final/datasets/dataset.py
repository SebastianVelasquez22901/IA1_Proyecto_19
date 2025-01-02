import json

# Lista de algoritmos con múltiples títulos, códigos y descripciones
dataset = [
    {
        "titles": ["¿Cómo convertir un entero a una cadena?", "Convertir int a string", "Entero a texto"],
        "model": "Básico",
        "language": "Python",
        "function_name": "convertir_int_a_string",
        "function_code": "def convertir_int_a_string(numero):\n    return str(numero)",
        "description": "Convierte un número entero a una representación en cadena."
    },
    {
        "titles": ["¿Cómo ordenar una lista?", "Ordenar lista", "Ordenación simple"],
        "model": "Básico",
        "language": "Python",
        "function_name": "ordenar_lista",
        "function_code": "def ordenar_lista(lista):\n    return sorted(lista)",
        "description": "Ordena una lista de elementos en orden ascendente."
    },
    {
        "titles": ["¿Cómo encontrar el mayor de dos números?", "Máximo de dos números", "Encontrar el máximo"],
        "model": "Básico",
        "language": "Python",
        "function_name": "encontrar_mayor",
        "function_code": "def encontrar_mayor(a, b):\n    return max(a, b)",
        "description": "Devuelve el mayor de dos números dados."
    },
    {
        "titles": ["¿Cómo calcular el promedio de una lista?", "Promedio de lista", "Media aritmética"],
        "model": "Matemáticas",
        "language": "Python",
        "function_name": "calcular_promedio",
        "function_code": "def calcular_promedio(lista):\n    return sum(lista) / len(lista) if lista else 0",
        "description": "Calcula el promedio de los elementos en una lista."
    },
    {
        "titles": ["¿Cómo verificar si un número es par?", "¿Es par?", "Número par"],
        "model": "Matemáticas",
        "language": "Python",
        "function_name": "es_par",
        "function_code": "def es_par(numero):\n    return numero % 2 == 0",
        "description": "Verifica si un número dado es par."
    },
    # Agregar más funciones reales
]

# Agregar más algoritmos simples y reales
algorithms_to_add = [
    {
        "titles": ["¿Cómo invertir una cadena?", "Invertir texto", "Revertir string"],
        "function_name": "invertir_cadena",
        "function_code": "def invertir_cadena(texto):\n    return texto[::-1]",
        "description": "Invierte el orden de los caracteres en una cadena."
    },
    {
        "titles": ["¿Cómo encontrar la suma de una lista?", "Suma de elementos", "Total de la lista"],
        "function_name": "suma_lista",
        "function_code": "def suma_lista(lista):\n    return sum(lista)",
        "description": "Calcula la suma de todos los elementos en una lista."
    },
    {
        "titles": ["¿Cómo calcular el área de un círculo?", "Área de un círculo", "Cálculo de área"],
        "function_name": "area_circulo",
        "function_code": "import math\ndef area_circulo(radio):\n    return math.pi * (radio ** 2)",
        "description": "Calcula el área de un círculo dado su radio."
    },
    {
        "titles": ["¿Cómo verificar si una palabra es un palíndromo?", "Palabra palíndromo", "¿Es palíndromo?"],
        "function_name": "es_palindromo",
        "function_code": "def es_palindromo(palabra):\n    palabra = palabra.lower().replace(' ', '')\n    return palabra == palabra[::-1]",
        "description": "Verifica si una palabra o frase es un palíndromo."
    },
    {
        "titles": ["¿Cómo generar números Fibonacci?", "Serie de Fibonacci", "Generar Fibonacci"],
        "function_name": "fibonacci",
        "function_code": "def fibonacci(n):\n    a, b = 0, 1\n    secuencia = []\n    for _ in range(n):\n        secuencia.append(a)\n        a, b = b, a + b\n    return secuencia",
        "description": "Genera una lista de números Fibonacci hasta 'n' términos."
    },
]

for alg in algorithms_to_add:
    dataset.append({
        "titles": alg["titles"],
        "model": "Básico",
        "language": "Python",
        "function_name": alg["function_name"],
        "function_code": alg["function_code"],
        "description": alg["description"],
    })

# Guardar en un archivo JSON
output_file = "real_algorithms.json"

with open(output_file, "w", encoding="utf-8") as file:
    json.dump(dataset, file, ensure_ascii=False, indent=4)

print(f"Archivo JSON generado: {output_file}")
