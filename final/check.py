# Verificar si el archivo cumple con el formato {pregunta}\t{respuesta}

file_path = 'dataset.txt'

# Leer el archivo y verificar formato
is_valid = True
invalid_lines = []

try:
    with open(file_path, 'r', encoding='utf-8') as file:
        for line_number, line in enumerate(file, start=1):
            parts = line.strip().split('\t')
            if len(parts) != 2:  # Cada línea debe tener exactamente dos partes
                is_valid = False
                invalid_lines.append((line_number, line.strip()))
except Exception as e:
    is_valid = False
    error_message = str(e)

# Mensaje final
if is_valid:
    print("¡El archivo cumple con el formato esperado!")
else:
    print("El archivo tiene líneas que no cumplen el formato.")
    print(f"Las primeras líneas inválidas son: {invalid_lines[:5]}")
