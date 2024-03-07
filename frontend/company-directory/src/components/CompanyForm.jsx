import React, { useState } from 'react';

const CompanyForm = () => {
  const [company, setCompany] = useState({
    name: '',
    location: '',
    description: '',
    founded_date: '',
  });
  const [success, setSuccess] = useState(false); // State to track success message
  const [error, setError] = useState(''); // State to track error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false); // Reset the success message
    setError(''); // Reset the error message
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(company),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setCompany({ name: '', location: '', description: '', founded_date: '' }); // Reset the form
      setSuccess(true); // Show success message
    } catch (error) {
      setError(error.message); // Show error message
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        Company created successfully!
      </div>}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        Error creating company: {error}
      </div>}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Company Name:
        </label>
        <input
          id="name"
          name="name"
          value={company.name}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
          Location:
        </label>
        <input
          id="location"
          name="location"
          value={company.location}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={company.description}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="founded_date">
          Founded Date:
        </label>
        <input
          id="founded_date"
          type="date"
          name="founded_date"
          value={company.founded_date}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create Company
      </button>
    </form>
    </div>
  );
};

export default CompanyForm;
