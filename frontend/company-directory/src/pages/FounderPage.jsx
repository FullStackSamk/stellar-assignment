import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FoundersPage = () => {
  const { companyId } = useParams();
  const [founders, setFounders] = useState([]);
  const [error, setError] = useState('');
  const apiUrl = process.env.REACT_APP_API_FOUNDER_URL;
  const companyApiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchFounders = async () => {
      try {
        let url = apiUrl;
        if (companyId) {
          url += `/${companyId}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json();
        console.log('data', data);

        // Fetch company names for each founder
        for (let i = 0; i < data.length; i++) {
          const companyResponse = await fetch(`${companyApiUrl}/${data[i].company_id}`);
          const companyData = await companyResponse.json();
          console.log('companyData', companyData);
          data[i].company_name = companyData.name;
        }

        setFounders(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFounders();
  }, [apiUrl, companyId, companyApiUrl]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <h1>Founders</h1>
      {founders.map((founder) => (
        <div key={founder.id} className="rounded overflow-hidden shadow-lg p-4 bg-white">
          <h2 className="font-bold text-xl mb-2">{founder.full_name}</h2>
          <p>Title: {founder.title}</p>
          <p>Company: {founder.company_name}</p>
        </div>
      ))}
    </div>
  );
};

export default FoundersPage;