
# Grocery Price Comparison - README

## Project Overview

This is a **Grocery Price Comparison** web application that allows users to search for products and compare their prices across multiple stores. The frontend is built using React, while the backend is powered by Node.js and PostgreSQL for data storage. The application enables users to filter results by product type, brand, or store and visually compare price differences.

---

## Features
- Search for products by name, type, brand, or store.
- Compare prices of the same product across multiple stores.
- Clean and responsive user interface.

---

## Prerequisites

To run this project locally, ensure you have the following installed:

- **Node.js** (v14 or higher) and npm
- **PostgreSQL** (configured and running locally)
- A code editor like **VS Code** (optional)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo-url/grocery-price-comparison.git
cd grocery-price-comparison
```

---

### 2. Set Up the Backend

1. **Navigate to the `backend` folder**:

   ```bash
   cd backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Database**:
   - Create a PostgreSQL database (e.g., `grocery_price_comparison`).
   - Import or set up the schema and tables (`categories`, `products`, `prices`, `stores`).
   - Configure the database connection in `index.js`:
     ```javascript
     const pool = new Pool({
       user: "your-username",
       host: "localhost",
       database: "grocery_price_comparison",
       password: "your-password",
       port: 5432,
     });
     ```

4. **Start the backend server**:

   ```bash
   npm start
   ```

   The backend will run on `http://localhost:5001`.

---

### 3. Set Up the Frontend

1. **Navigate to the `frontend` folder**:

   ```bash
   cd ../frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the React development server**:

   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`.

---

### 4. Access the Application

Open your browser and navigate to:  
`http://localhost:3000`

You should now be able to use the app to search for products and compare prices!

---

## Project Structure

```plaintext
grocery-price-comparison/
├── backend/                # Backend Node.js server
│   ├── index.js            # Main server file
│   ├── package.json        # Backend dependencies
│   └── ...                 # Other backend files
├── frontend/               # React frontend
│   ├── src/
│   │   ├── App.js          # Main React app
│   │   ├── index.js        # React entry point
│   │   └── ...             # Other React components
│   ├── package.json        # Frontend dependencies
│   └── public/             # Static assets
└── README.md               # Project instructions
```

---

## Troubleshooting

- **Backend not connecting to the database**:
  - Verify your PostgreSQL database is running.
  - Check the database credentials in the `backend/index.js` file.

- **Frontend not displaying data**:
  - Ensure the backend is running at `http://localhost:5001`.
  - Confirm that the table and database schema match the queries in `backend/index.js`.

---

## Contribution Guidelines

1. Fork the repository and create a feature branch.
2. Commit your changes with clear commit messages.
3. Submit a pull request to the `main` branch.

---

Feel free to reach out if you encounter any issues!
