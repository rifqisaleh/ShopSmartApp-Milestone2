import React from "react"; 
import '/src/index.css'; // Absolute path (works in Vite)



const Header: React.FC = () => {
    return(
        <header>
            <section className="navcontainer">
        <div id="navbar">
            <nav>
                <ul>
                    <li><a className="active" href="index.html">Home</a></li>
                    <li><a className="active" href="#ourservices">Our Services</a></li>
                    <li><a className="active" href="#paragraph2">Contact Us</a></li>
                </ul>
            </nav>
        </div>
    </section>
        </header>
    );
};

export default Header