# 🧍 AOT Explorer
A full-stack project inspired by Attack on Titan, designed to explore characters, titans, episodes, and their relationships through interactive data visualizations.

---

## 🚀 Live Features

- 📊 Analytics dashboard (characters, episodes, status)
- 🧍 Characters listing with infinite scroll
- 🔎 Search for characters and episodes
- 🧱 Titans data exploration
- 📱 Responsive UI (mobile + hamburger menu)
- ⚡ Performance-focused frontend

---

## 🏗️ Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- PostgreSQL

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Recharts


### DevOps / Infra  
- Docker  
- Docker Compose  

### Deployment  
- Render (backend & database)  
- Vercel (frontend) 
---
## 📊 Dashboard Features

- Top Characters by appearances
- Episodes with most characters
- Character Status distribution (Alive / Deceased / Unknown)
- Survival Rate calculation
- Clean data visualization 

---

## 🧠 Data Engineering Concepts Applied

- Data aggregation (ORM annotations)
- API design for analytics endpoints
- Data normalization
- Relationship modeling 
- Derived metrics (e.g. survival rate)
- Separation of concerns (services layer)

---

## 📱 UI/UX Highlights

- Responsive layout
- Mobile hamburger menu
- Sidebar navigation
- Clean dark theme
- Glass-style components

---

## ⚙️ Setup

### 1. Clone the repo

```bash
git clone https://github.com/luizmacieldev/aot-explorer.git
cd aot-explorer
```

---

### 2. Backend setup

```bash
cd backend

pip install -r requirements.txt
python manage.py migrate
python manage.py import_data
python manage.py runserver
```

---

### 3. Frontend setup

```bash
cd frontend/aot

npm install
npm run dev
```

---

## 🌐 Environment

Make sure your backend runs on:

```bash
http://127.0.0.1:8000/
```

---

## 🔄 API Endpoints

```bash
/api/stats/top-characters/
/api/stats/status-distribution/
/api/stats/top-episodes/
/api/titans/
/api/characters/
/api/organizations/
/api/locations/
/api/episodes/

```

---

## 🎯 Project Goal

This project was built to demonstrate:

- Full-stack development skills
- API design and analytics
- UI/UX design with real-world patterns

---

## 🧑‍💻 Author

Luiz Maciel  
Data Engineer / Full Stack Developer

---

## ⭐ If you liked this project

Give it a star ⭐ on GitHub!

