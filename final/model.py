import unicodedata
import json
import numpy as np
import typing
from typing import Any, Tuple
import pandas as pd
import einops

import tensorflow as tf
import tensorflow_text as tf_text

def eliminar_acentos(cadena):
    # Normalizar la cadena
    cadena_normalizada = unicodedata.normalize('NFD', cadena)
    #acentos_eliminados = any(unicodedata.category(char) == 'Mn' for char in cadena_normalizada)
    acentos_eliminados = False
    caracteres_sin_acentos = []
    # Eliminar los caracteres de acento
    for char in cadena_normalizada:
        if unicodedata.category(char) == 'Mn':  # Si es un carácter de marca no espaciada (acento)
            acentos_eliminados = True
        else:
            caracteres_sin_acentos.append(char)
    
    cadena_sin_acentos = ''.join(caracteres_sin_acentos)
    #cadena_sin_acentos = ''.join(char for char in cadena_normalizada if unicodedata.category(char) != 'Mn')
    return cadena_sin_acentos, acentos_eliminados

class ShapeChecker():
    def __init__(self):
        self.shapes = {}

    def __call__(self, tensor, names, broadcast=False):
        if not tf.executing_eagerly():
            return
        parsed = einops.parse_shape(tensor, names)
        for name, new_dim in parsed.items():
            old_dim = self.shapes.get(name, None)
            if (broadcast and new_dim == 1):
                continue
            if old_dim is None:
                self.shapes[name] = new_dim
                continue
            if new_dim != old_dim:
                raise ValueError(
                    f"Shape mismatch for dimension: '{name}'\n"
                    f"    found: {new_dim}\n"
                    f"    expected: {old_dim}\n"
                )

print("Chatbot V4.0")

from pathlib import Path

path_to_json = Path('real.json')

