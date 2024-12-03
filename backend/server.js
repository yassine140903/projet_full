const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

console.log(process.env.DATABASE_PASSWORD);
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
console.log(DB);
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successfull!");
  })
  .catch((err) => {
    console.log("Error:", err);
  });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
