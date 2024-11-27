# Usa una imagen base oficial de Python
FROM python:3.11.9-slim

# Instala dependencias necesarias para compilar psycopg2 y psql
RUN apt-get update && apt-get install -y libpq-dev gcc

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo de requisitos primero, para aprovechar la caché de capa de Docker
COPY requirements.txt .

# Instalar las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código de la aplicación al directorio de trabajo del contenedor
COPY ./app /app

# Copiar el script de espera
COPY ./wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Exponer el puerto que utiliza la aplicación
EXPOSE 8000

# Comando para ejecutar la aplicación usando uvicorn
CMD ["/wait-for-it.sh", "db:5432", "--", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--log-level", "debug"]
