import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import FounderList from '../components/FounderList';

const CompanyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState('');
  const [showFounders, setShowFounders] = useState(false);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCompany(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCompanyDetails();
  }, [id, apiUrl]);

  const deleteCompany = async () => {
    try {
      const response = await fetch(`/companies/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the company');
      }
      navigate('/companies');
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">{company.name}</h2>
        <p>{company.location}</p>
        <p>{company.description}</p>
        <p>Founded: {company.founded_date}</p>
        <p>Industry: {company.industry}</p>
        <p>Website: <a href={company.websiteUrl} className="hover:text-green-700">{company.name}</a></p>
        <button onClick={() => setShowFounders(!showFounders)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {showFounders ? 'Hide' : 'Show'} Founders
        </button>
        {showFounders && <FounderList companyId={parseInt(id, 10)} />}
        <div className="flex mt-4">
          <Link to={`/companies/edit/${id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Edit
          </Link>
          <button onClick={deleteCompany} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;