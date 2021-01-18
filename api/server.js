// write the server here and export it

const Dog = require("./dog-model");
const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "was able to get the server up and running by myself, with gitignore and nodemon running 💅 "
    );
});

// thenified Dog
server.post("/api/dogs", (req, res) => {
  const dog = req.body;

  Dog.create(dog)
    .then((newlyCreatedDog) => {
      res.status(200).json(newlyCreatedDog);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// try/catch Dog
// server.post("/api/dogs", async (req, res) => {
//   const dog = req.body;
//   try {
//     const newlyCreatedDog = await Dog.create(dog);
//     res.status(200).json(newlyCreatedDog);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

module.exports = server;
