const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

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

filmRouter.get("/read/:id", (req, res) => {
  try {
    const id = req.params.id;

    const result = staticDB.find((item) => item.id == id);

    if (!result) res.send("No film with provided ID");

    res.send(result);
  } catch (error) {
    console.log("Something went wrong", error);
  }
});

filmRouter.post("/create", (req, res) => {
  try {
    const id = uuidv4();

    const { name, rating, year, budget, poster, position } = req.body;

    const sortedFilms = staticDB.map((film) => ({
      ...film,
      position: film.position >= position ? film.position + 1 : film.position,
    }));

    const newFilm = {
      id,
      name,
      rating,
      year,
      budget,
      poster,
      position,
    };

    sortedFilms.push(newFilm);

    fs.writeFileSync(
      "/Users/datokhojava/Projects/node_3/public/top250.json",
      JSON.stringify(sortedFilms)
    );

    res.send("Created new Item");
  } catch (error) {
    console.log("Something went wrong", error);
  }
});

filmRouter.delete("/delete/:id", (req, res) => {
  try {
    // const id = req.params.id;

    // const result = staticDB.findIndex((item) => item.id == id);

    // // films.splice(filmIndex, 1);

    // // const filmIndex = staticDB.findIndex((film) => film.id === id);

    // // res.send(filmIndex);
  } catch (error) {
    console.log("Something went wrong", error);
  }
});

module.exports = filmRouter;
