
#### API de Séries
#### Contratos que deverão ser entregues

| Verbo        | Descrição                             |
| ------------ | ------------------------------------- |
| GET          | Retornar todas as séries              |
| GET          | Retornar apenas uma série específica  |
| GET          | Retornar séries por gênero            |
| POST         | Cadastrar nova série                  |
| POST         | Cadastrar novo episódio na temporada, onde :id é o id da série e :temporadaId é o id da temporada |
| POST         | Cadastrar nova temporada na série, onde o :id é o id da série |
| PUT          | Atualizar uma série específica        |
| DELETE       | Deletar uma série específica          |
| DELETE       | Deletar uma temporada específica, onde :id é o id da série e :temporadaId é o id da temporada |
| DELETE       | Deletar um episódio específico na temporada, onde :id é o id da série, :temporadaId é o id da temporada e :episodioId é o id do episódio |
| PATCH        | Atualizar se gostou da série ou não   |
| PATCH        | Atualizar se o episódio foi assistido ou não, onde :id é o id da série, :seasonId é o id da temporada e :episodeId é o id do episódio |


#### Arquitetura da IPI

pasta-do-projeto
├── src
│   ├── controller
│   ├── model
│   ├── routes
│   ├── views
│   └── index.js
├── server.js
├── package.json