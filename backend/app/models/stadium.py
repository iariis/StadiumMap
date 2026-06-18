from app import db
from app.models.base_model import BaseModel


class Stadium(db.Model, BaseModel):
    """
    Modelo Estadio — aplica Herencia de BaseModel.
    Módulo asignado: CRUD completo de Estadios.
    """

    __tablename__ = "stadiums"

    # Atributos (Encapsulamiento via SQLAlchemy)
    id = db.Column(db.Integer, primary_key=True)
    _name = db.Column("name", db.String(120), nullable=False)
    _city = db.Column("city", db.String(80), nullable=False)
    _country = db.Column("country", db.String(50), nullable=False)
    _capacity = db.Column("capacity", db.Integer, nullable=False)
    _year = db.Column("year", db.Integer, nullable=False)
    _matches = db.Column("matches", db.Integer, default=0)
    _surface = db.Column("surface", db.String(40), default="Césped natural")
    _description = db.Column("description", db.Text, default="")
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    def __init__(self, name, city, country, capacity, year, matches=0, surface="Césped natural", description=""):
        super().__init__()
        self.name = name
        self.city = city
        self.country = country
        self.capacity = capacity
        self.year = year
        self.matches = matches
        self.surface = surface
        self.description = description

    # --- Properties (Encapsulamiento) ---
    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if not value or not value.strip():
            raise ValueError("El nombre no puede estar vacío")
        self._name = value.strip()

    @property
    def city(self):
        return self._city

    @city.setter
    def city(self, value):
        if not value or not value.strip():
            raise ValueError("La ciudad no puede estar vacía")
        self._city = value.strip()

    @property
    def country(self):
        return self._country

    @country.setter
    def country(self, value):
        allowed = ["USA", "México", "Canadá"]
        if value not in allowed:
            raise ValueError(f"País debe ser uno de: {allowed}")
        self._country = value

    @property
    def capacity(self):
        return self._capacity

    @capacity.setter
    def capacity(self, value):
        if not isinstance(value, int) or value < 1000:
            raise ValueError("Capacidad debe ser un entero mayor a 1000")
        self._capacity = value

    @property
    def year(self):
        return self._year

    @year.setter
    def year(self, value):
        if not isinstance(value, int) or value < 1900:
            raise ValueError("Año inválido")
        self._year = value

    @property
    def matches(self):
        return self._matches

    @matches.setter
    def matches(self, value):
        self._matches = max(0, int(value))

    @property
    def surface(self):
        return self._surface

    @surface.setter
    def surface(self, value):
        self._surface = value

    @property
    def description(self):
        return self._description

    @description.setter
    def description(self, value):
        self._description = value or ""

    # --- Polimorfismo: implementa to_dict() de BaseModel ---
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "city": self.city,
            "country": self.country,
            "capacity": self.capacity,
            "year": self.year,
            "matches": self.matches,
            "surface": self.surface,
            "description": self.description,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

    def update_from_dict(self, data):
        """Actualiza campos desde un dict (usado en PUT)."""
        fields = ["name", "city", "country", "capacity", "year", "matches", "surface", "description"]
        for field in fields:
            if field in data:
                setattr(self, field, data[field])
