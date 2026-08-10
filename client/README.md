# 📚 BookVault

BookVault is a web-based Library Management System for managing and organizing books.

## 🛠️ Technologies

* React.js
* Vite
* Node.js
* Express.js
* Microsoft SQL Server
* Ant Design

---

# 🚀 How to Run BookVault

## Requirements

Make sure you have installed:

* Node.js
* npm
* Microsoft SQL Server
* Visual Studio Code

## 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd BookVault
```

## 2. Start the Backend

Open a terminal:

```bash
cd server
npm install
node server.js
```

The backend will run on:

```text
http://localhost:5000
```

Keep this terminal running.

## 3. Start the Frontend

Open a **new terminal**:

```bash
cd client
npm install
npm run dev
```

Vite will provide a local URL, usually:

```text
http://localhost:5173
```

Open this URL in your browser.

---

# 📖 How to Use

1. Open `http://localhost:5173`
2. Register an account if you are a new user.
3. Log in using your account.
4. Use the sidebar to navigate through the system.

### 📚 Library

From the Library, you can:

* View books
* Search books
* Add books
* Edit books
* Delete books
* Track reading status and progress

### 📊 Reports

View your library and reading statistics.

### 🔔 Notifications

View available system notifications.

### ⚙️ Settings

**Coming Soon**

---

# 🗄️ Database

BookVault uses **Microsoft SQL Server**.

Before running the system, make sure:

* SQL Server is running.
* The BookVault database is created.
* The database connection in `server/config/db.js` is configured correctly.

---

# ⚠️ Troubleshooting

### Frontend won't open

```bash
cd client
npm install
npm run dev
```

Then open the URL shown by Vite.

### Backend won't start

```bash
cd server
npm install
node server.js
```

Make sure SQL Server is running and the database configuration is correct.

---

# 👥 Development Team

**BookVault Development Team**

> 📚 Organize your library. Track your reading.
