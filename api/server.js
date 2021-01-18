// write the server here and export it

const Dog = require("./dog-model");
const express = require("express");
const { findAll, update } = require("./dog-model");

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
  //needs object, here it is
  const dog = req.body;

  // check to see if object has requirements
  if (!dog.name || !dog.weight) {
    res.status(400).json({ message: "must include name and weight" });
  } else {
    Dog.create(dog)
      .then((newlyCreatedDog) => {
        res.status(200).json(newlyCreatedDog);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
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

server.get(`/api/dogs`, async (req, res) => {
  try {
    const dogs = await Dog.findAll();
    res.status(200).json(dogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// thenified get did not work
// server.get("/api/dogs", (req, res) => {
//   const dogs = findAll()
//     .then(res.status(200).json(dogs))
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
// });

server.delete(`/api/dogs/:id`, async (req, res) => {
  //establishing the id for the dog that will be deleted
  const { id } = req.params;
  try {
    const dog = await Dog.delete(id);
    if (dog) {
      res.status(200).json(dog);
    } else {
      res.status(404).json({ message: "unknown id" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//the reason ewhy this wasn't workng for me was the order I had the homey in
server.put(`/api/dogs/:id`, async (req, res) => {
  const { id } = req.params;
  //here's the required object
  const changes = req.body;

  if (!changes.name || !changes.weight) {
    res.status(400).json({ message: "must include name and weight" });
  } else {
    try {
      const updatedDog = await Dog.update(id, changes);
      if (updatedDog) {
        res.status(200).json(updatedDog);
      } else {
        res.status(404).json({ message: "unknown ID" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
});

module.exports = server;
