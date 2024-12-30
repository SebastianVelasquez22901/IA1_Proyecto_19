import tkinter as tk
from tkinter import ttk
from tkinter import filedialog
from tkinter import messagebox, END
from chat import enviarMenasje

class Principal(tk.Frame):

    def __init__(self, master=None):
        super().__init__(master, height=650, width=1020)
        self.master = master
        self.pack()
        self.create_widgets()

    def create_widgets(self):
        self.label = tk.Label(self, text="Historial de mensaje")
        self.label.place(x=20, y=5)
        # lista de mensajes
        self.listaMensajes = tk.Text(self, height=27, width=117)
        self.listaMensajes.place(x=20, y=30)
        # menu archivo
        self.label2 = tk.Label(self, text="Menú de archivo")
        self.label2.place(x=20, y=500)
        # parte de escribir 
        self.mensaje = tk.Text(self, height=5, width=117)
        self.mensaje.place(x=20, y=500)
        # boton enviar
        self.buttonNuevo = tk.Button(
            self, text="Enviar", command=self.actionMensaje)
        self.buttonNuevo.place(x=20, y=600)

    def actionMensaje(self):
        self.listaMensajes.insert(tk.END, self.mensaje.get("1.0", END))
        respuesta = enviarMenasje(self.mensaje.get("1.0",END))
        self.listaMensajes.insert(tk.END, respuesta + "\n")
        
root = tk.Tk()
root.title("Menu")
app = Principal(master=root)
app.mainloop()