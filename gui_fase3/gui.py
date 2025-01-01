#!/usr/bin/env python3
from datetime import datetime
from typing import List, Tuple
from uuid import uuid4
from nicegui import ui

messages: List[Tuple[str, str, str, str, str]] = []

user_id = str(uuid4())
avatar = f'https://robohash.org/{user_id}?bgset=bg2'

bot_id = str(uuid4())
bot_avatar = f'https://robohash.org/{bot_id}?bgset=bg2'

@ui.refreshable
def chat_messages(own_id: str, waiting_response: bool = False) -> None:
    if messages:
        for user_id, avatar, text, stamp, name in messages:
            ui.chat_message(text=text, name=name, stamp=stamp, avatar=avatar, sent=own_id == user_id)
    else:
        ui.label('No messages yet').classes('mx-auto my-36')
    if waiting_response:
        with ui.chat_message(name='Bot', avatar=bot_avatar):
            ui.spinner(type='dots', size='lg')
    ui.run_javascript('window.scrollTo(0, document.body.scrollHeight)')

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
        

@ui.page('/chat')
async def chat():
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

    ui.add_css(r'a:link, a:visited {color: inherit !important; text-decoration: none; font-weight: 500}')
    with ui.footer().classes('bg-dark'), ui.column().classes('w-full max-w-3xl mx-auto my-6'):
        with ui.row().classes('w-full no-wrap items-center'):
            with ui.avatar().on('click', lambda: ui.navigate.to(chat)):
                ui.image(avatar)
            text = ui.input(placeholder='message').on('keydown.enter', send) \
                .props('rounded outlined input-class=mx-3').classes('flex-grow')
        #ui.markdown('simple chat app built with [NiceGUI](https://nicegui.io)') \
        #    .classes('text-xs self-end mr-8 m-[-1em] text-primary')

    await ui.context.client.connected()  # chat_messages(...) uses run_javascript which is only possible after connecting
    with ui.column().classes('w-full max-w-2xl mx-auto items-stretch'):
        chat_messages(user_id)

if __name__ in {'__main__', '__mp_main__'}:
    ui.run(native=True, fullscreen=False, title='ChatBot App', dark=True)