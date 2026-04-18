# Reuse_mart — Sustainable E-Commerce & Circular Economy

Welcome to **Reuse_mart**! This platform is a next-generation marketplace aimed at building a circular economy. It features a robust multi-service environment handling standard e-commerce, circular item lifecycles (like upcycling and food rescue), and real-time tracking of carbon footprint savings.

## Overall Summary

The application is split across three main modular services:
1. **Frontend App**: The primary user-facing marketplace where users can browse, buy, sell, and swap items. Built with **Next.js**, **React**, **TypeScript**, and **Framer Motion** for state-of-the-art animations.
2. **Backend API**: A secure and clean Node.js backend using **Express**. It handles data management, transaction verification logs, and interfaces directly with our **Supabase** (PostgreSQL) database.
3. **New Arrivals App**: A standalone premium product showcase application running independently to feature top-tier "Hot Deals" and distinct "New Appearance" products like premium cycle and phone listings.

---

## File and Folder Structure

```text
d:\work\e-commerce\
│
├── frontend/             # Main Next.js Marketplace Application
│   ├── src/app/          # Next.js Pages and API Routes
│   ├── src/components/   # Reusable UI & Layout Components (Dark Mode, Glassmorphism)
│   ├── src/context/      # Multilingual & Currency Providers
│   └── package.json      # Dependencies for port 3000
│
├── backend/              # Node.js + Express API Server
│   ├── src/controllers/  # Business logic for items and users
│   ├── src/routes/       # API route definitions
│   ├── supabase/         # Supabase SQL Schemas and DB Seeds
│   └── package.json      # Dependencies for port 5000
│
└── new/                  # "New Arrivals / Premium Collection" Next.js Application
    ├── src/app/          # Showcase Pages (e.g., /phone, /cycle)
    └── package.json      # Dependencies for port 3001
```

---

## Environment Variables

Before running the application, make sure you configure your `.env` files appropriately in both the root/backend and frontend. 

**For Backend (`backend/.env`):**
```env
PORT=5000
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_KEY
```

**For Frontend (`frontend/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
NEXT_PUBLIC_ADMIN_EMAIL=admin@reusemart.com
NEXT_PUBLIC_ADMIN_PASSWORD=supersecretadmin
```

---

## Run Commands

To run the full suite locally, you need to start the development servers for all three applications in separate terminal windows. 

**1. Start the Backend API (Port 5000):**
```bash
cd backend
npm install
npm run dev
```

**2. Start the Frontend Application (Port 3000):**
```bash
cd frontend
npm install
npm run dev
```

**3. Start the "New Appearance / Arrivals" Application (Port 3001):**
```bash
cd new
npm install
npm run dev
```

---

## Admin Portal & Credentials

A secure administration console is available in the main frontend app to manage users, verify product listings, and view application metrics.

- **Admin URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Admin Email**: `admin@reusemart.com`
- **Admin Password**: `supersecretadmin`

*(Ensure the backend and frontend servers are both running in order to log in and sync live Supabase data in the portal).*
