import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Company Directory</h1>
      <Link to="/companies" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View Companies
      </Link>
    </div>
  );
};

export default HomePage;
