const express = require("express");

// import mock DataBase
const staticDB = require("../public/top250.json");

const filmRouter = express.Router();

filmRouter.get("/readall", (req, res) => {
  try {
    const result = staticDB.sort((a, b) => a.position - b.position);

    res.send(result);
  } catch (error) {
    console.log("Something went wrong", error);
  }
});

module.exports = filmRouter;
