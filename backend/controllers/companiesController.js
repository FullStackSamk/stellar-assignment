import Company from "../models/Company.js";

export const createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (company) {
      res.json(company);
    } else {
      res.status(404).json({ error: "Company not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const [updated] = await Company.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedCompany = await Company.findByPk(req.params.id);
      res.status(200).json(updatedCompany);
    } else {
      res.status(404).json({ error: "Company not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const deleted = await Company.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send("Company deleted");
    } else {
      res.status(404).json({ error: "Company not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
