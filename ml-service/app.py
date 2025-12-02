from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib, os

app = Flask(__name__)
CORS(app)

MODEL_PATH = 'model.joblib'
if not os.path.exists(MODEL_PATH):
    print('Warning: model.joblib not found. Run train.py to create it.')

model = joblib.load(MODEL_PATH) if os.path.exists(MODEL_PATH) else None

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error':'model not available'}), 500
    data = request.get_json()
    text = data.get('text', '')
    if not text:
        return jsonify({'error':'no text'}), 400
    pred = model.predict([text])[0]
    probs = model.predict_proba([text])[0]
    conf = float(max(probs))
    return jsonify({'label': pred, 'confidence': conf})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)
