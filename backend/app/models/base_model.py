from app import db


class BaseModel:
    """
    Mixin base para modelos SQLAlchemy.
    Aporta timestamps comunes y obliga a cada modelo a implementar to_dict().
    """

    created_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now(), nullable=False)

    def to_dict(self):
        raise NotImplementedError("Cada modelo debe implementar su propia serializacion.")

    def __repr__(self):
        return f"<{self.__class__.__name__} id={getattr(self, 'id', None)}>"
