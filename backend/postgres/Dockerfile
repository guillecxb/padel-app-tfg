# Usa la imagen base oficial de PostgreSQL
FROM postgres:13

# Instala nano
RUN apt-get update && apt-get install -y nano

# Copia el archivo de configuración personalizado pg_hba.conf
COPY pg_hba.conf /etc/postgresql/pg_hba.conf

# CMD para iniciar PostgreSQL, no necesitas especificar el archivo de configuración principal
CMD ["postgres"]
