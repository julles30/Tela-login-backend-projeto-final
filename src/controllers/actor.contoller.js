const ActorModel = require("../models/actor.model");

async function index(req, res) {
    res.json(await ActorModel.index());
}

async function store(req, res) {
    const actor = req.body;
    await ActorModel.save(actor);
    res.json({ message: "Actor created" });
}

async function show(req, res) {
    const id = req.params.id;
    const actor = await ActorModel.find(id);
    if (!actor) {
        return res.status(404).json({ message: "Actor not found" });
    }
    res.json(actor);
}

async function update(req, res) {
    const id = req.params.id;
    const newActor = req.body;
    const actors = await ActorModel.find(id);
    if (actors.length === 0) {
        return res.status(404).json({ message: "Actor not found" });
    }
    const actor = actors[0];
    await ActorModel.update(actor, newActor);
    res.json({ message: "Actor updated" });
}

async function destroy(req, res) {
    const id = req.params.id;
    const actor = await ActorModel.find(id)
    if (!actor) {
        return res.status(404).json({ message: "Actor not found" });
    }
    await ActorModel.remove(id);
    res.json({ message: "Actor deleted" });
}

async function indexByMovie(req, res) {
    const movieId = req.params.movieId;
    const actors = await ActorModel.findByMovie(movieId);
    if (!actors) {
        return res.status(404).json({ message: "Actors not found for this movie" });
    }
    res.json(actors);
}

module.exports = { index, store, show, update, destroy, indexByMovie };
