<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

<h1 align="center">🎓 ExamPro — Secure Online Examination System</h1>

<p align="center">
  <strong>A full-featured, anti-cheating online exam platform built with Next.js</strong><br/>
  Designed for educational institutions to conduct MCQ-based examinations securely.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-admin-panel">Admin Panel</a> •
  <a href="#-student-portal">Student Portal</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-api-reference">API</a> •
  <a href="#-license">License</a>
</p>

---

## ✨ Features

### 🔐 Admin Panel
- **Dashboard** — Real-time statistics: total students, active tests, attempts, cheating alerts
- **Student Management** — Add, edit, delete students individually or in bulk (JSON import)
- **Selective Bulk Delete** — Select multiple students with checkboxes and delete them at once
- **Test Management** — Create MCQ tests manually or upload via JSON
- **Results & Analytics** — View all exam attempts, scores, and cheating detection reports
- **Settings** — Update admin password securely
- **Upload Tests** — Import test papers from `.json` files with one click

### 🎓 Student Portal
- **Secure Login** — Students log in using their CNIC (ID) and Roll Number (password)
- **Dashboard** — View available tests and past results
- **Full-Screen Exam Mode** — Tests run in enforced full-screen to prevent cheating
- **Anti-Cheating Detection** — Tracks tab switches, window blur, and copy-paste attempts
- **Auto-Submit** — Exam auto-submits when time runs out
- **Instant Results** — View score immediately after submission

### 🛡️ Anti-Cheating System
| Feature | Description |
|---------|-------------|
| 🖥️ Full-Screen Lock | Exam runs in mandatory full-screen mode |
| 🔄 Tab Switch Detection | Alerts when student switches tabs |
| 📋 Copy-Paste Block | Right-click and keyboard shortcuts disabled |
| ⏱️ Auto-Submit on Timer | Exam auto-submits when time expires |
| 🚨 Cheating Alerts | Admin sees flagged attempts in results |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ installed ([Download](https://nodejs.org/))
- **Git** installed ([Download](https://git-scm.com/))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/krishbaresha/online-exam-system.git

# 2. Navigate to the project
cd online-exam-system

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

🎉 **Open [http://localhost:3000](http://localhost:3000) in your browser!**

> **Note:** On first run, the app automatically creates the `data/` directory with default admin credentials and seeds student data from `data.json`.

---

## 🔑 Default Login Credentials

### Admin Access
| Field | Value |
|-------|-------|
| **Role** | Admin |
| **ID** | `admin` |
| **Password** | `admin123` |

### Student Access
Students log in using their **CNIC** as ID and **Roll Number** as password.

Example:
| Field | Value |
|-------|-------|
| **Role** | Student |
| **ID** | `4250170961185` |
| **Password** | `BSMTH-2026-001` |

> 💡 The full student list is loaded from `data.json` on first boot. All 35+ students will be available immediately.

---

## 🖥️ Admin Panel

After logging in as admin, you get access to:

| Page | Path | Description |
|------|------|-------------|
| **Dashboard** | `/admin` | Overview stats, quick actions, recent activity |
| **Students** | `/admin/students` | Manage student accounts (add, edit, delete, bulk import) |
| **Tests** | `/admin/tests` | Create and manage MCQ examinations |
| **Results** | `/admin/results` | View all exam attempts and scores |
| **Upload Test** | `/admin/upload-test` | Import tests from JSON files |
| **Settings** | `/admin/settings` | Change admin password |

### 📥 Bulk Student Import Format

You can import students in bulk using JSON. Paste this format in the Bulk Upload modal:

```json
[
  {
    "name": "Muhammad Talha Rana",
    "roll_no": "BSMTH-2026-001",
    "cnic": "4250170961185"
  },
  {
    "name": "Abdul Hadi",
    "roll_no": "BSMTH-2026-005",
    "cnic": "4170107431849"
  }
]
```

### 📝 Test JSON Upload Format

Upload tests as `.json` files with this structure:

```json
{
  "title": "Mathematics Final Exam",
  "duration": 30,
  "questions": [
    {
      "question": "What is 2 + 2?",
      "options": ["3", "4", "5", "6"],
      "answer": 1
    },
    {
      "question": "What is the square root of 16?",
      "options": ["2", "3", "4", "5"],
      "answer": 2
    }
  ]
}
```

> **Note:** `answer` is the 0-based index of the correct option.

---

## 🎓 Student Portal

| Page | Path | Description |
|------|------|-------------|
| **Login** | `/login` | Student/Admin login page |
| **Dashboard** | `/dashboard` | View available tests |
| **Take Test** | `/test/[id]` | Full-screen exam interface |
| **Results** | `/result` | View exam score after submission |

---

## 📁 Project Structure

```
online-exam-system/
├── data/                    # Auto-generated data storage
│   ├── admin.json           # Admin credentials
│   ├── students.json        # Student accounts
│   ├── tests.json           # Created tests
│   └── results.json         # Exam results
├── data.json                # Seed data (student list for auto-import)
├── src/
│   ├── app/
│   │   ├── admin/           # Admin panel pages
│   │   │   ├── layout.js    # Admin sidebar layout
│   │   │   ├── page.js      # Dashboard
│   │   │   ├── students/    # Student management
│   │   │   ├── tests/       # Test management
│   │   │   ├── results/     # Results viewer
│   │   │   ├── upload-test/ # JSON test uploader
│   │   │   └── settings/    # Admin settings
│   │   ├── api/             # Backend API routes
│   │   │   ├── login/       # Authentication
│   │   │   ├── students/    # Student CRUD
│   │   │   ├── bulk-students/ # Bulk import
│   │   │   ├── tests/       # Test CRUD
│   │   │   ├── results/     # Results storage
│   │   │   ├── upload-test/ # Test file upload
│   │   │   └── admin/password/ # Password change
│   │   ├── dashboard/       # Student dashboard
│   │   ├── login/           # Login page
│   │   ├── test/[id]/       # Exam interface
│   │   ├── result/          # Result display
│   │   ├── globals.css      # Global styles
│   │   └── layout.js        # Root layout
│   └── lib/
│       └── storage.js       # JSON file-based storage engine
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/login` | Authenticate admin or student |
| `GET` | `/api/students` | Get all students |
| `POST` | `/api/students` | Add a new student |
| `PUT` | `/api/students` | Update student details |
| `DELETE` | `/api/students?id=xxx` | Delete a student |
| `DELETE` | `/api/students?ids=a,b,c` | Delete multiple selected students |
| `DELETE` | `/api/students?bulk=true` | Delete all students |
| `POST` | `/api/bulk-students` | Import students from JSON array |
| `GET` | `/api/tests` | Get all tests |
| `POST` | `/api/tests` | Create a new test |
| `DELETE` | `/api/tests?id=xxx` | Delete a test |
| `POST` | `/api/upload-test` | Upload a test from JSON |
| `GET` | `/api/results` | Get all exam results |
| `POST` | `/api/results` | Submit exam result |
| `POST` | `/api/admin/password` | Change admin password |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 15** | Full-stack React framework |
| **React 18** | UI component library |
| **Tailwind CSS 3** | Utility-first styling |
| **Lucide React** | Beautiful icon library |
| **JSON File Storage** | Lightweight data persistence (no database required) |

---

## ⚙️ Available Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — you are free to use, modify, and distribute it.

---

<p align="center">
  <strong>Built with ❤️ by <a href="https://github.com/krishbaresha">Krish Baresha</a></strong>
</p>
