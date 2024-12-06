import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./app.css";
import searchButtonIcon from "./assets/search_button.png";
import bagPanelImage from "./assets/bag_panel.png";
import Developers from "./Developers";

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
    <Router>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div className="container">
              <div className="search-section">
                <h1>Grocery Price Comparison</h1>
                <h2>Compare prices of your favorite grocery items</h2>
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Search for Products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button onClick={handleSearch} className="search-icon">
                    <img src={searchButtonIcon} alt="Search" />
                  </button>
                </div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All</option>
                  <option value="productType">By Product Type</option>
                  <option value="store">By Store</option>
                  <option value="brand">By Brand</option>
                </select>
              </div>

              <div className="results-section">
                {results.length > 0 && (
                  <div className="table-background">
                    <img src={bagPanelImage} alt="Bag Panel Background" />
                  </div>
                )}
                {results.length > 0 ? (
                  <div className="results-blocks">
                    {results.map((item, index) => {
                      const imageUrl = item.identifier
                        ? `https://www.trolley.co.uk/img/product/${item.identifier}`
                        : "https://via.placeholder.com/100";

                      return (
                        <div className="result-entry" key={index}>
                          <div className="entry-labels">
                            <strong></strong>
                            <strong></strong>
                            <strong></strong>
                            <strong>Product Name</strong>
                            <strong>Brand</strong>
                            <strong>Stores & Prices</strong>
                          </div>
                          <div className="entry-content">
                            <img
                              src={imageUrl}
                              alt={item.product_name || "Product"}
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/150";
                              }}
                              className="product-image"
                            />
                            <div className="product-name">
                              {item.product_url ? (
                                <a
                                  href={item.product_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {item.product_name}
                                </a>
                              ) : (
                                item.product_name
                              )}
                            </div>
                            <div className="brand-name">{item.brand}</div>
                            <div className="store-prices">
                              {item.stores.map((store, i) => (
                                <div key={i}>
                                  {store}: ${item.prices[i].toFixed(2)}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p>No results found.</p>
                )}
              </div>

              {/* Button to navigate to Developers page */}
              <div className="bottom-left">
                <Link to="/developers">
                  <button
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#3182CE",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                    }}
                    className="developers-button"
                  >
                    Meet the Developers
                  </button>
                </Link>
              </div>
            </div>
          }
        />

        {/* Developers Page */}
        <Route path="/developers" element={<Developers />} />
      </Routes>
    </Router>
  );
};

export default App;
