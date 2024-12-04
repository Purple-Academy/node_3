const express = require("express");
const app = express();

require("dotenv").config();

// controller import
const mockRouter = require("./routes/mock");
const filmRouter = require("./routes/films");

app.use(express.json());
app.use("/static", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/create-mock", mockRouter);
app.use("/api/films", filmRouter);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
