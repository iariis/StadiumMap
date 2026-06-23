from app import create_app, db
from app.models.stadium import Stadium


STADIUMS = [
    {
        "id": 1,
        "name": "MetLife Stadium",
        "city": "Nueva Jersey",
        "country": "USA",
        "capacity": 82500,
        "year": 2010,
        "matches": 4,
        "surface": "C\u00e9sped natural",
        "description": "Estadio de los New York Giants Sy Jets. Sede de la Gran Final del Mundial 2026.",
    },
    {
        "id": 2,
        "name": "AT&T Stadium",
        "city": "Dallas",
        "country": "USA",
        "capacity": 80000,
        "year": 2009,
        "matches": 4,
        "surface": "C\u00e9sped sint\u00e9tico",
        "description": "Hogar de los Dallas Cowboys, conocido como 'America's Stadium'.",
    },
    {
        "id": 3,
        "name": "Mercedes-Benz Stadium",
        "city": "Atlanta",
        "country": "USA",
        "capacity": 71000,
        "year": 2017,
        "matches": 4,
        "surface": "C\u00e9sped natural",
        "description": "Estadio multifuncional de Atlanta con techo retractil unico.",
    },
    {
        "id": 4,
        "name": "SoFi Stadium",
        "city": "Los \u00c1ngeles",
        "country": "USA",
        "capacity": 70000,
        "year": 2020,
        "matches": 5,
        "surface": "C\u00e9sped natural",
        "description": "El estadio mas caro jamas construido, sede de Rams y Chargers.",
    },
    {
        "id": 5,
        "name": "NRG Stadium",
        "city": "Houston",
        "country": "USA",
        "capacity": 72220,
        "year": 2002,
        "matches": 4,
        "surface": "C\u00e9sped natural",
        "description": "Primer estadio NFL con techo retractil en Norteamerica.",
    },
    {
        "id": 6,
        "name": "Arrowhead Stadium",
        "city": "Kansas City",
        "country": "USA",
        "capacity": 76416,
        "year": 1972,
        "matches": 3,
        "surface": "C\u00e9sped natural",
        "description": "Casa de los Kansas City Chiefs, reconocido por su ruidosa aficion.",
    },
    {
        "id": 7,
        "name": "Lincoln Financial Field",
        "city": "Filadelfia",
        "country": "USA",
        "capacity": 69176,
        "year": 2003,
        "matches": 4,
        "surface": "C\u00e9sped natural",
        "description": "Hogar de los Philadelphia Eagles en el corazon de la ciudad.",
    },
    {
        "id": 8,
        "name": "Lumen Field",
        "city": "Seattle",
        "country": "USA",
        "capacity": 68740,
        "year": 2002,
        "matches": 4,
        "surface": "C\u00e9sped sint\u00e9tico",
        "description": "Estadio de los Seahawks con una de las aficiones mas ruidosas del mundo.",
    },
    {
        "id": 9,
        "name": "Gillette Stadium",
        "city": "Boston",
        "country": "USA",
        "capacity": 65878,
        "year": 2002,
        "matches": 3,
        "surface": "C\u00e9sped natural",
        "description": "Sede de los New England Patriots, referente del futbol americano.",
    },
    {
        "id": 10,
        "name": "Hard Rock Stadium",
        "city": "Miami",
        "country": "USA",
        "capacity": 64767,
        "year": 1987,
        "matches": 4,
        "surface": "C\u00e9sped natural",
        "description": "Icono deportivo de Miami, renovado para el Mundial 2026.",
    },
    {
        "id": 11,
        "name": "Levi's Stadium",
        "city": "San Francisco",
        "country": "USA",
        "capacity": 68500,
        "year": 2014,
        "matches": 4,
        "surface": "C\u00e9sped natural",
        "description": "Estadio de los San Francisco 49ers en Silicon Valley.",
    },
    {
        "id": 12,
        "name": "Estadio Azteca",
        "city": "Ciudad de M\u00e9xico",
        "country": "M\u00e9xico",
        "capacity": 87523,
        "year": 1966,
        "matches": 4,
        "surface": "C\u00e9sped natural",
        "description": "El estadio m\u00e1s grande de M\u00e9xico y uno de los m\u00e1s ic\u00f3nicos del mundo.",
    },
    {
        "id": 13,
        "name": "Estadio BBVA",
        "city": "Monterrey",
        "country": "M\u00e9xico",
        "capacity": 53500,
        "year": 2015,
        "matches": 3,
        "surface": "C\u00e9sped natural",
        "description": "Moderno estadio del Club de F\u00fatbol Monterrey con dise\u00f1o de vanguardia.",
    },
    {
        "id": 14,
        "name": "Estadio Akron",
        "city": "Guadalajara",
        "country": "M\u00e9xico",
        "capacity": 49850,
        "year": 2010,
        "matches": 3,
        "surface": "C\u00e9sped natural",
        "description": "Casa de las Chivas Rayadas del Guadalajara, orgullo tapatio.",
    },
    {
        "id": 15,
        "name": "BC Place",
        "city": "Vancouver",
        "country": "Canad\u00e1",
        "capacity": 54500,
        "year": 1983,
        "matches": 4,
        "surface": "C\u00e9sped sint\u00e9tico",
        "description": "El estadio cubierto m\u00e1s grande de Canad\u00e1 en el coraz\u00f3n de Vancouver.",
    },
    {
        "id": 16,
        "name": "BMO Field",
        "city": "Toronto",
        "country": "Canad\u00e1",
        "capacity": 45736,
        "year": 2007,
        "matches": 4,
        "surface": "C\u00e9sped natural",
        "description": "Estadio principal del Toronto FC, orgullo del futbol canadiense.",
    },
]


def seed_stadiums():
    for data in STADIUMS:
        stadium_id = data["id"]
        payload = {key: value for key, value in data.items() if key != "id"}
        stadium = Stadium.query.get(stadium_id)

        if stadium:
            stadium.update_from_dict(payload)
        else:
            stadium = Stadium(**payload)
            stadium.id = stadium_id
            db.session.add(stadium)

    db.session.commit()


if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()
        seed_stadiums()
        print(f"{len(STADIUMS)} estadios cargados en la base de datos.")
