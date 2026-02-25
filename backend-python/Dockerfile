FROM python:3.11-slim

WORKDIR /app

# Copie des fichiers de dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copie du code source
COPY ./app ./app
#COPY .env .env

# Exposition du port (celui défini dans .env, 8000 par défaut)
EXPOSE 8000

# Lancement du serveur avec uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]