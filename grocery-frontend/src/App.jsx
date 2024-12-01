import { useState } from "react";
import axios from "axios";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState("all");

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:5001/search", {
        searchTerm,
        filter,
      });

      // Group results by product_name and brand
      const groupedResults = response.data.reduce((acc, item) => {
        const key = `${item.product_name}-${item.brand}`;
        if (!acc[key]) {
          acc[key] = {
            product_name: item.product_name,
            brand: item.brand,
            product_url: item.product_url,
            identifier: item.identifier,
            stores: [],
            prices: [],
          };
        }
        acc[key].stores.push(item.store);
        acc[key].prices.push(item.price);
        return acc;
      }, {});

      setResults(Object.values(groupedResults)); // Convert grouped object to array
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#111",
        color: "#fff",
        margin: 0,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Centered Title and Search */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#4CAF50" }}>Grocery Price Comparison</h1>

        {/* Search Bar */}
        <div style={{ margin: "20px 0" }}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              width: "60%",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              marginLeft: "10px",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#4CAF50",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>

        {/* Filters */}
        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              fontSize: "16px",
              border: "1px solid #ccc",
            }}
          >
            <option value="all">All</option>
            <option value="productType">By Product Type</option>
            <option value="store">By Store</option>
            <option value="brand">By Brand</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div
        style={{
          width: "80%",
          marginTop: "20px",
          backgroundColor: "#222",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        {results.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              margin: "20px 0",
              backgroundColor: "#222",
              color: "#fff",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#444" }}>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  Product Image
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  Product Name
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  Brand
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  Store & Prices
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => {
                const imageUrl = item.identifier
                  ? `https://www.trolley.co.uk/img/product/${item.identifier}`
                  : "https://via.placeholder.com/100";

                return (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>
                      <td style={{ textAlign: "center" }}>
                        <img
                          src={imageUrl}
                          alt={item.product_name || "Product"}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/150"; // Larger placeholder image
                          }}
                          style={{
                            width: "150px", // Increased width
                            height: "150px", // Increased height
                            objectFit: "cover",
                            borderRadius: "10px", // Optional rounded corners
                          }}
                        />
                      </td>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {item.product_url ? (
                        <a
                          href={item.product_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#4CAF50", textDecoration: "none" }}
                        >
                          {item.product_name}
                        </a>
                      ) : (
                        item.product_name
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>{item.brand}</td>
                    <td style={{ textAlign: "center" }}>
                      {item.stores.map((store, i) => (
                        <div key={i}>
                          {store}: ${item.prices[i].toFixed(2)}
                        </div>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", color: "#888" }}>
            No results found.
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
