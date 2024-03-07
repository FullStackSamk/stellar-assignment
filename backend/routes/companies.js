// routes/companies.js
import express from "express";
import { body, validationResult } from "express-validator";
import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "../controllers/companiesController.js";

const router = express.Router();

// Updated POST route with validation
router.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("location").optional(),
    body("description").not().isEmpty().withMessage("Description is required"),
    // Add more validators as needed
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Delegate to the controller function if validation passed
    createCompany(req, res);
  }
);

// Other routes remain unchanged
router.get("/", getAllCompanies);
router.get("/:id", getCompanyById);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export default router;
