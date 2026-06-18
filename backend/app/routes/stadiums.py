from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.stadium import Stadium

stadiums_bp = Blueprint("stadiums", __name__, url_prefix="/api/stadiums")


def require_admin():
    """Verifica que el usuario tenga rol admin."""
    identity = get_jwt_identity()
    if identity.get("role") != "admin":
        return jsonify({"error": "Acceso denegado: se requiere rol Admin"}), 403
    return None


# GET /api/stadiums — Listar todos
@stadiums_bp.route("/", methods=["GET"])
@jwt_required()
def get_stadiums():
    country = request.args.get("country")
    search = request.args.get("search", "")

    query = Stadium.query
    if country:
        query = query.filter(Stadium._country == country)
    if search:
        query = query.filter(
            db.or_(
                Stadium._name.ilike(f"%{search}%"),
                Stadium._city.ilike(f"%{search}%"),
            )
        )

    stadiums = query.order_by(Stadium._name).all()
    return jsonify([s.to_dict() for s in stadiums]), 200


# GET /api/stadiums/:id — Obtener uno
@stadiums_bp.route("/<int:stadium_id>", methods=["GET"])
@jwt_required()
def get_stadium(stadium_id):
    stadium = Stadium.query.get_or_404(stadium_id, description="Estadio no encontrado")
    return jsonify(stadium.to_dict()), 200


# POST /api/stadiums — Crear (solo admin)
@stadiums_bp.route("/", methods=["POST"])
@jwt_required()
def create_stadium():
    err = require_admin()
    if err:
        return err

    data = request.get_json()
    if not data:
        return jsonify({"error": "Datos requeridos"}), 400

    required = ["name", "city", "country", "capacity", "year"]
    for field in required:
        if field not in data:
            return jsonify({"error": f"Campo requerido: {field}"}), 400

    try:
        stadium = Stadium(
            name=data["name"],
            city=data["city"],
            country=data["country"],
            capacity=int(data["capacity"]),
            year=int(data["year"]),
            matches=int(data.get("matches", 0)),
            surface=data.get("surface", "Césped natural"),
            description=data.get("description", ""),
        )
        db.session.add(stadium)
        db.session.commit()
        return jsonify(stadium.to_dict()), 201
    except ValueError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# PUT /api/stadiums/:id — Actualizar (solo admin)
@stadiums_bp.route("/<int:stadium_id>", methods=["PUT"])
@jwt_required()
def update_stadium(stadium_id):
    err = require_admin()
    if err:
        return err

    stadium = Stadium.query.get_or_404(stadium_id, description="Estadio no encontrado")
    data = request.get_json()
    if not data:
        return jsonify({"error": "Datos requeridos"}), 400

    try:
        # Convertir tipos numéricos
        if "capacity" in data:
            data["capacity"] = int(data["capacity"])
        if "year" in data:
            data["year"] = int(data["year"])
        if "matches" in data:
            data["matches"] = int(data["matches"])

        stadium.update_from_dict(data)
        db.session.commit()
        return jsonify(stadium.to_dict()), 200
    except ValueError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# DELETE /api/stadiums/:id — Eliminar (solo admin)
@stadiums_bp.route("/<int:stadium_id>", methods=["DELETE"])
@jwt_required()
def delete_stadium(stadium_id):
    err = require_admin()
    if err:
        return err

    stadium = Stadium.query.get_or_404(stadium_id, description="Estadio no encontrado")
    db.session.delete(stadium)
    db.session.commit()
    return jsonify({"message": f"Estadio '{stadium.name}' eliminado"}), 200
