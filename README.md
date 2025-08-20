# Fullstack Dictionary

Uma aplicação fullstack para consulta e gerenciamento de dicionários de palavras, permitindo buscas, adição e edição de definições.

## Pre requisitors
 - NodeJS 20.18^
 - Docker

## Tecnologias usadas

- **Frontend:** React, TypeScript, Vite, Axios, Tailwind CSS
- **Backend:** NestJS, Prisma
- **Banco de Dados:** PostgreSQL
- **Testes:** Jest, React Testing Library, Supertest
- **Outros:** Docker, ESLint, Prettier

## Instruções

1. Clone o repositório:
    ```bash
    git clone https://github.com/MatheusAraruna/fullstack-dictionary.git
    ```
2. Instale as dependências do backend e frontend:
    ```bash
    cd fullstack-dictionary/backend
    npm install
    cd ../frontend
    npm install
    ```
3. Configure as variáveis de ambiente conforme o arquivo `.env.example` em cada projeto.
    ```
    ## ---- DB CONFIG ----
    DB_USER=user
    DB_PASSWORD=password
    # DB_HOST=postgres //utilizando docker
    DB_HOST=localhost //utilizando localmente
    DB_PORT=5432
    DB_NAME=mydb
    ```

Atenção: No backend quando for configurar as variaveis, caso você execute por meio do Docker certifique de de trocar o valor do `HOST` do banco de dados para `postgres`

### Setup do projeto localmente

1. Certifique-se de ter o Docker e o Docker Compose instalados.
2. Na raiz do projeto, execute:
    ```bash
    docker-compose up -d
    ```
3. Acesse as URLS:
    - API [http://localhost:3030](http://localhost:3000).
    - FRONT [http://localhost:3000](http://localhost:3000)
### Rodando manualmente

4. Inicie o backend:
    ```bash
    cd ../backend
    npm run start:dev
    ```
5. Inicie o frontend:
    ```bash
    cd ../frontend
    npm run dev
    ```
6. Acesse as URLS:
    - API [http://localhost:3030](http://localhost:3000).
    - FRONT [http://localhost:3000](http://localhost:3000)

>  This is a challenge by [Coodesh](https://coodesh.com/)