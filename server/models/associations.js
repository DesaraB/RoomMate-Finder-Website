const User = require("./User");
const Listing = require("./Listing");
const Application = require("./Application");

// Associations

// A User (seeker) can have many applications
User.hasMany(Application, {
  foreignKey: "seeker_id",
  as: "applicationsAsSeeker",
});

// An Application belongs to a seeker (User)
Application.belongsTo(User, {
  foreignKey: "seeker_id",
  as: "seeker",
});

// An Application belongs to a Listing
Application.belongsTo(Listing, {
  foreignKey: "listing_id",
  as: "listing",
});

// A Listing can belong to a provider (User)
User.hasMany(Listing, {
  foreignKey: "provider_id",
  as: "listings",
});

Listing.belongsTo(User, {
  foreignKey: "provider_id",
  as: "provider",
});

module.exports = {
  User,
  Listing,
  Application,
};
