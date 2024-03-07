import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-gray-300">Home</Link>
        </li>
        <li>
          <Link to="/companies" className="hover:text-gray-300">Company List</Link>
        </li>
        <li>
          <Link to="/founders" className="hover:text-gray-300">Founders</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
