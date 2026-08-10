# 📚 BookVault

**BookVault** is a simple web-based Library Management System developed as part of a system development exam.

It allows users to manage books, track their reading progress, and view simple library reports.

---

## 🛠️ Technical Requirements

* **Frontend:** ReactJS + Ant Design
* **Backend:** Node.js + ExpressJS
* **Database:** Microsoft SQL Server
* **API:** RESTful API
* **Version Control:** Git + GitHub

---

## ✨ Project Features

### 🔐 Login

* User registration
* User login
* Logout
* Protected application pages

### 📚 Book Management

BookVault supports complete **CRUD functionality**:

* **Create** – Add a new book
* **Read** – View and search books
* **Update** – Edit book information
* **Delete** – Remove books

### 📊 Reports

* View simple library and reading statistics

### 🔔 Notifications

* View system notifications

### ⚙️ Settings

* **Coming Soon**

---

# 🚀 How to Run the Application

## 1. Requirements

Install the following before running BookVault:

* Node.js
* npm
* Microsoft SQL Server
* Visual Studio Code
* Git

Check Node.js and npm:

```bash
node -v
npm -v
```

---

## 2. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd BookVault
```

---

## 3. Set Up the Database

BookVault uses **Microsoft SQL Server**.

Before running the application:

1. Start Microsoft SQL Server.
2. Create the BookVault database.
3. Make sure the required tables are created.
4. Open:

```text
server/config/db.js
```

5. Configure the database connection according to your SQL Server setup.

---

# 4. Run the Backend

Open a terminal:

```bash
cd server
npm install
node server.js
```

The backend should run on:

```text
http://localhost:5000
```

Keep this terminal running.

---

# 5. Run the Frontend

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

Open the URL in your browser.

---

# 🧪 How to Test the Application

## 1. Register

1. Open `http://localhost:5173`
2. Click **Register**.
3. Enter the required information.
4. Create an account.

## 2. Login

1. Return to the Login page.
2. Enter your registered credentials.
3. Click **Login**.
4. You should be redirected to the Dashboard.

## 3. Test CRUD

Go to **Library**.

### Create

Click **Add Book** and enter the required book information.

### Read

View the books displayed in the Library.

### Update

Select a book and click **Edit**, then save the changes.

### Delete

Select a book, click **Delete**, and confirm the deletion.

## 4. Test Reports

Go to **Reports** to view the generated library and reading statistics.

## 5. Test Logout

Open the user menu and click **Logout**.

You should be redirected to the Login page.

---

# 🔗 RESTful API

The backend provides RESTful API endpoints for book management.

| Method | Endpoint         | Function                 |
| ------ | ---------------- | ------------------------ |
| GET    | `/api/books`     | Retrieve all books       |
| GET    | `/api/books/:id` | Retrieve a specific book |
| POST   | `/api/books`     | Create a book            |
| PUT    | `/api/books/:id` | Update a book            |
| DELETE | `/api/books/:id` | Delete a book            |

Example:

```text
http://localhost:5000/api/books
```

---

# ⚠️ Challenges Encountered

During development, some challenges were encountered:

### 1. Frontend and Backend Integration

Connecting the ReactJS frontend to the ExpressJS RESTful API required proper API endpoints and request handling.

### 2. Database Connection

Configuring the connection between ExpressJS and Microsoft SQL Server required troubleshooting the server, database, and connection settings.

### 3. CRUD Implementation

Implementing Create, Read, Update, and Delete operations required ensuring that changes made in the frontend were correctly sent to the API and stored in the database.

### 4. Routing and Authentication

Managing navigation between the login page and protected system pages required proper React Router configuration.

### 5. Git Branch and Merge Management

Using Git branches for different features required resolving changes and keeping the final implementation synchronized with the `main` branch.

---

# 📌 Project Status

**BookVault is currently under development.**

### Completed

* ✅ Login
* ✅ Registration
* ✅ CRUD Book Management
* ✅ RESTful API
* ✅ SQL Server Database
* ✅ Reports
* ✅ Notifications
* ✅ Git/GitHub Version Control

### Coming Soon

* ⚙️ Settings

---

# 👥 Development

Developed as part of a technical system development exam.

**BookVault — Organize Your Library. Track Your Reading.**
