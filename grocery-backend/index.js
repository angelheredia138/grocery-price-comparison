const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: "example", // Replace with your PostgreSQL username
  host: "localhost", // Assuming the database is running locally
  database: "examplegrocerypricecomparison", // Replace with your database name
  password: "password", // Replace with your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

// API endpoint for searching products
app.post("/search", async (req, res) => {
  const { searchTerm, filter } = req.body;

  let query = `
    SELECT 
      p.name AS product_name,
      c.category_name AS category,
      s.store_name AS store,
      pr.price AS price,
      p.brand AS brand,
      p.product_url AS product_url,
      RIGHT(p.product_url, POSITION('/' IN REVERSE(p.product_url)) - 1) AS identifier -- Extract the identifier
    FROM products p
    INNER JOIN categories c ON p.category_id = c.category_id
    INNER JOIN prices pr ON p.product_id = pr.product_id
    INNER JOIN stores s ON pr.store_id = s.store_id
    WHERE 
      (p.name ILIKE $1 OR 
       c.category_name ILIKE $1 OR
       s.store_name ILIKE $1 OR
       p.brand ILIKE $1);
  `;

  try {
    const values = [`%${searchTerm}%`];
    console.log("Executing query:", query);
    console.log("With values:", values);

    const result = await pool.query(query, values);
    console.log("Query Result:", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).send("Server error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
