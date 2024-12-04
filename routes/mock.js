const express = require("express");
const axios = require("axios");
const fs = require("fs");

const API_URL = "https://api.kinopoisk.dev/v1.4/";

const mockRouter = express.Router();

mockRouter.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `${API_URL}movie?page=1&limit=250&lists=top250`,
      {
        headers: {
          "X-API-KEY": process.env.API_KEY,
        },
      }
    );

    const staticDB = [];

    response.data.docs.map((item) => {
      staticDB.push({
        id: item.id,
        name: item.names[1],
        rating: item.rating.imdb,
        year: item.year,
        budget: item.type,
        // gross: ??
        poster: item.poster.url,
        position: item.top250,
      });
    });

    fs.writeFileSync(
      "/Users/datokhojava/Projects/node_3/public/database.json",
      JSON.stringify(staticDB)
    );

    res.send("created mock");
  } catch (error) {
    console.log("Something went wrong", error);
  }
});

module.exports = mockRouter;