def load_data_from_json(path, limit=None):
    """
    Carga datos de un archivo JSON y separa en contexto y target.
    """
    try:
        # Leer el contenido del JSON
        with open(path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        
       

        # Limitar los datos si se especifica un límite
        if limit is not None:
            data = data[:limit]

        # Extraer títulos y funciones como contexto y target
        context = []
        target = []
        for item in data:
            for title in item['titles']:
                texto_sin_acentos, isCambiado = eliminar_acentos(title)
                #print(texto_sin_acentos)
                context.append(title)
                if isCambiado:
                    context.append(texto_sin_acentos)
                    target.append(item['function_code'])
                target.append(item['function_code'])

        context = np.array(context)
        target = np.array(target)

        

        return context, target
    except Exception as e:
        print(f"Error al procesar el archivo JSON: {e}")
        return None, None
# Cargar datos
context_raw, target_raw = load_data_from_json(path_to_json, limit=None)

BUFFER_SIZE = len(context_raw)
BATCH_SIZE = 64

is_train = np.random.uniform(size=(len(target_raw),)) < 0.8

train_raw = (
    tf.data.Dataset
    .from_tensor_slices((context_raw[is_train], target_raw[is_train]))
    .shuffle(BUFFER_SIZE)
    .batch(BATCH_SIZE)
)
val_raw = (
    tf.data.Dataset
    .from_tensor_slices((context_raw[~is_train], target_raw[~is_train]))
    .shuffle(BUFFER_SIZE)
    .batch(BATCH_SIZE)
)

def tf_lower_and_split_punct(text):
    # Normalización con unicodedata (equivalente a 'NFKD' de tf_text.normalize_utf8)
    text = tf.strings.regex_replace(
        tf.strings.unicode_transcode(text, input_encoding="UTF-8", output_encoding="UTF-8"),
        "(\p{Mn})", ""
    )
    text = tf.strings.lower(text)
    # Mantener todos los caracteres
    text = tf.strings.regex_replace(text, '[^\\s\\S]', '')
    # Agregar espacios alrededor de la puntuación y caracteres especiales
    text = tf.strings.regex_replace(text, '([.?!,:;(){}\\[\\]\n*+=<>|&^%$#@!~`\'\"\\\\/-])', r' \1 ')
    # Quitar espacios innecesarios
    text = tf.strings.strip(text)
    # Añadir tokens especiales al inicio y al final
    text = tf.strings.join(['[START]', text, '[END]'], separator=' ')
    return text

max_vocab_size = 10000  # Ajusta según sea necesario

context_text_processor = tf.keras.layers.TextVectorization(
    standardize=tf_lower_and_split_punct,
    max_tokens=max_vocab_size,
    ragged=True
)
context_text_processor.adapt(train_raw.map(lambda context, target: context))

target_text_processor = tf.keras.layers.TextVectorization(
    standardize=tf_lower_and_split_punct,
    max_tokens=max_vocab_size,
    ragged=True
)
target_text_processor.adapt(train_raw.map(lambda context, target: target))

def process_text(context, target):
    context = context_text_processor(context).to_tensor()
    target = target_text_processor(target)
    targ_in = target[:, :-1].to_tensor()
    targ_out = target[:, 1:].to_tensor()
    return (context, targ_in), targ_out

train_ds = train_raw.map(process_text, tf.data.AUTOTUNE)
val_ds = val_raw.map(process_text, tf.data.AUTOTUNE)

UNITS = 128

class Encoder(tf.keras.layers.Layer):
    def __init__(self, text_processor, units):
        super().__init__()
        self.text_processor = text_processor
        self.vocab_size = text_processor.vocabulary_size()
        self.units = units
        self.embedding = tf.keras.layers.Embedding(
            self.vocab_size, units, mask_zero=True
        )
        self.rnn = tf.keras.layers.Bidirectional(
            merge_mode='sum',
            layer=tf.keras.layers.GRU(
                units,
                return_sequences=True,
                recurrent_initializer='glorot_uniform'
            )
        )

    def call(self, x):
        shape_checker = ShapeChecker()
        shape_checker(x, 'batch s')
        x = self.embedding(x)
        shape_checker(x, 'batch s units')
        x = self.rnn(x)
        shape_checker(x, 'batch s units')
        return x

    def convert_input(self, texts):
        texts = tf.convert_to_tensor(texts)
        if len(texts.shape) == 0:
            texts = tf.convert_to_tensor(texts)[tf.newaxis]
        context = self.text_processor(texts).to_tensor()
        context = self(context)
        return context

class CrossAttention(tf.keras.layers.Layer):
    def __init__(self, units, **kwargs):
        super().__init__()
        self.mha = tf.keras.layers.MultiHeadAttention(key_dim=units, num_heads=1, **kwargs)
        self.layernorm = tf.keras.layers.LayerNormalization()
        self.add = tf.keras.layers.Add()

    def call(self, x, context):
        shape_checker = ShapeChecker()
        shape_checker(x, 'batch t units')
        shape_checker(context, 'batch s units')

        attn_output, attn_scores = self.mha(
            query=x, value=context, return_attention_scores=True
        )
        shape_checker(x, 'batch t units')
        shape_checker(attn_scores, 'batch heads t s')

        attn_scores = tf.reduce_mean(attn_scores, axis=1)
        shape_checker(attn_scores, 'batch t s')
        self.last_attention_weights = attn_scores

        x = self.add([x, attn_output])
        x = self.layernorm(x)
        return x

class Decoder(tf.keras.layers.Layer):
    @classmethod
    def add_method(cls, fun):
        setattr(cls, fun.__name__, fun)
        return fun

    def __init__(self, text_processor, units):
        super().__init__()
        self.text_processor = text_processor
        self.vocab_size = text_processor.vocabulary_size()
        self.word_to_id = tf.keras.layers.StringLookup(
            vocabulary=text_processor.get_vocabulary(),
            mask_token='', oov_token='[UNK]'
        )
        self.id_to_word = tf.keras.layers.StringLookup(
            vocabulary=text_processor.get_vocabulary(),
            mask_token='', oov_token='[UNK]',
            invert=True
        )
        self.start_token = self.word_to_id('[START]')
        self.end_token = self.word_to_id('[END]')
        self.units = units
        self.embedding = tf.keras.layers.Embedding(
            self.vocab_size, units, mask_zero=True
        )
        self.rnn = tf.keras.layers.GRU(
            units,
            return_sequences=True,
            return_state=True,
            recurrent_initializer='glorot_uniform'
        )
        self.attention = CrossAttention(units)
        self.output_layer = tf.keras.layers.Dense(self.vocab_size)

@Decoder.add_method
def call(self, context, x, state=None, return_state=False):
    shape_checker = ShapeChecker()
    shape_checker(x, 'batch t')
    shape_checker(context, 'batch s units')

    x = self.embedding(x)
    shape_checker(x, 'batch t units')

    x, state = self.rnn(x, initial_state=state)
    shape_checker(x, 'batch t units')

    x = self.attention(x, context)
    self.last_attention_weights = self.attention.last_attention_weights
    shape_checker(x, 'batch t units')
    shape_checker(self.last_attention_weights, 'batch t s')

    logits = self.output_layer(x)
    shape_checker(logits, 'batch t target_vocab_size')

    if return_state:
        return logits, state
    else:
        return logits

@Decoder.add_method
def get_initial_state(self, context):
    batch_size = tf.shape(context)[0]
    start_tokens = tf.fill([batch_size, 1], self.start_token)
    done = tf.zeros([batch_size, 1], dtype=tf.bool)
    embedded = self.embedding(start_tokens)
    return start_tokens, done, self.rnn.get_initial_state(embedded)[0]

@Decoder.add_method
def tokens_to_text(self, tokens):
    words = self.id_to_word(tokens)
    result = tf.strings.reduce_join(words, axis=-1, separator=' ')
    result = tf.strings.regex_replace(result, '^ *\[START\] *', '')
    result = tf.strings.regex_replace(result, ' *\[END\] *$', '')
    return result

@Decoder.add_method
def get_next_token(self, context, next_token, done, state, temperature=0.0):
    logits, state = self(context, next_token, state=state, return_state=True)
    if temperature == 0.0:
        next_token = tf.argmax(logits, axis=-1)
    else:
        logits = logits[:, -1, :] / temperature
        next_token = tf.random.categorical(logits, num_samples=1)
    done = done | (next_token == self.end_token)
    next_token = tf.where(done, tf.constant(0, dtype=tf.int64), next_token)
    return next_token, done, state

class Translator(tf.keras.Model):
    @classmethod
    def add_method(cls, fun):
        setattr(cls, fun.__name__, fun)
        return fun

    def __init__(self, units, context_text_processor, target_text_processor):
        super().__init__()
        self.encoder = Encoder(context_text_processor, units)
        self.decoder = Decoder(target_text_processor, units)

    def call(self, inputs):
        context, x = inputs
        context = self.encoder(context)
        logits = self.decoder(context, x)
        try:
            del logits._keras_mask
        except AttributeError:
            pass
        return logits

@Translator.add_method
def translate(self, texts, max_length=50, temperature=0.0):
    context = self.encoder.convert_input(texts)
    batch_size = tf.shape(texts)[0]
    tokens = []
    attention_weights = []
    next_token, done, state = self.decoder.get_initial_state(context)
    for _ in range(max_length):
        next_token, done, state = self.decoder.get_next_token(
            context, next_token, done, state, temperature
        )
        tokens.append(next_token)
        attention_weights.append(self.decoder.last_attention_weights)
        if tf.executing_eagerly() and tf.reduce_all(done):
            break
    tokens = tf.concat(tokens, axis=-1)
    self.last_attention_weights = tf.concat(attention_weights, axis=1)
    return self.decoder.tokens_to_text(tokens)

model = Translator(UNITS, context_text_processor, target_text_processor)

def masked_loss(y_true, y_pred):
    loss_fn = tf.keras.losses.SparseCategoricalCrossentropy(
        from_logits=True, reduction='none'
    )
    loss = loss_fn(y_true, y_pred)
    mask = tf.cast(y_true != 0, loss.dtype)
    loss *= mask
    return tf.reduce_sum(loss)/tf.reduce_sum(mask)

def masked_acc(y_true, y_pred):
    y_pred = tf.argmax(y_pred, axis=-1)
    y_pred = tf.cast(y_pred, y_true.dtype)
    match = tf.cast(y_true == y_pred, tf.float32)
    mask = tf.cast(y_true != 0, tf.float32)
    return tf.reduce_sum(match)/tf.reduce_sum(mask)

model.compile(
    optimizer='adam',
    loss=masked_loss,
    metrics=[masked_acc, masked_loss]
)

model.fit(
    train_ds.repeat(),
    epochs=30,
    steps_per_epoch=100,
    validation_data=val_ds,
    validation_steps=20,
    callbacks=[tf.keras.callbacks.EarlyStopping(patience=30)]
)

class Export(tf.Module):
    def __init__(self, model):
        super().__init__()
        self.model = model

    @tf.function(input_signature=[tf.TensorSpec(dtype=tf.string, shape=[None])])
    def translate(self, inputs):
        return self.model.translate(inputs)

export = Export(model)
tf.saved_model.save(export, '/app/tr', signatures={'serving_default': export.translate})