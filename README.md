### Catálogo de Filmes - Sistema de Autenticação JWT com Nest.js

Este projeto é uma implementação de um sistema de autenticação JWT e uma CRUD para um catálogo de filmes utilizando Nest.js. A aplicação provê uma API RESTful em JSON, utilizando Redis para cache e PostgreSQL como banco de dados.

#### Tecnologias Utilizadas

- TypeScript
- Nest.js
- TypeORM
- Swagger
- Docker
- Redis
- PostgreSQL

#### Experiência com as Tecnologias

- Nest.js: Sem experiência
- TypeORM: Sem experiência
- Redis: Sem experiência

#### Funcionalidades Implementadas

1. **Autenticação JWT**: Implementação de autenticação JWT com endpoints para registro, login e atualização de perfil de usuário.
2. **CRUD de Filmes**: CRUD completo para gerenciar filmes, com endpoints para criar, listar, atualizar e deletar filmes.
3. **Validação de Dados**: Validação dos dados recebidos nos endpoints para garantir integridade e consistência.
4. **Swagger**: Documentação automática da API utilizando Swagger para facilitar o entendimento e consumo da API.

#### Como Executar o Projeto

1. **Instalação das Dependências**:
   ```bash
   npm install
   ```

#### Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```dotenv
PORT=3000
JWT_SECRET=your_jwt_secret
REDIS_HOST=redis_host
REDIS_PORT=6379
POSTGRES_HOST=postgres_host
POSTGRES_PORT=5432
POSTGRES_USER=postgres_user
POSTGRES_PASSWORD=postgres_password
POSTGRES_DATABASE=postgres_database
```

#### Execução com Docker

Para iniciar os serviços do PostgreSQL, Redis e a aplicação Nest.js, execute o seguinte comando:

```docker
docker-compose up
```

#### Execução do servidor

Para iniciar o servidor basta ir na pasta do projeto e iniciar o comando:

```docker
npm start
```

#### Acesso à Documentação da API

Após iniciar o servidor, a documentação Swagger estará disponível em:

```docker
http://localhost:3000/api
```

### Screenshot

![image](https://github.com/Colledev/Movie-Catalog-API-backend/assets/112740912/51c55a09-db8d-49e4-982b-9681991491de)

