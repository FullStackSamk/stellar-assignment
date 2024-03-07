import express from "express";
import {
  addFounderToCompany,
  getFoundersByCompanyId,
} from "../controllers/foundersController.js";

const router = express.Router();

// Assuming :companyId is a placeholder for the actual company ID
router.post("/:companyId", addFounderToCompany);
router.get("/:companyId", getFoundersByCompanyId);

export default router;
