# 🎓 University Management System

A comprehensive platform that streamlines the internal operations of universities and colleges. From user role management to student attendance and financial tracking — everything is handled in one centralized system.

---

## 🚀 Overview

The **University Management System** allows any university or college to register and operate digitally. Each institution is managed by a **Superadmin**, who creates the base organization and oversees all core functionalities. The system supports multiple user roles like:

- Superadmin
- Admin
- Counsellor
- Exam Cell Staff
- Accountant
- Teachers
- Students

---

## 🧩 Core Features

### 👥 **User & Role Management**

- Colleges/Universities can **register** and **log in**
- Superadmin creates and manages roles inside a college
- Role-based permissions for all users

### 🎓 **Student Management**

- Student registration and data management
- Attendance tracking
- Project submission (group or solo)
- Internal classroom chat
- Result publication
- Tuition fee payments

### 🧑‍🏫 **Teacher Module**

- Upload & manage study materials for specific batches
- Create & manage classroom chats
- Mark attendance
- Evaluate and update results

### 💬 **Communication System**

- Internal real-time chat system
- Announcement channels
- Dropbox: Public discussion room for each college
- Community chat for each role (teacher, student, admin, etc.)
- Classroom chat exclusive to students of a specific batch

### 💰 **Finance Management**

- Tuition fee payments by students
- Salary payments for all roles
- Fee verification and record management

### 📊 **Dashboard & Analytics**

- Real-time stats and insights for superadmin, admin, and counsellor
- Overview of operations, payments, attendance, and more

---

## 🛠️ Tech Stack

| Layer          | Technology                     |
| -------------- | ------------------------------ |
| Frontend       | React, Tailwind CSS, ShadCN UI |
| Backend        | Node.js, Express.js            |
| Database       | PostgreSQL + Prisma ORM        |
| Authentication | JWT (`jose`)                   |
| Realtime       | Socket.IO                      |
| File Upload    | Cloudinary / AWS S3 (optional) |
| State Mgmt     | Recoil / React Query           |
| Deployment     | Vercel / Railway / Render      |

---

## 🔐 Demo User Credentials

Use the following test accounts to explore different user roles within the application:

| Role        | Email              | Password     |
| ----------- | ------------------ | ------------ |
| Super Admin | `sourav@gmail.com` | `Sourav@123` |
| Admin       | `rajesh@gmail.com` | `Rajesh@123` |
| Counselor   | `sneha@gmail.com`  | `Sneha@123`  |
| Exam Cell   | `rahul@gmail.com`  | `Rahul@123`  |
| Teacher     | `arjun@gmail.com`  | `Arjun@123`  |
| Student     | `debu@gmail.com`   | `Debu@123`   |

> ⚠️ **Note**: These accounts are for demo purposes only. Please do not use them for real data submission.

---

### 🔗 Live Links

- **Frontend:** [https://university-management-project-clien.vercel.app](https://university-management-project-clien.vercel.app)
- **Backend API:** [https://university-management-project-server.onrender.com](https://university-management-project-server.onrender.com)

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/university-management-system.git
cd university-management-system

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit the .env file with your database URL and secrets

# Run database migrations
npx prisma migrate dev --name init

# Start the development server
npm run dev
```
