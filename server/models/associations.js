const User = require("./User");
const Listing = require("./Listing");
const Application = require("./Application");
const Interest = require("./Interest"); // ✅ Correct import

// Applications associations
User.hasMany(Application, {
  foreignKey: "seeker_id",
  as: "applicationsAsSeeker",
});

Application.belongsTo(User, {
  foreignKey: "seeker_id",
  as: "seeker",
});

Application.belongsTo(Listing, {
  foreignKey: "listing_id",
  as: "listing",
});

// Listings associations
User.hasMany(Listing, {
  foreignKey: "provider_id",
  as: "listings",
});

Listing.belongsTo(User, {
  foreignKey: "provider_id",
  as: "provider",
});

// Interests associations
Interest.belongsTo(Listing, {
  foreignKey: "listing_id",
  as: "listing",
});

Listing.hasMany(Interest, {
  foreignKey: "listing_id",
});

Interest.belongsTo(User, {
  foreignKey: "seeker_id",
  as: "seeker",
});

User.hasMany(Interest, {
  foreignKey: "seeker_id",
  as: "interests",
});

module.exports = {
  User,
  Listing,
  Application,
  Interest,
};
