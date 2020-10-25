const series = require("../model/series.json");
const fs = require("fs");
//Retornar todas as séries;
const getAll = (req, res) => {
    res.send(series);
};
//Retornar apenas uma série específica;
const getById = (req, res) => {
    const id = req.params.id;

    res.status(200).send(series.find((serie) => serie.id == id));
    console.log(series);
};
//Retornar séries por gênero;
const getByGenero = (req, res) => {
    const genero = req.params.genero;
    console.log(genero);
   
    res.status(200).send(series.filter(serie => serie.genero.includes(genero)));
};
//Cadastrar nova série;
const postSerie = (req, res) => {
    console.log(req.body);
    const { id, nome, genero, sinopse, like, temporadas, canalOriginal } = req.body;
    series.push({ id, nome, genero, sinopse, like, temporadas, canalOriginal });

    fs.writeFile("./src/model/series.json", JSON.stringify(series), 'utf8', function (err) {
        if (err) {
            return res.status(424).send({ message: err });
        }
        console.log("Série atualizada com sucesso!");

    });

    res.status(201).send(series);
};
//Cadastrar novo episódio na temporada, onde :id é o id da série e :seasonId é o id da temporada;
   const postNovoEpisodio = (req, res) => {
    const serieId = req.params.id;
    const temporadaId = req.params.temporadaId;
    const { id, descricao, assistiu } = req.body;
    const serieASerModificada = series.find((serie) => serie.id == serieId);
    const index = series.indexOf(serieASerModificada);
    //Na primeira linha pego a temporada de dentro da série;
    //Na segunda linha pego o index da temporada;
    //Na terceira linha adiciona o episódio;
    //Na quarta linha adiciono a temporada modificada na série, ou seja, a temporada com mais um episódio
    const temporadaASerModificada = serieASerModificada.temporadas.find((temporada) => temporada.id == temporadaId);
    const indexTemporada = serieASerModificada.temporadas.indexOf(temporadaASerModificada);
    temporadaASerModificada.episodios.push({id, descricao, assistiu});
    serieASerModificada.temporadas.splice(indexTemporada, 1, temporadaASerModificada);

    series.splice(index, 1, serieASerModificada);

    fs.writeFile("./src/model/series.json", JSON.stringify(series), 'utf8', function (err) {
        if (err) {
            return res.status(424).send({ message: err });
        }
        console.log("Série atualizada com sucesso!");
    });

    res.status(200).send(series);
};

//Cadastrar nova temporada na série, onde o :id é o id da série;
    const postNovaTemporada = (req, res) => {
    const serieId = req.params.id;
    const { id, episodios } = req.body;
    const serieASerModificada = series.find((serie) => serie.id == serieId);

    const index = series.indexOf(serieASerModificada);
    serieASerModificada.temporadas.push({ id, episodios });

    series.splice(index, 1, serieASerModificada);

    fs.writeFile("./src/model/series.json", JSON.stringify(series), 'utf8', function (err) {
        if (err) {
            return res.status(424).send({ message: err });
        }
        console.log("Série atualizada com sucesso!");
    });

    res.status(200).send(series);
};

//Deletar uma série específica;
const deleteSerie = (req, res) => {
    const id = req.params.id;
    const serieFiltrada = series.find((serie) => serie.id == id);
    const index = series.indexOf(serieFiltrada);

    series.splice(index, 1);

    res.status(200).send(series);

    fs.writeFile("./src/model/series.json", JSON.stringify(series), 'utf8', function (err) {
        if (err) {
            return res.status(424).send({ message: err });
        }
        console.log("Série atualizada com sucesso!");
    });
    res.status(200).send(series);
};
//Deletar uma temporada específica, onde :id é o id da série e :seasonId é o id da temporada;
const deleteTemporada = (req, res) => {
    const id = req.params.id;
    const temporadaId = req.params.temporadaId;
    const serieFiltrada = series.find((serie) => serie.id == id);
    const temporadaFiltrada = serieFiltrada.temporadas.find((temporada) => temporada.id == temporadaId);
    const index = series.indexOf(serieFiltrada);
    const indexTemporada = serieFiltrada.temporadas.indexOf(temporadaFiltrada);
    
    serieFiltrada.temporadas.splice(indexTemporada, 1);
    series.splice(index, 1, serieFiltrada);

    res.status(200).send(series);

fs.writeFile("./src/model/series.json", JSON.stringify(series), 'utf8', function (err) {
    if (err) {
        return res.status(424).send({ message: err });
    }
    console.log("Série atualizada com sucesso!");
});
res.status(200).send(series);
};

