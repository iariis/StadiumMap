import os

from dotenv import load_dotenv
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()


def create_app(config=None):
    load_dotenv()
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
        "DATABASE_URL",
        "mysql+pymysql://root:@localhost/stadiummap_db",
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "stadiummap-secret-key-2026")
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 86400

    if config:
        app.config.update(config)

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    CORS(app, origins=["http://localhost:3000"])

    from app.routes.auth import auth_bp
    from app.routes.stadiums import stadiums_bp

    @app.route("/")
    def index():
        return {
            "message": "StadiumMap API funcionando",
            "stadiums": "/api/stadiums/",
        }

    app.register_blueprint(auth_bp)
    app.register_blueprint(stadiums_bp)

    return app
