import React from "react";
import '/src/index.css'; // Absolute path (works in Vite)



const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: "#222", color: "#fff", padding: "2rem" }}>
      <section className="footercontainer" style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="footer-content">
          <h3 style={{ color: "white", fontSize: "1.5rem" }}>Contact Us</h3>
          <p>
            Email: <i style={{ fontSize: "1rem", color: "rgb(53, 51, 51)" }}>aeroindahfc@aero.com</i>
          </p>
          <p>
            Phone: <i style={{ fontSize: "1rem", color: "rgb(53, 51, 51)" }}>+62812309876</i>
          </p>
          <p>
            Address:{" "}
            <i style={{ fontSize: "1rem", color: "rgb(53, 51, 51)" }}>
              Pondok Cabe Airport
              <br />
              Jl. Pondok Cabe Raya Tangerang Selatan 15418
            </i>
          </p>
        </div>
        <div className="footer-content">
          <h3 style={{ color: "white", fontSize: "1.5rem" }}>Quick Links</h3>
          <ul className="list" style={{ listStyle: "none", padding: 0 }}>
            <li>
              <a href="#index.html" style={{ textDecoration: "none", color: "white" }}>
                Home
              </a>
            </li>
            <li>
              <a href="#ourservices" style={{ textDecoration: "none", color: "white" }}>
                Our Services
              </a>
            </li>
            <li>
              <a href="#fleet" style={{ textDecoration: "none", color: "white" }}>
                Our Fleet
              </a>
            </li>
            <li>
              <a href="#ourmissions" style={{ textDecoration: "none", color: "white" }}>
                Our Mission
              </a>
            </li>
            <li>
              <a href="#team" style={{ textDecoration: "none", color: "white" }}>
                Our Team
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-content">
          <h3 style={{ color: "white", fontSize: "1.5rem" }}>Follow Us</h3>
          <ul
            className="social-icons"
            style={{ listStyle: "none", padding: 0, display: "flex", gap: "1rem" }}
          >
            <li>
              <a href="#">
                <i className="fa-brands fa-facebook" style={{ color: "rgb(3, 3, 3)" }}> </i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-brands fa-instagram" style={{ color: "rgb(3, 3, 3)" }}> </i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-brands fa-twitter" style={{ color: "rgb(3, 3, 3)" }}> </i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-brands fa-linkedin" style={{ color: "rgb(3, 3, 3)" }}> </i>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <div className="bottom-bar" style={{ textAlign: "center", marginTop: "2rem" }}>
        <p>©2025 ShopSmartApp. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;