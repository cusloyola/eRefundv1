FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# System dependencies (fonts & rendering)
RUN apt-get update && apt-get install -y \
    build-essential \
    libfreetype6 \
    libjpeg62-turbo \
    zlib1g \
    fonts-dejavu \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY reportlab/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app source
COPY reportlab /app

EXPOSE 9000

CMD ["python", "app.py"]
