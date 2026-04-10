# 🧠 Attack on Titan Analytics

A full-stack data analytics application based on **Attack on Titan**, built to explore characters, titans, episodes, and relationships through interactive dashboards.

---

## 🚀 Live Features

- 📊 Analytics dashboard (characters, episodes, status)
- 🧍 Characters listing with infinite scroll
- 🧱 Titans data exploration
- 📱 Responsive UI (mobile + hamburger menu)
- 🖼 Optimized images with Next.js
- ⚡ Performance-focused frontend

---

## 🏗️ Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- SQLite

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios
- Recharts (charts & analytics)
- Framer Motion (UI animations)

---

## 📊 Dashboard Features

- Top Characters by appearances
- Episodes with most characters
- Character Status distribution (Alive / Deceased / Unknown)
- Survival Rate calculation
- Clean data visualization (bar charts)

---

## 🧠 Data Engineering Concepts Applied

- Data aggregation (ORM annotations)
- API design for analytics endpoints
- Data normalization (status cleaning)
- Relationship modeling (ManyToMany)
- Derived metrics (e.g. survival rate)
- Separation of concerns (services layer)

---

## 📱 UI/UX Highlights

- Responsive layout
- Mobile hamburger menu
- Sidebar navigation
- Clean dark theme
- Glass-style components
- Performance optimized images (`next/image`)

---

## ⚙️ Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/aot-analytics.git
cd aot-analytics
```

---

### 2. Backend setup

```bash
cd backend

pip install -r requirements.txt
python manage.py migrate
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

## 📈 Future Improvements

- Filters (by season, group, titan)
- Deployment (Vercel + backend hosting)

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

