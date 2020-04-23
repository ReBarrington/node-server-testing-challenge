const express = require("express");

const Barringtons = require("../barringtons/barringtons-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/barringtons", (req, res) => {
  Barringtons.getAll()
    .then(Barringtons => {
      res.status(200).json(Barringtons);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post("/Barringtons", (req, res) => {
  const barringtonInfo = req.body;

  Barringtons.insert(barringtonInfo)
    .then(ids => {
      res.status(201).json({ message: "Barrington created successfully" });
    })
    .catch(error => {
      res.status(500).json({ errorMessage: error.message });
    });
});

module.exports = server;
