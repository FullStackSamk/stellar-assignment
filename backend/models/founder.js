// models/Founder.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // Adjust the path as necessary
import Company from "./Company.js"; // Adjust the path as necessary

const Founder = sequelize.define(
  "founders",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Company,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

// Relationship
Company.hasMany(Founder, { foreignKey: "company_id" });
Founder.belongsTo(Company, { foreignKey: "company_id" });

export default Founder;
