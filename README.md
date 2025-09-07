# QuickNotes

**QuickNotes** is a full-stack note-taking application built with **React**, **Tailwind CSS**, and **Django**.  
It provides a clean, responsive interface for managing notes, while Django serves as the backend API.

---

## 📌 Overview
QuickNotes allows users to **create, edit, delete, and search notes** with a smooth user experience.  
It combines a modern React frontend with Tailwind CSS styling and a powerful Django backend for data persistence.

---

## ✨ Features
- Create, edit, and delete notes (CRUD).
- Real backend with Django REST Framework.
- Authentication support (JWT).
- Search and filter notes.
- Responsive UI powered by Tailwind CSS.
- Organized, scalable full-stack architecture.

---

## 🧰 Tech Stack
- **Frontend:** React, Tailwind CSS  
- **Backend:** Django (Django REST Framework)  
- **Database:** SQLite (development) / PostgreSQL (production)  
- **Other:** JWT Authentication, REST API, GitHub for version control  

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<username>/<repo>.git
cd <repo>

2️⃣ Backend (Django)
bash
Copy code
cd backend
python -m venv env
source env/bin/activate   # On Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
👉 The backend will be running at: http://127.0.0.1:8000

3️⃣ Frontend (React + Tailwind)
Copy code
cd frontend
npm install
npm start
👉 The frontend will be running at: http://localhost:3000
