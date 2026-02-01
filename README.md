# Anonymous Chat Application

A real-time, anonymous chat application that allows users to create and join chat rooms instantly without any registration or login.

**Live Demo:** [https://anonymous-chat-sx7d.onrender.com](https://anonymous-chat-sx7d.onrender.com)

---

## Features

- **No Login Required:** Instantly create or join chat rooms without an account.
- **Server-Generated Room IDs:** Create new rooms with unique, server-generated IDs.
- **Join via Link or Code:** Share a direct link to your chat room or have others join using the room code.
- **Real-Time Messaging:** Instant message delivery powered by WebSockets.
- **Easy Sharing:**
  - Copy the invite link to your clipboard.
  - Generate a QR code for easy mobile access.
- **Responsive Design:** A clean and simple UI that works on both desktop and mobile devices.

---

## Tech Stack

### Backend

- **Runtime:** Node.js
- **Framework:** Express
- **Real-Time Communication:** Socket.IO
- **ID Generation:** Node.js Crypto Module

### Frontend

- **Framework:** React
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Bootstrap

### Deployment

- **Platform:** Render
  - **Backend:** Deployed as a Web Service.
  - **Frontend:** Deployed as a Static Site with rewrite rules for SPA routing.

---

## How to Run Locally

To set up and run this project on your local machine, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/)

### 1. Clone the Repository

```bash
git clone <repository_url>
cd anonymous-chat-app
```

### 2. Set Up the Backend

Open a terminal window:

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Start the server
npm start
```
The backend server will be running on `http://localhost:4000`.

### 3. Set Up the Frontend

Open a **separate** terminal window:

```bash
# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```
The frontend development server will open at `http://localhost:5173` (or another port if 5173 is in use). You can now access the application in your browser.
