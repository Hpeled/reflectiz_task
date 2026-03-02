# Reflectiz Task - Freemans Checkout

This project automates the registration and checkout process on the Freemans website using **Puppeteer**, **TypeScript**, and **SQLite**.

## 🚀 Features

- **Dynamic Data:** All form selectors and values are managed via an SQLite database.
- **Robust Automation:** Handles complex UI elements like radio button wrappers and dynamic field loading.
- **Clean Architecture:** Separated logic for database setup and automation execution.

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- npm

## 📦 Installation

1. Clone the repository or extract the ZIP file.
2. Install dependencies:
   ```bash
   npm install
   ```

## 🚦 How to Run

1. **Initialize the Database:**
   This will create the SQLite file and populate it with the necessary selectors and data.

   ```bash
   npx ts-node setup_db.ts
   ```

2. **Run the Automation:**
   The script will open the browser. Follow the console instructions to add a product to the cart, and the script will take over from the registration page.

   ```bash
   npx tsx index.ts
   ```

```

📊 SQL Queries
The file queries.sql contains the requested SQL demonstrations:

Fetching all selectors.

Searching for specific fields.

Updating records.

Deleting records.

📁 Project Structure
index.ts: Main automation logic.

setup_db.ts: Database initialization script.

queries.sql: SQL demonstration queries.

form_selectors.sqlite: The generated database file.
```
