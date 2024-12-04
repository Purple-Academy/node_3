const express = require("express");
const { v4: uuidv4 } = require("uuid");

// import mock DataBase
const staticDB = require("../public/top250.json");

const filmRouter = express.Router();

filmRouter.get("/readall", async (req, res) => {
  try {
    const result = await staticDB.sort((a, b) => a.position - b.position);

    res.send(result);
  } catch (error) {
    console.log("Something went wrong", error);
  }
});

// filmRouter.post("/create", async (req, res) => {
//   const sortedFilms = await staticDB.sort((a, b) => a.position - b.position);

//   try {
//     const id = uuidv4();

//     const { title, rating, year, budget, gross, poster, position } = req.body;

//     const checkPosition = sortedFilms.find(
//       (film) => film.position === position
//     );

//     if (checkPosition) {
//       console.log(checkPosition);
//     }
//   } catch (error) {
//     console.log("Something went wrong", error);
//   }
// });

module.exports = filmRouter;
