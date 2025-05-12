const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const user_router = require("./routes/auth");
const owner_router = require("./routes/owner_profiles");
const seeker_router = require("./routes/seeker");
const port = 3000;
const sequelize = require("./database/");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

app.use(bodyParser.json());
app.use("/api/auth", user_router);
app.use("/api/owner", owner_router);
app.use("/api/seeker", seeker_router);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
