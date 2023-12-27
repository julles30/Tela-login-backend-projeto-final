const MovieModel = require("../models/movie.model");

async function index(req, res) {
  res.json(await MovieModel.index());
}

async function store(req, res) {
  const movie = req.body;
  await MovieModel.save(movie);
  res.json({ message: "Movie created" });
}

async function show(req, res) {
  const id = req.params.id;
  const movie = await MovieModel.find(id);
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  res.json(movie);
}

async function update(req, res) {
  const id = req.params.id;
  const movie = req.body;
  const movieArray = await MovieModel.find(id)
  if (!movieArray) {
    return res.status(404).json({ message: "Movie not found" });
  }
  await MovieModel.update(id, movie);
  res.json({ message: "Movie updated" });
}

async function destroy(req, res) {
  const id = req.params.id;
  const movie = await MovieModel.find(id)
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  await MovieModel.remove(id);
  res.json({ message: "Movie deleted" })
}

module.exports = { index, store, show, update, destroy };