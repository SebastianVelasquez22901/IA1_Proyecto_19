# Dependencias

## Para Windows

```bash
python -m venv .env
.\.env\Scripts\activate
pip install nicegui
pip install pywebview[qt]
pip install cefpython3
pip install pyinstaller
```

## Insertar código para cargar el modelo

En la pagina principal ('/'), esta señalado con comentarios el lugar donde se inserta el código para cargar el modelo

```python
@ui.page('/')
async def main():
    with ui.column().classes("h-full w-full flex items-center justify-center"):
        with ui.card().classes(
            "p-8 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center"
        ):
            ui.label("Cargando el modelo, por favor espere...") \
                .classes("text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4")
            ui.spinner(size="lg").classes("my-4 text-blue-500 dark:text-blue-300")
    # Esperar a que el cliente este conectado
    await ui.context.client.connected()
    # Codigo Para Cargar el Modelo----------------------

    # Fin del Codigo------------------------------------
    # Redireccionar a la pagina de chat
    ui.navigate.to(chat)
```

## Insertar el código para obtener respuesta del modelo

En la función **'send()'** esta señalado con comentarios el lugar donde se debe insertar el código para obtener la respuesta del modelo. Como modo de prueba, el mensaje que muestra el modelo, es lo mismo que ingresa el usuario.

```python
def send() -> None:
        if not text.value:
            ui.notify(message='Please enter a message', type='warning',close_button=True)
            return
        stamp = datetime.now().strftime('%X')
        messages.append((user_id, avatar, text.value, stamp, 'User'))
        #Waiting for Bot Response
        chat_messages.refresh(waiting_response=True)
        #bot Response, test: text.value
        #---------Response from Bot----------------
        bot_response = text.value
        #------------------------------------------
        bot_stamp = datetime.now().strftime('%X')
        messages.append((bot_id, bot_avatar, bot_response, bot_stamp, 'Bot'))
        text.value = ''
        chat_messages.refresh(waiting_response=False)
```
