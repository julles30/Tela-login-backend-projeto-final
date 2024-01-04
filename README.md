# Descrição do Projeto
O backend deste projeto serve como uma API para gerenciamento de filmes, usuários e avaliações. Fornece endpoints para autenticação, cadastro de usuários, busca e avaliação de filmes.

## Tecnologias Utilizadas

### Node.js: Ambiente de execução JavaScript para o servidor.
### Express: Framework para construção de API.
### PostgreSQL: Banco de dados relacional para armazenamento dos dados.
### pg: Cliente PostgreSQL para Node.js.

## Como Executar o Projeto

1. Certifique-se de ter o Node.js instalado.
2. Clone o repositório do backend.
3. No diretório do projeto, execute o comando `npm i` para instalar as dependências.
4. Utilize `npm run dev` para iniciar o servidor backend.

## Funcionalidades Principais

Autenticação: Endpoint para login e geração de token de acesso.
Cadastro de Usuários: Endpoint para criação de novas contas de usuário.
CRUD de Filmes: Endpoints para criação, leitura, atualização e remoção de filmes.
Avaliação de Filmes: Endpoint para adicionar avaliações de filmes por usuários.

## Desenvolvimento

O backend foi construído utilizando Node.js com Express para roteamento e controle de endpoints. Foi implementado um banco de dados PostgreSQL para persistência dos dados, utilizando a biblioteca pg para interação com o banco. As requisições são validadas quanto à autenticação para acesso aos recursos protegidos.

## Banco de Dados

O banco de dados é composto por três tabelas: `Users`, `Movies` e `Evaluate`. 

### Tabela Users

A tabela `Users` armazena informações sobre os usuários. Ela tem as seguintes colunas:

 - `ID`: A chave primária da tabela.
 - `Name`: O nome do usuário.
 - `Username`: O nome de usuário que é único para cada usuário.
 - `Password`: A senha do usuário.

Você pode criar a tabela `Users` com o seguinte código SQL:

``` sql
CREATE TABLE Users (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(50) NOT NULL
);
```

### Tabela Movies
A tabela Movies armazena informações sobre os filmes. Ela tem as seguintes colunas:
 
 - ID: A chave primária da tabela.
 - Title: O título do filme.
 - Director: O diretor do filme.
 - ReleaseDate: A data de lançamento do filme.
 - Duration: A duração do filme em minutos.
 - Genre: O gênero do filme.
 - ProductionCompany: A empresa de produção do filme.
 - BoxOffice: A bilheteria do filme.
 - MediumRating: A avaliação média do filme.
 - Você pode criar a tabela Movies com o seguinte código SQL:

``` sql
CREATE TABLE Movies (
    ID SERIAL PRIMARY KEY,
    Title VARCHAR(100) NOT NULL,
    Director VARCHAR(100),
    ReleaseDate DATE,
    Duration INT CHECK (Duration > 0),
    Genre VARCHAR(50),
    ProductionCompany VARCHAR(100),
    BoxOffice DECIMAL(15, 2) CHECK (BoxOffice >= 0),
    MediumRating DECIMAL(3, 2) CHECK (MediumRating >= 0 AND MediumRating <= 5)
)
```

### Tabela Evaluate
A tabela Evaluate representa as avaliações que os usuários fazem dos filmes. Ela tem as seguintes colunas:

 - UserID: A chave estrangeira que referencia ID na tabela Users.
 - MovieID: A chave estrangeira que referencia ID na tabela Movies.
 - Rating: A classificação que o usuário deu ao filme.
 - EvaluationDate: A data em que a avaliação foi feita.

A chave primária da tabela Evaluate é uma combinação de UserID e MovieID, o que significa que cada combinação de usuário e filme é única.

Você pode criar a tabela Evaluate com o seguinte código SQL:

``` sql
CREATE TABLE evaluate (
	userid int4 NOT NULL,
	movieid int4 NOT NULL,
	rating int4 NOT NULL,
	evaluationdate date NOT NULL,
	CONSTRAINT evaluate_pkey PRIMARY KEY (userid, movieid),
	CONSTRAINT evaluate_rating_check CHECK (((rating >= 1) AND (rating <= 5))),
	CONSTRAINT evaluate_movieid_fkey FOREIGN KEY (movieid) REFERENCES movies(id),
	CONSTRAINT evaluate_userid_fkey FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);
```

### Tabela actors

você pode criar uma tabela Actors com os seguintes campos: ID, Name, Age e MovieID. O campo MovieID seria uma chave estrangeira que referencia o ID na tabela Movies.

``` sql
CREATE TABLE Actors (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Age INT CHECK (Age > 0),
    MovieID INT,
    CONSTRAINT actors_movieid_fkey FOREIGN KEY (MovieID) REFERENCES Movies(ID) ON UPDATE CASCADE
);
```

 - ID é a chave primária da tabela.
 - Name é o nome do ator, que não pode ser nulo.
 - Age é a idade do ator, que deve ser maior que 0.
 - MovieID é a chave estrangeira que referencia o ID na tabela Movies. Se o ID de um filme na tabela Movies for atualizado, o MovieID correspondente na tabela Actors também será atualizado automaticamente (graças à cláusula ON UPDATE CASCADE).

### Tabela Comments

 - ID: A chave primária da tabela.
 - UserID: A chave estrangeira que referencia ID na tabela Users.
 - MovieID: A chave estrangeira que referencia ID na tabela Movies.
 - Comment: O comentário que o usuário fez sobre o filme.
 - CommentDate: A data em que o comentário foi feito.
 - Aqui está o código SQL para criar a tabela Comments:

``` sql
CREATE TABLE Comments (
    id SERIAL PRIMARY KEY,
    UserID INT NOT NULL,
    MovieID INT NOT NULL,
    Comment TEXT NOT NULL,
    CommentDate DATE NOT NULL,
    CONSTRAINT comments_userid_fkey FOREIGN KEY (UserID) REFERENCES Users(ID) ON DELETE CASCADE,
    CONSTRAINT comments_movieid_fkey FOREIGN KEY (MovieID) REFERENCES Movies(ID) ON DELETE CASCADE
);
```

Neste esquema, cada combinação de usuário e filme pode ter vários comentários, pois um usuário pode comentar várias vezes sobre o mesmo filme. Isso garantiria que um usuário só pode fazer um comentário por filme por dia.