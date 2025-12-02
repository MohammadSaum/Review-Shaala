# ml-service/train.py (replace existing file)
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import joblib
import os
import sys

data_path = os.path.join('data', 'reviews.csv')
if not os.path.exists(data_path):
    print('No data/reviews.csv found. Create a CSV with columns text,label to train.')
    sys.exit(0)

# Read CSV - pandas will handle quoted fields with commas
df = pd.read_csv(data_path)

# Basic cleaning
df = df[['text', 'label']].dropna()
df['text'] = df['text'].astype(str).str.strip()
df['label'] = df['label'].astype(str).str.strip()

# Remove empty rows
df = df[(df['text'] != '') & (df['label'] != '')]

print("Dataset class counts:\n", df['label'].value_counts())
print("Total rows:", len(df))

if len(df) < 20:
    print("Warning: dataset is small (less than 20 rows). Consider adding more labeled data for reliable results.")

# If possible, use stratified split to preserve class distribution
stratify_arg = df['label'] if df['label'].nunique() > 1 and len(df) >= 10 else None

X = df['text']
y = df['label']

try:
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=stratify_arg
    )
except Exception as e:
    print("Warning: stratified split failed or not possible:", e)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(max_features=10000, ngram_range=(1,2))),
    ('clf', LogisticRegression(max_iter=1000))
])

pipeline.fit(X_train, y_train)

print('train score', pipeline.score(X_train, y_train))
print('test score', pipeline.score(X_test, y_test))

joblib.dump(pipeline, 'model.joblib')
print('Saved model.joblib')
