import Company from "../models/Company.js";
import Founder from "../models/founder.js";

export const addFounderToCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const founder = await Founder.create({
      ...req.body,
      company_id: companyId,
    });
    res.status(201).json(founder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getFoundersByCompanyId = async (req, res) => {
  const companyId = req.params.companyId;
  console.log("companyId", companyId);
  try {
    const founders = await Founder.findAll({
      where: { company_id: companyId },
    });

    res.json(founders);
    console.log("founders", founders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
