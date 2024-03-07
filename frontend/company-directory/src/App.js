import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CompanyList from "./components/CompanyList";
import CompanyForm from "./components/CompanyForm";
import CompanyPage from "./pages/CompanyPage";
import NavBar from "./components/NavBar";
import FoundersPage from "./pages/FounderPage";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/add-company" element={<CompanyForm />} />
        <Route path="/company/:id" element={<CompanyPage />} />
        <Route path="/founders" element={<FoundersPage />} />
      </Routes>
    </Router>
  );
};

export default App;
