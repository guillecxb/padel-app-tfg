# Este archivo se utiliza para definir una clase base para tus modelos SQLAlchemy. Esta clase base incluirá métodos comunes y configuraciones que deseas aplicar a todos tus modelos. 
# Esto es útil para evitar la repetición de código y facilitar cambios en el comportamiento común de los modelos.

from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# Puedes añadir métodos comunes aquí si es necesario
