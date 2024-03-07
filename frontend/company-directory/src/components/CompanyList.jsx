import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(`${apiUrl}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCompanies(data);
        console.log('data', data)
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCompanies();
  }, [apiUrl]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company) => (
          <div key={company.id} className="max-w-sm rounded overflow-hidden shadow-lg p-4">
            <h2 className="font-bold text-xl mb-2">{company.name}</h2>
            <p className="text-gray-700 text-base">{company.location}</p>
            <p className="text-gray-600 text-sm">{company.description}</p>
            <Link 
              to={`/company/${company.id}`} 
              className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              More...
            </Link>
          </div>
        ))}
      </div>
      <div className="my-4">
        <Link
          to="/add-company"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Company
        </Link>
      </div>
    </div>
  );
};

export default CompanyList;
