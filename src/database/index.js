const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://aluno_20201214010032:708280@177.136.201.182:5439/temp?schema=aluno_20191214010032'
});

//apenas testando a conexão. Tirei a função apenas para ele fazer o pool de conexoes apenas uma vez, porque quando eu fazia de muitas, dava erro

console.log("Criou pool de conexões no PostgreSQL!");

module.exports = pool