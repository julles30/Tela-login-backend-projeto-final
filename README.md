# Descrição do Projeto
O backend deste projeto serve como uma API para gerenciamento de filmes, usuários e avaliações. Fornece endpoints para autenticação, cadastro de usuários, busca e avaliação de filmes.

## Tecnologias Utilizadas

### Node.js: Ambiente de execução JavaScript para o servidor.
### Express: Framework para construção de APIs RESTful.
### PostgreSQL: Banco de dados relacional para armazenamento dos dados.
### pg: Cliente PostgreSQL para Node.js.

## Como Executar o Projeto

1. Certifique-se de ter o Node.js instalado.
2. Clone o repositório do backend.
3. No diretório do projeto, execute o comando npm install para instalar as dependências.
4. Utilize `npm start` para iniciar o servidor backend.

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

```
CREATE TABLE Users (
    ID INT PRIMARY KEY,
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

```
CREATE TABLE Movies (
    ID INT PRIMARY KEY,
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

```
CREATE TABLE Evaluate (
    UserID INT NOT NULL,
    MovieID INT NOT NULL,
    Rating INT CHECK (Rating >= 1 AND Rating <= 5) NOT NULL,
    EvaluationDate DATE NOT NULL,
    PRIMARY KEY(UserID, MovieID),
    FOREIGN KEY(UserID) REFERENCES Users(ID),
    FOREIGN KEY(MovieID) REFERENCES Movies(ID)
);
```