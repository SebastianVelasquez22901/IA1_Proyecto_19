import tkinter as tk
from tkinter import ttk, messagebox
from datetime import datetime
from uuid import uuid4
import tensorflow as tf
import threading

# Variables globales
model_path = '/app/tr'
reloaded = None
messages = []

# Función para cargar el modelo
def cargar_modelo(messages_list):
    global reloaded
    try:
        messages_list.configure(state=tk.NORMAL)
        messages_list.insert(tk.END, "\u25b6 Cargando modelo... Por favor espere.\n", "bot")
        messages_list.configure(state=tk.DISABLED)
        messages_list.update()

        # Simular tiempo de carga del modelo
        reloaded = tf.saved_model.load(model_path)

        messages_list.configure(state=tk.NORMAL)
        messages_list.insert(tk.END, "\u25b6 Modelo cargado con éxito.\n", "bot")
        messages_list.configure(state=tk.DISABLED)
    except Exception as e:
        messagebox.showerror("Error", f"Error cargando el modelo: {e}")

# Inicializar usuario y bot
user_id = str(uuid4())
avatar = f'https://robohash.org/{user_id}?bgset=bg2'

bot_id = str(uuid4())
bot_avatar = f'https://robohash.org/{bot_id}?bgset=bg2'

# Ventana principal
def main_window():
    root = tk.Tk()
    root.title("ChatGPT Futurista")
    root.geometry("700x900")
    root.configure(bg="#0f0f1f")

    # Estilos personalizados
    style = ttk.Style()
    style.configure("TFrame", background="#0f0f1f")
    style.configure("TLabel", background="#0f0f1f", foreground="#00ffcc", font=("Consolas", 12))
    style.configure("TButton", background="#00ffcc", foreground="#0f0f1f", font=("Consolas", 12, "bold"))
    style.map("TButton", background=[("active", "#005f5f")])

    # Frame de mensajes
    messages_frame = ttk.Frame(root, style="TFrame")
    messages_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)

    messages_list = tk.Text(messages_frame, wrap=tk.WORD, state=tk.DISABLED, bg="#1a1a2e", fg="#00ffcc",
                            insertbackground="#00ffcc", font=("Consolas", 14), relief=tk.FLAT, borderwidth=0, padx=10, pady=10)
    messages_list.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)

    # Entrada de texto
    entry_frame = ttk.Frame(root, style="TFrame")
    entry_frame.pack(fill=tk.X, padx=10, pady=10)

    text_entry = ttk.Entry(entry_frame, font=("Consolas", 14), style="TEntry")
    text_entry.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=5, pady=5)

    send_button = ttk.Button(entry_frame, text="Enviar", command=lambda: send_message(messages_list, text_entry))
    send_button.pack(side=tk.RIGHT, padx=5, pady=5)

    # Personalización del widget de entrada
    style.configure("TEntry", fieldbackground="#1a1a2e", foreground="#00ffcc", relief="flat")

    # Cargar modelo en un hilo separado
    threading.Thread(target=cargar_modelo, args=(messages_list,)).start()

    root.mainloop()

# Función para enviar mensajes
def send_message(messages_list, text_entry):
    user_message = text_entry.get()
    if not user_message:
        messagebox.showwarning("Advertencia", "Por favor, ingrese un mensaje.")
        return

    # Agregar mensaje del usuario
    add_message(messages_list, "Usuario", user_message, "#00ffcc")

    # Respuesta del bot
    try:
        inputs = [user_message]
        result = reloaded.translate(tf.constant(inputs))
        bot_response = result[0].numpy().decode()
    except Exception as e:
        bot_response = f"Error: {e}"

    add_message(messages_list, "ChatGPT", bot_response, "#ffffff")
    text_entry.delete(0, tk.END)

# Función para agregar mensajes a la lista
def add_message(messages_list, sender, message, color):
    messages_list.configure(state=tk.NORMAL)
    timestamp = datetime.now().strftime('%H:%M:%S')
    messages_list.insert(tk.END, f"[{timestamp}] {sender}: {message}\n", (sender,))
    messages_list.tag_config(sender, foreground=color)
    messages_list.configure(state=tk.DISABLED)
    messages_list.see(tk.END)

if __name__ == "__main__":
    main_window()
