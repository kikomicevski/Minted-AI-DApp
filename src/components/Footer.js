import React from 'react';
import LinkedinIcon from '../icons/LinkedIn'; // Import your custom SVG icon component
import GitHubIcon from '../icons/GitHub';
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="text-dark py-4">
      <div className="container">
        <ul>
          <li>
            <a href='https://www.linkedin.com/in/hristijanmicevski'>
              <LinkedinIcon />
            </a>
          </li>
          <li>
            <a href='https://www.github.com/kikomicevski'>
              <GitHubIcon />
            </a>
          </li>
        </ul>
        <p>&copy; Lunched by<a href='https://www.linkedin.com/in/hristijanmicevski' style={{ margin: '10px' }}>Hristijan</a> {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
