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
