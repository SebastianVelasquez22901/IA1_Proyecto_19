import json

# Leer el contenido del JSON
with open('./movie_qa_2.txt', 'r', encoding='utf-8') as file:
    lines = file.readlines()
    pairs = [line.split('\t') for line in lines]
    array_de_objetos = []
    for pair in pairs:
        if len(pair) == 2:
            array_de_objetos.append({
                "titles": [pair[0]],
                "model": "Interaction",
                "language": "English",
                "function_name": "",
                "function_code": pair[1],
                "description": "Genero por archivo movie_qa_2.txt"
                })

    #context = [pair[0] for pair in pairs if len(pair) == 2]
    #target = [pair[1] for pair in pairs if len(pair) == 2]

    with open('./otroReal.json', 'w+', encoding='utf-8') as file2:
        json.dump(array_de_objetos, file2, ensure_ascii=False, indent=4)