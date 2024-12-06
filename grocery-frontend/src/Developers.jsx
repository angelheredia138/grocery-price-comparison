import { Link } from "react-router-dom";

const Developers = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px", position: "relative" }}>
      <h1 style={{ marginBottom: "20px", fontSize: "4rem", color: "#E53E3E" }}>
        Meet the Developers
      </h1>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          fontSize: "3rem",
          color: "#2D3748",
          marginBottom: "30px",
        }}
      >
        <li>Angel Heredia</li>
        <li>Cami Lee</li>
        <li>Ryan Carpenter</li>
        <li>Vincent Dang</li>
      </ul>
      <p
        style={{
          fontSize: "2rem",
          maxWidth: "800px",
          margin: "0 auto",
          lineHeight: "1.8",
          color: "#4A5568",
        }}
      >
        This is a grocery price comparison website developed to help users find
        the best prices for grocery items across various stores. The project was
        built using <strong>React</strong> and <strong>JavaScript</strong> for
        the frontend, <strong>Node.js</strong> for the backend, and{" "}
        <strong>PostgreSQL</strong> for the database. We used{" "}
        <strong>Figma</strong> for designing the user interface and a{" "}
        <strong>Python</strong> script for web scraping store data to populate
        the database.
      </p>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
        }}
      >
        <Link to="/">
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
          >
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Developers;
