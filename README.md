# Sentiment Review Classifier - Mini Project

## What is included
- backend/: Node.js + Express API
- ml-service/: Flask + scikit-learn model server
- frontend/: Vite + React UI

## Quick folder placement
Unzip the archive and you'll have a top-level folder `sentiment-mini/` with three subfolders:
- sentiment-mini/backend
- sentiment-mini/ml-service
- sentiment-mini/frontend

## Quick start (local)
1. Start MongoDB (or use Atlas) and set MONGO_URI in backend/.env
2. Backend: cd backend && npm install && node src/server.js
3. ML: cd ml-service && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt
   then python train.py (to create model.joblib) and python app.py
4. Frontend: cd frontend && npm install && npm run dev

## Notes
- The ML trainer expects ml-service/data/reviews.csv (a tiny sample is included). Replace with a larger dataset for better results.
- Update env variables as needed. See backend/.env.example
