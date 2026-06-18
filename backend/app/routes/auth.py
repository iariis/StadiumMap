from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, unset_jwt_cookies
from app import db
from app.models.user import User

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.route("/register", methods=["POST"])
def register():
    """POST /api/auth/register — Registro de usuario."""
    data = request.get_json()
    if not data:
        return jsonify({"error": "Datos requeridos"}), 400

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    password = data.get("password", "")

    if not name or not email or not password:
        return jsonify({"error": "Nombre, email y contraseña son requeridos"}), 400

    if User.query.filter_by(_email=email.lower()).first():
        return jsonify({"error": "El correo ya está registrado"}), 409

    try:
        user = User(name=name, email=email, password=password)
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "Usuario registrado exitosamente", "user": user.to_dict()}), 201
    except ValueError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


@auth_bp.route("/login", methods=["POST"])
def login():
    """POST /api/auth/login — Autenticación, retorna JWT."""
    data = request.get_json()
    if not data:
        return jsonify({"error": "Datos requeridos"}), 400

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    user = User.query.filter_by(_email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Credenciales incorrectas"}), 401

    token = create_access_token(identity={"id": user.id, "role": user.role})
    return jsonify({"token": token, "user": user.to_dict()}), 200


@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    """POST /api/auth/logout — Cierre de sesión."""
    response = jsonify({"message": "Sesión cerrada"})
    unset_jwt_cookies(response)
    return response, 200


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    """GET /api/auth/me — Usuario actual."""
    identity = get_jwt_identity()
    user = User.query.get(identity["id"])
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify(user.to_dict()), 200
