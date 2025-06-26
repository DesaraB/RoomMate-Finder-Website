const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Application = require("./application");
const User = require("./user");

const Listing = sequelize.define(
  "Listing",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    provider_id: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    bedrooms: { type: DataTypes.INTEGER, allowNull: false },
    bathrooms: { type: DataTypes.DECIMAL(3, 1), allowNull: false },
    property_type: {
      type: DataTypes.ENUM("apartment", "house", "condo", "studio"),
      allowNull: false,
    },
    amenities: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const raw = this.getDataValue("amenities");
        return raw ? raw.split(",").map((a) => a.trim()) : [];
      },
      set(value) {
        if (Array.isArray(value)) {
          this.setDataValue("amenities", value.join(","));
        } else if (typeof value === "string") {
          this.setDataValue("amenities", value);
        } else {
          this.setDataValue("amenities", "");
        }
      },
    },

    available_from: { type: DataTypes.DATE, allowNull: false },
    lease_term: { type: DataTypes.STRING, allowNull: true },
    photo_url: { type: DataTypes.STRING, allowNull: true },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    gallery_photos: {
      type: DataTypes.TEXT, // Store as JSON string
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("gallery_photos");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("gallery_photos", JSON.stringify(value));
      },
    },
  },
  {
    tableName: "listings",
    timestamps: false,
  }
);

module.exports = Listing;
