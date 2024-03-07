import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/database.js"; // Adjust the path as necessary
import Company from "./models/Company.js"; // Adjust the path as necessary
import Founder from "./models/founder.js"; // Adjust the path as necessary
import companiesRoutes from "./routes/companies.js"; // Make sure the path matches your project structure
import foundersRoutes from "./routes/founders.js"; // Make sure the path matches your project structure

// Initialize dotenv to use environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5038;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Use the routes
app.use("/api/companies", companiesRoutes);
// Assuming you want to nest foundersRoutes under a specific company, adjust the path as necessary
app.use("/founders", foundersRoutes);

// Modified route to list all companies
app.get("/api/companies", async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/founders", async (req, res) => {
  try {
    // Fetch all companies along with their associated founders
    const companiesWithFounders = await Company.findAll({
      include: [
        {
          model: Founder,
          as: "founders", // Assuming you've defined the association with this alias
        },
      ],
    });

    // Extract only the founders from the fetched data
    const founders = companiesWithFounders.flatMap(
      (company) => company.founders
    );

    res.json(founders);
  } catch (error) {
    console.error("Error fetching founders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Synchronize database and start the server
async function syncDb() {
  try {
    // Synchronize all models
    await sequelize.sync({ alter: true }); // Safer option for production
    console.log("All models were synchronized successfully.");

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.error("Unable to synchronize the database:", error);
  }
}

syncDb();
