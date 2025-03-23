from sqlalchemy.orm import Session
from db.database import SessionLocal, Base, engine
from models.user import User
from models.court import Court
from models.customer import Customer
from models.reservation import Reservation
from models.faq import Faq

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

    finally:
        db.close()

if __name__ == "__main__":
    create_initial_data()
