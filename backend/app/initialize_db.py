from sqlalchemy.orm import Session
from db.database import SessionLocal, Base, engine
from models.user import User
from models.court import Court
from models.customer import Customer
from models.reservation import Reservation
from models.faq import Faq
from models.review import CourtReview
from datetime import datetime

def create_initial_data():
    db = SessionLocal()
    try:
        Base.metadata.create_all(bind=engine)  # Asegúrate de que todas las tablas estén creadas

        # Crear Customers (Clientes/Clubs)
        customers_data = [
            {"name": "Club Padel A", "location": "Valladolid", "contact_email": "clubpadelA@padel.com", "phone": "123456789"},
            {"name": "Club Padel B", "location": "Palencia", "contact_email": "clubpadelB@padel.com", "phone": "987654321"},
            {"name": "Club Padel C", "location": "Madrid", "contact_email": "clubpadelC@padel.com", "phone": "456789123"}
        ]

        customers = []
        for customer_data in customers_data:
            customer = db.query(Customer).filter(Customer.name == customer_data["name"]).first()
            if not customer:
                customer = Customer(**customer_data)
                db.add(customer)
                customers.append(customer)
                print(f"Customer {customer_data['name']} created")
            else:
                print(f"Customer {customer_data['name']} already exists")

        db.commit()

        users_data = [
            {"name": "superadmin", "email": "admin@padelclub.com", "password": "1234", "role": "operator"},
            {"name": "user1", "email": "g.sanzlopez16@gmail.com", "password": "userpass1", "role": "customer"},
            {"name": "user2", "email": "user2@example.com", "password": "userpass2", "role": "customer"},
        ]

        for user_data in users_data:
            user = db.query(User).filter(User.name == user_data["name"]).first()
            if not user:
                user = User(**user_data)  # Sin customer_id
                db.add(user)
                print(f"User {user_data['name']} created")
            else:
                print(f"User {user_data['name']} already exists")

        db.commit()

        # Crear Courts (Pistas) con nombres del 1 al 8 y un court_id único para cada club
        court_id = 1  # Inicializa court_id para ser único en cada pista
        courts_data = [
            # Club Padel A en Valladolid
            {"name": "1", "location": "North", "customer_id": customers[0].id, "latitude": 41.652251, "longitude": -4.724532},
            {"name": "2", "location": "South", "customer_id": customers[0].id, "latitude": 41.652251, "longitude": -4.724532},
            {"name": "3", "location": "East", "customer_id": customers[0].id, "latitude": 41.652251, "longitude": -4.724532},
            {"name": "4", "location": "West", "customer_id": customers[0].id, "latitude": 41.652251, "longitude": -4.724532},
            {"name": "5", "location": "Center", "customer_id": customers[0].id, "latitude": 41.652251, "longitude": -4.724532},
            {"name": "6", "location": "North-East", "customer_id": customers[0].id, "latitude": 41.652251, "longitude": -4.724532},
            {"name": "7", "location": "North-West", "customer_id": customers[0].id, "latitude": 41.652251, "longitude": -4.724532},
            {"name": "8", "location": "South-East", "customer_id": customers[0].id, "latitude": 41.652251, "longitude": -4.724532},

            # Club Padel B en Palencia
            {"name": "1", "location": "North", "customer_id": customers[1].id, "latitude": 42.009685, "longitude": -4.528801},
            {"name": "2", "location": "South", "customer_id": customers[1].id, "latitude": 42.009685, "longitude": -4.528801},
            {"name": "3", "location": "East", "customer_id": customers[1].id, "latitude": 42.009685, "longitude": -4.528801},
            {"name": "4", "location": "West", "customer_id": customers[1].id, "latitude": 42.009685, "longitude": -4.528801},
            {"name": "5", "location": "Center", "customer_id": customers[1].id, "latitude": 42.009685, "longitude": -4.528801},
            {"name": "6", "location": "North-East", "customer_id": customers[1].id, "latitude": 42.009685, "longitude": -4.528801},
            {"name": "7", "location": "North-West", "customer_id": customers[1].id, "latitude": 42.009685, "longitude": -4.528801},
            {"name": "8", "location": "South-East", "customer_id": customers[1].id, "latitude": 42.009685, "longitude": -4.528801},

            # Club Padel C en Madrid
            {"name": "1", "location": "North", "customer_id": customers[2].id, "latitude": 40.416775, "longitude": -3.703790},
            {"name": "2", "location": "South", "customer_id": customers[2].id, "latitude": 40.416775, "longitude": -3.703790},
            {"name": "3", "location": "East", "customer_id": customers[2].id, "latitude": 40.416775, "longitude": -3.703790},
            {"name": "4", "location": "West", "customer_id": customers[2].id, "latitude": 40.416775, "longitude": -3.703790},
            {"name": "5", "location": "Center", "customer_id": customers[2].id, "latitude": 40.416775, "longitude": -3.703790},
            {"name": "6", "location": "North-East", "customer_id": customers[2].id, "latitude": 40.416775, "longitude": -3.703790},
            {"name": "7", "location": "North-West", "customer_id": customers[2].id, "latitude": 40.416775, "longitude": -3.703790},
            {"name": "8", "location": "South-East", "customer_id": customers[2].id, "latitude": 40.416775, "longitude": -3.703790},
        ]

        for court_data in courts_data:
            court_data["court_id"] = court_id  # Asigna un court_id único
            court = db.query(Court).filter(Court.court_id == court_id).first()
            if not court:
                court = Court(**court_data)
                db.add(court)
                print(f"Court {court_data['name']} with ID {court_id} created")
                court_id += 1  # Incrementa el court_id para la próxima pista
            else:
                print(f"Court {court_data['name']} with ID {court_id} already exists")

        db.commit()

        # Crear preguntas frecuentes (FAQs)
        faqs_data = [
            {
                "question": "What are the opening hours of the paddle tennis club?",
                "answer": "The paddle tennis club is open Monday to Friday from 8:00 AM to 10:00 PM and on weekends from 9:00 AM to 8:00 PM."
            },
            {
                "question": "How can I book a paddle tennis court?",
                "answer": "You can book a paddle tennis court through our mobile app, on our website, or by calling the reception desk."
            },
        ]

        for faq_data in faqs_data:
            faq = db.query(Faq).filter(Faq.question == faq_data["question"]).first()
            if not faq:
                faq = Faq(**faq_data)
                db.add(faq)
                print(f"Faq '{faq_data['question']}' created")
            else:
                print(f"Faq '{faq_data['question']}' already exists")

        db.commit()

        reservations_data = [
            # Club Padel A (customer_id = customers[0].id)
            {"user_id": 2, "court_id": 1, "reservation_time": datetime(2024, 3, 25, 18, 0), "customer_id": customers[0].id},
            {"user_id": 3, "court_id": 1, "reservation_time": datetime(2024, 3, 26, 19, 0), "customer_id": customers[0].id},
            {"user_id": 2, "court_id": 5, "reservation_time": datetime(2024, 3, 27, 20, 0), "customer_id": customers[0].id},

            {"user_id": 2, "court_id": 2, "reservation_time": datetime(2024, 3, 20, 18, 0), "customer_id": customers[0].id},
            {"user_id": 3, "court_id": 2, "reservation_time": datetime(2024, 3, 21, 19, 0), "customer_id": customers[0].id},
            {"user_id": 2, "court_id": 3, "reservation_time": datetime(2024, 3, 22, 18, 0), "customer_id": customers[0].id},
            {"user_id": 3, "court_id": 3, "reservation_time": datetime(2024, 3, 23, 19, 0), "customer_id": customers[0].id},
            {"user_id": 2, "court_id": 4, "reservation_time": datetime(2024, 3, 24, 18, 0), "customer_id": customers[0].id},
            {"user_id": 3, "court_id": 4, "reservation_time": datetime(2024, 3, 25, 19, 0), "customer_id": customers[0].id},
            {"user_id": 2, "court_id": 6, "reservation_time": datetime(2024, 3, 26, 18, 0), "customer_id": customers[0].id},
            {"user_id": 3, "court_id": 6, "reservation_time": datetime(2024, 3, 27, 19, 0), "customer_id": customers[0].id},

            # Club Padel B (customer_id = customers[1].id)
            {"user_id": 2, "court_id": 9, "reservation_time": datetime(2024, 3, 22, 18, 0), "customer_id": customers[1].id},
            {"user_id": 3, "court_id": 9, "reservation_time": datetime(2024, 3, 23, 19, 0), "customer_id": customers[1].id},
            {"user_id": 2, "court_id": 10, "reservation_time": datetime(2024, 3, 24, 18, 0), "customer_id": customers[1].id},
            {"user_id": 3, "court_id": 10, "reservation_time": datetime(2024, 3, 25, 19, 0), "customer_id": customers[1].id},
            {"user_id": 2, "court_id": 11, "reservation_time": datetime(2024, 3, 26, 18, 0), "customer_id": customers[1].id},
            {"user_id": 3, "court_id": 11, "reservation_time": datetime(2024, 3, 27, 19, 0), "customer_id": customers[1].id},
            {"user_id": 2, "court_id": 12, "reservation_time": datetime(2024, 3, 28, 18, 0), "customer_id": customers[1].id},
            {"user_id": 3, "court_id": 12, "reservation_time": datetime(2024, 3, 29, 19, 0), "customer_id": customers[1].id},
            {"user_id": 2, "court_id": 13, "reservation_time": datetime(2024, 3, 30, 18, 0), "customer_id": customers[1].id},
            {"user_id": 3, "court_id": 13, "reservation_time": datetime(2024, 3, 31, 19, 0), "customer_id": customers[1].id},
            {"user_id": 2, "court_id": 14, "reservation_time": datetime(2024, 4, 1, 18, 0), "customer_id": customers[1].id},
            {"user_id": 3, "court_id": 14, "reservation_time": datetime(2024, 4, 2, 19, 0), "customer_id": customers[1].id},
        ]


        for res_data in reservations_data:
            existing_res = db.query(Reservation).filter_by(
                user_id=res_data["user_id"],
                court_id=res_data["court_id"],
                reservation_time=res_data["reservation_time"]
            ).first()

            if not existing_res:
                reservation = Reservation(**res_data)
                db.add(reservation)
                print(f"Reservation for user {res_data['user_id']} on court {res_data['court_id']} created")
        db.commit()


        reviews_data = [
            # Pista 1 - Club A
            {"court_id": 1, "user_id": 2, "reservation_id": 1, "rating": 5, "comment": "¡Pista genial, buen estado del suelo y red bien tensada!"},
            {"court_id": 1, "user_id": 3, "reservation_id": 2, "rating": 4, "comment": "Buena iluminación pero algo de viento ese día."},

            # Pista 5 - Club A
            {"court_id": 5, "user_id": 2, "reservation_id": 3, "rating": 3, "comment": "La pista estaba un poco mojada al inicio."},

            # Pista 2 - Club A
            {"court_id": 2, "user_id": 2, "reservation_id": 4, "rating": 5, "comment": "Muy limpia y en perfecto estado."},
            {"court_id": 2, "user_id": 3, "reservation_id": 5, "rating": 4, "comment": "Buena visibilidad en la pista."},

            # Pista 3 - Club A
            {"court_id": 3, "user_id": 2, "reservation_id": 6, "rating": 4, "comment": "Algo de humedad, pero jugable."},
            {"court_id": 3, "user_id": 3, "reservation_id": 7, "rating": 5, "comment": "Perfecta para partidos al atardecer."},

            # Pista 4 - Club A
            {"court_id": 4, "user_id": 2, "reservation_id": 8, "rating": 4, "comment": "Buen mantenimiento."},
            {"court_id": 4, "user_id": 3, "reservation_id": 9, "rating": 3, "comment": "Red algo floja."},

            # Pista 6 - Club A
            {"court_id": 6, "user_id": 2, "reservation_id": 10, "rating": 5, "comment": "Excelente superficie."},
            {"court_id": 6, "user_id": 3, "reservation_id": 11, "rating": 4, "comment": "Muy buen ambiente."},

            # Pista 9 - Club B
            {"court_id": 9, "user_id": 2, "reservation_id": 12, "rating": 4, "comment": "Perfecta para dobles."},
            {"court_id": 9, "user_id": 3, "reservation_id": 13, "rating": 5, "comment": "Genial para entrenar."},

            # Pista 10 - Club B
            {"court_id": 10, "user_id": 2, "reservation_id": 14, "rating": 4, "comment": "Bien ubicada."},
            {"court_id": 10, "user_id": 3, "reservation_id": 15, "rating": 4, "comment": "Acceso sencillo."},

            # Pista 11 - Club B
            {"court_id": 11, "user_id": 2, "reservation_id": 16, "rating": 5, "comment": "Pista nueva, se nota."},
            {"court_id": 11, "user_id": 3, "reservation_id": 17, "rating": 4, "comment": "Un poco de polvo en el fondo."},

            # Pista 12 - Club B
            {"court_id": 12, "user_id": 2, "reservation_id": 18, "rating": 4, "comment": "Jugamos muy a gusto."},
            {"court_id": 12, "user_id": 3, "reservation_id": 19, "rating": 5, "comment": "Buen rebote de la pelota."},

            # Pista 13 - Club B
            {"court_id": 13, "user_id": 2, "reservation_id": 20, "rating": 5, "comment": "Genial, volveremos."},
            {"court_id": 13, "user_id": 3, "reservation_id": 21, "rating": 4, "comment": "Algo ruidosa por obras cercanas."},

            # Pista 14 - Club B
            {"court_id": 14, "user_id": 2, "reservation_id": 22, "rating": 4, "comment": "Césped artificial muy cuidado."},
            {"court_id": 14, "user_id": 3, "reservation_id": 23, "rating": 5, "comment": "Una de las mejores pistas del club."},
        ]


        for review_data in reviews_data:
            existing_review = db.query(CourtReview).filter_by(
                court_id=review_data["court_id"],
                user_id=review_data["user_id"],
                reservation_id=review_data["reservation_id"]
            ).first()

            if not existing_review:
                review = CourtReview(**review_data)
                db.add(review)
                print(f"Review for court {review_data['court_id']} by user {review_data['user_id']} added")
            else:
                print(f"Review already exists for court {review_data['court_id']} and user {review_data['user_id']}")

        db.commit()

    finally:
        db.close()

if __name__ == "__main__":
    create_initial_data()
