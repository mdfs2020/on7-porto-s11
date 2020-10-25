const express = require("express");
const router = express.Router();
const controller = require("../controller/seriesController");

router.get("/", controller.getAll);
router.get("/series", controller.getAll);
router.get("/:id", controller.getById);
router.get("/genero/:genero", controller.getByGenero);
router.post("/", controller.postSerie);
router.post("/:id/temporadas/:temporadaId/episodio", controller.postNovoEpisodio);
router.post("/:id/temporadas", controller.postNovaTemporada);
router.delete("/:id", controller.deleteSerie);
router.delete("/:id/temporadas/:temporadaId", controller.deleteTemporada);
router.delete("/:id/temporadas/:temporadaId/episodio/:episodioId", controller.deleteEpisodio);
router.put("/:id", controller.putSerie);
router.patch("/:id/gostei", controller.patchSerie);
router.patch("/:id/temporadas/:temporadaId/episodio/:episodioId/assistiu", controller.patchEpisodio);

module.exports = router;