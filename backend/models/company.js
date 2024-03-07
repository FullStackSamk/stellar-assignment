// models/Company.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // Adjust the path as necessary

const Company = sequelize.define(
  "companies",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    founded_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    industry: {
      type: DataTypes.STRING,
    },
    websiteUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default Company;
