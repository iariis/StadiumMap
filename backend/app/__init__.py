from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()


def create_app(config=None):
    app = Flask(__name__)

    # Configuración
    app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://stadiummap:password@localhost/stadiummap_db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = "stadiummap-secret-key-2026"  # Cambiar en producción
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 86400  # 24 horas

    if config:
        app.config.update(config)

    # Extensiones
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    CORS(app, origins=["http://localhost:3000"])

    # Blueprints
    from app.routes.auth import auth_bp
    from app.routes.stadiums import stadiums_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(stadiums_bp)

    return app
