const EvaluateModel = require("../models/evaluate.model");

async function index(req, res) {
    res.json(await EvaluateModel.index());
}

async function store(req, res) {
    const evaluation = req.body;
    await EvaluateModel.save(evaluation);
    res.json({ message: "Evaluation created" });
}

async function show(req, res) {
    const userid = req.params.userid;
    const movieid = req.params.movieid;
    const evaluation = await EvaluateModel.find(userid, movieid);
    if (!evaluation) {
        return res.status(404).json({ message: "Evaluation not found" });
    }
    res.json(evaluation);
}

async function update(req, res) {
    const userid = req.params.userid;
    const movieid = req.params.movieid;
    const newEvaluate = req.body;
    const evaluations = await EvaluateModel.find(userid, movieid);
    if (evaluations.length === 0) {
        return res.status(404).json({ message: "Evaluation not found" });
    }
    const evaluation = evaluations[0];
    await EvaluateModel.update(evaluation, newEvaluate);
    res.json({ message: "Evaluation updated" });
}

async function destroy(req, res) {
    const id = req.params.id;
    const evaluation = await EvaluateModel.find(id)
    if (!evaluation) {
        return res.status(404).json({ message: "Evaluation not found" });
    }
    await EvaluateModel.remove(id);
    res.json({ message: "Evaluation deleted" });
}

async function averageRating(req, res) {
    const movieid = req.params.movieid;
    const averageRating = await EvaluateModel.averageRating(movieid);
    if (!averageRating) {
        return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ averageRating });
}

module.exports = { index, store, show, update, destroy, averageRating };