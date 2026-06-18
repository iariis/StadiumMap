# ============================================================
# backend/app/models/base_model.py  —  Clase Base (Abstracción + POO)
# ============================================================

from abc import ABC, abstractmethod
from datetime import datetime

class BaseModel(ABC):
    """
    Clase base abstracta que aplica los principios de POO:
    - Abstracción: define la interfaz común para todos los modelos
    - Encapsulamiento: atributos privados con propiedades
    - Polimorfismo: to_dict() es implementado por cada subclase
    """

    def __init__(self):
        self._created_at = datetime.utcnow()
        self._updated_at = datetime.utcnow()

    @property
    def created_at(self):
        return self._created_at

    @property
    def updated_at(self):
        return self._updated_at

    @abstractmethod
    def to_dict(self):
        """Cada modelo debe implementar su propia serialización."""
        pass

    def __repr__(self):
        return f"<{self.__class__.__name__} id={getattr(self, 'id', None)}>"
