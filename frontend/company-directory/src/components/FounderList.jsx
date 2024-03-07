import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const FounderList = ({ companyId }) => {
  const [founders, setFounders] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAddFounderVisible, setIsAddFounderVisible] = useState(false);

  const founderUrl = `${process.env.REACT_APP_API_FOUNDER_URL}`;

  useEffect(() => {
    const fetchFounders = async () => {
      try {
        const response = await fetch(`${founderUrl}/${companyId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFounders(data);
      } catch (err) {
        setError(err.message);
      }
    };
  
    fetchFounders();
  }, [companyId, founderUrl]);

  const [newFounder, setNewFounder] = useState({
    full_name: '',
    title: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFounder({ ...newFounder, [name]: value });
  };

  const addFounder = async (founderData) => {
    try {
      const response = await fetch(`${founderUrl}/${companyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(founderData),
      });
      if (!response.ok) {
        throw new Error('Failed to add founder');
      }
      const updatedFounder = await response.json();
      setFounders([...founders, updatedFounder]);
      setSuccessMessage('Founder added successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddFounderSubmit = async (e) => {
    e.preventDefault();
    await addFounder(newFounder);
    setNewFounder({ full_name: '', title: '' });
    setIsAddFounderVisible(false); // Hide the form after submission
  };
  
  const handleAddFounderClick = () => {
    setIsAddFounderVisible(true);
  };

  return (
    <div className="container mx-auto px-4">
      <h3 className="text-xl font-bold mb-4">Founders</h3>
      {error && <p className="text-red-600">Error: {error}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      <ul className="space-y-3">
        {founders.map((founder) => (
          <li key={founder.id} className="bg-white shadow rounded-lg p-4">
            <p className="text-gray-800 font-medium">{founder.full_name}</p>
            <p className="text-gray-600">{founder.title}</p>
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddFounderClick}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Founder
      </button>
      {isAddFounderVisible && (
        <form onSubmit={handleAddFounderSubmit} className="mt-4">
          <div className="mb-2">
            <input
              type="text"
              name="full_name"
              value={newFounder.full_name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              name="title"
              value={newFounder.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

FounderList.propTypes = {
  companyId: PropTypes.number.isRequired,
};

export default FounderList;