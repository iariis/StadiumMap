from app import bcrypt, db
from app.models.base_model import BaseModel


class User(db.Model, BaseModel):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    _name = db.Column("name", db.String(100), nullable=False)
    _email = db.Column("email", db.String(120), unique=True, nullable=False)
    _password_hash = db.Column("password_hash", db.String(255), nullable=False)
    _role = db.Column("role", db.String(20), default="user", nullable=False)

    ROLES = ["admin", "user"]

    def __init__(self, name, email, password, role="user"):
        self.name = name
        self.email = email
        self.password = password
        self.role = role

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if not value or not value.strip():
            raise ValueError("El nombre es requerido")
        self._name = value.strip()

    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, value):
        if not value or "@" not in value:
            raise ValueError("Email invalido")
        self._email = value.lower().strip()

    @property
    def role(self):
        return self._role

    @role.setter
    def role(self, value):
        if value not in self.ROLES:
            raise ValueError(f"Rol debe ser uno de: {self.ROLES}")
        self._role = value

    @property
    def password(self):
        raise AttributeError("La contrasenia no es accesible directamente")

    @password.setter
    def password(self, plain_text):
        if not plain_text or len(plain_text) < 6:
            raise ValueError("La contrasenia debe tener al menos 6 caracteres")
        self._password_hash = bcrypt.generate_password_hash(plain_text).decode("utf-8")

    def check_password(self, plain_text):
        return bcrypt.check_password_hash(self._password_hash, plain_text)

    def is_admin(self):
        return self.role == "admin"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
