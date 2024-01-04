const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const routes = new Router();

const userController = require('../controllers/user.controller');
const movieController = require('../controllers/movie.controller');
const evaluateController = require('../controllers/evaluate.controller')
const authController = require('../controllers/auth.controller');
const evaluateModel = require('../models/evaluate.model');
const actorController = require('../controllers/actor.contoller');
const commentController = require('../controllers/comment.controller');

routes.post("/auth", authController.login);

// Rotas de usuário
routes.post("/user", userController.store);
routes.get("/user", auth, userController.index);
routes.get("/user/:id", auth, userController.show);
routes.put("/user/:id", auth, userController.update);
routes.delete("/user/:id", auth, userController.destroy);

// Rotas do filme
routes.get("/movie", movieController.index);
routes.post("/movie", auth, movieController.store);
routes.get("/movie/:id", auth, movieController.show);
routes.put("/movie/:id", auth, movieController.update);
routes.delete("/movie/:id", auth, movieController.destroy)

// Rotas de avaliação
// Primeira rota para calcular a média das avaliações
routes.get("/evaluate/average/:movieid", auth, async function averageRating(req, res) {
    const movieid = req.params.movieid;
    const averageRating = await evaluateModel.averageRating(movieid);
    if (!averageRating) {
        return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ averageRating });
});

routes.get("/evaluate", evaluateController.index);
routes.post("/evaluate", auth, evaluateController.store);
routes.get("/evaluate/:userid/:movieid", auth, evaluateController.show);
routes.put("/evaluate/:userid/:movieid", auth, evaluateController.update);
routes.delete("/evaluate/:userid/:movieid", auth, evaluateController.destroy);

// Rotas de atores
routes.get("/actors", actorController.index);
routes.post("/actors", auth, actorController.store);
routes.get("/actors/:id", auth, actorController.show);
routes.put("/actors/:id", auth, actorController.update);
routes.delete("/actors/:id", auth, actorController.destroy);

// Rotas de comentários
// Primeira rota para pegar todos os autores por movieid
routes.get("/actors/movie/:movieId", auth, actorController.indexByMovie);

module.exports = routes;
