from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = load_model('sentiment_analysis_model_cnn1.keras')

# Chargement du tokenizer
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    review = data['review']
    review = tokenizer.texts_to_sequences([review])
    review = pad_sequences(review, maxlen=200)
    prediction = model.predict(review)
    sentiment = 'positive' if prediction > 0.5 else 'negative'
    return jsonify(sentiment=sentiment)

if __name__ == '__main__':
    app.run(port=8080)
