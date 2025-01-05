import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Contact Us Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p>Email: <span className="text-gray-400">aeroindahfc@aero.com</span></p>
          <p>Phone: <span className="text-gray-400">+62812309876</span></p>
          <p>
            Address:
            <span className="text-gray-400">
              <br /> Pondok Cabe Airport
              <br /> Jl. Pondok Cabe Raya Tangerang Selatan 15418
            </span>
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#index.html" className="hover:underline text-gray-400">Home</a>
            </li>
            <li>
              <a href="#ourservices" className="hover:underline text-gray-400">Our Services</a>
            </li>
            <li>
              <a href="#fleet" className="hover:underline text-gray-400">Our Fleet</a>
            </li>
            <li>
              <a href="#ourmissions" className="hover:underline text-gray-400">Our Mission</a>
            </li>
            <li>
              <a href="#team" className="hover:underline text-gray-400">Our Team</a>
            </li>
          </ul>
        </div>

        {/* Social Icons Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-700">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </div>
        </div>
      </section>

      {/* Bottom Bar */}
      <div className="text-center mt-8">
        <p className="text-gray-500">©2025 ShopSmartApp. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
