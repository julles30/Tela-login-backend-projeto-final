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
    const id = req.params.id;
    const evaluation = await EvaluateModel.find(id);
    if (!evaluation) {
        return res.status(404).json({ message: "Evaluation not found" });
    }
    res.json(evaluation);
}

async function update(req, res) {
    const id = req.params.id;
    const evaluation = req.body;
    const evaluationArray = await EvaluateModel.find(id)
    if (!evaluationArray) {
        return res.status(404).json({ message: "Evaluation not found" });
    }
    await EvaluateModel.update(id, evaluation);
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

module.exports = { index, store, show, update, destroy };