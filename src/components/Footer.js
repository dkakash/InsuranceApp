import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '30%' }}>
          <h3>About Us</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div style={{ width: '30%' }}>
          <h3>Links</h3>
          <ul>
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
            <li><a href="#">Link 3</a></li>
          </ul>
        </div>
        <div style={{ width: '30%' }}>
          <h3>Subscribe</h3>
          <p>Subscribe to our newsletter for updates.</p>
          <input type="email" placeholder="Enter your email" style={{ marginRight: '10px' }} />
          <button>Subscribe</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