//Deletar um episódio específico na temporada, onde :id é o id da série, :seasonId é o id da temporada e :episodeId é o id do episódio;

const deleteEpisodio = (req, res) => {
    const id = req.params.id;
    const temporadaId = req.params.temporadaId;
    const serieFiltrada = series.find((serie) => serie.id == id);
    const temporadaFiltrada = serieFiltrada.temporadas.find((temporada) => temporada.id == temporadaId);
    const index = series.indexOf(serieFiltrada);
    const indexTemporada = serieFiltrada.temporadas.indexOf(temporadaFiltrada);
    const episodioId = req.params.episodioId;
    const episodioFiltrado = temporadaFiltrada.episodios.find((episodio) => episodio.id == episodioId);
    const indexEpisodio = temporadaFiltrada.episodios.indexOf(episodioFiltrado);

    temporadaFiltrada.episodios.splice(indexEpisodio, 1);
    serieFiltrada.temporadas.splice(indexTemporada, 1, temporadaFiltrada);
    series.splice(index, 1, serieFiltrada);

    res.status(200).send(series);

fs.writeFile("./src/model/series.json", JSON.stringify(series), 'utf8', function (err) {
    if (err) {
        return res.status(424).send({ message: err });
    }
    console.log("Série atualizada com sucesso!");
});
res.status(200).send(series);
};

//Atualizar uma série específica;
const putSerie = (req, res) => {
    const id = req.params.id;
    const serieASerModificada = series.find((serie) => serie.id == id);
    console.log(serieASerModificada);
    const serieAtualizada = req.body;
    const index = series.indexOf(serieASerModificada);
    serieASerModificada.nome = serieAtualizada.nome;

    series.splice(index, 1, serieASerModificada);
    console.log(serieAtualizada)

    fs.writeFile("./src/model/series.json", JSON.stringify(series), 'utf8', function (err) {
        if (err) {
            return res.status(424).send({ message: err });
        };
        console.log("Série atualizada com sucesso");
    });

    res.status(200).send(series);
};
//Atualizar se gostou da série ou não;
const patchSerie = (req, res) => {
    const id = req.params.id;
    const atualizacao = req.body;
    
    const serieASerModificada = series.find((serie) => serie.id == id);

    const index = series.indexOf(serieASerModificada);
    
    Object.keys(atualizacao).forEach((chave) => {
        serieASerModificada[chave] = atualizacao[chave]
    });

    series.splice(index, 1, serieASerModificada);

    fs.writeFile("./src/model/series.json", JSON.stringify(series), 'utf8', function (err) {
        if (err) {
            return res.status(424).send({ message: err });
        }
        console.log("Série atualizada com sucesso!");
    });

    res.status(200).send(series);
};

//Atualizar se o episódio foi assistido ou não, onde :id é o id da série, :seasonId é o id da temporada e :episodeId é o id do episódio;
const patchEpisodio = (req, res) => {
    const id = req.params.id;
    const temporadaId = req.params.temporadaId;
    const serieFiltrada = series.find((serie) => serie.id == id);
    const temporadaFiltrada = serieFiltrada.temporadas.find((temporada) => temporada.id == temporadaId);
    const index = series.indexOf(serieFiltrada);
    const indexTemporada = serieFiltrada.temporadas.indexOf(temporadaFiltrada);
    const episodioId = req.params.episodioId;
    const episodioFiltrado = temporadaFiltrada.episodios.find((episodio) => episodio.id == episodioId);
    const indexEpisodio = temporadaFiltrada.episodios.indexOf(episodioFiltrado);
    const atualizacao = req.body;
    
    const episodioASerModificado = temporadaFiltrada.episodios.find((episodio) => episodio.id == episodioId);
    
    Object.keys(atualizacao).forEach((chave) => {
        episodioASerModificado[chave] = atualizacao[chave]
    });

    temporadaFiltrada.episodios.splice(indexEpisodio, episodioASerModificado);
    serieFiltrada.temporadas.splice(indexTemporada, 1, temporadaFiltrada);
    series.splice(index, 1, serieFiltrada)

    fs.writeFile("./src/model/series.json", JSON.stringify(series), 'utf8', function (err) {
        if (err) {
            return res.status(424).send({ message: err });
        }
        console.log("Série atualizada com sucesso!");
    });

    res.status(200).send(series);
};

module.exports = {
    getAll,
    getById,
    getByGenero,
    postSerie,
    postNovoEpisodio,
    postNovaTemporada,
    deleteSerie,
    deleteTemporada,
    deleteEpisodio,
    putSerie,
    patchSerie,
    patchEpisodio,
};