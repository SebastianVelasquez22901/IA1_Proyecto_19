import tensorflow as tf
from flask import Flask, request, jsonify, render_template

# Cargar el modelo guardado
reloaded = tf.saved_model.load('/app/tr')

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    msg = data['message']
    inputs = [msg]
    result = reloaded.translate(tf.constant(inputs))
    translated_text = result[0].numpy().decode()
    return jsonify({'response': translated_text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)