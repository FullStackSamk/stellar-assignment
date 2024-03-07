import app from "./app.js"; // Adjust the import path as necessary
import sequelize from "./database.js"; // Make sure the path matches

const PORT = process.env.PORT || 5038;

async function startServer() {
  try {
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}

startServer();
