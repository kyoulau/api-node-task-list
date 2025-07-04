
# 🚀 Task Manager API

Uma API RESTful para gerenciamento de tarefas pessoais com sistema completo de autenticação de usuários.

## ✨ Funcionalidades Principais

- **Autenticação segura** com JWT (JSON Web Tokens)
- **CRUD completo** de usuários e tarefas
- **Filtros inteligentes** para tarefas (completas/incompletas)
- **Documentação interativa** com Swagger UI
- **Validação de dados** robusta com Yup
- **Pronta para produção** com configurações de ambiente

## 💻 Stack Tecnológica

| Categoria         | Tecnologias                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| **Backend**       | ![Node.js](https://img.shields.io/badge/Node.js-18+-43853D?logo=node.js) ![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express) |
| **Banco de Dados**| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?logo=postgresql) ![Sequelize](https://img.shields.io/badge/Sequelize-6+-52B0E7?logo=sequelize) |
| **Autenticação**  | ![JWT](https://img.shields.io/badge/JWT-8.5+-000000?logo=jsonwebtokens) ![Bcrypt](https://img.shields.io/badge/Bcrypt-5.1+-394D77) |
| **Ferramentas**   | ![Swagger](https://img.shields.io/badge/Swagger-3.0+-85EA2D?logo=swagger) ![Nodemon](https://img.shields.io/badge/Nodemon-2.0+-76D04B) |

## 🛠️ Pré-requisitos

- Node.js 18+
- PostgreSQL 15+
- Yarn ou npm
- Git (opcional)

## 🔧 Instalação

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/task-manager-api.git
   cd task-manager-api

## Instalar dependências:
yarn install
 ou
npm install## Banco de dados:

    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all  # (opcional - dados iniciais)
## 🏃 Executando a API
Modo desenvolvimento (com hot reload):
    bash

    yarn dev
    # ou
    npm run dev
#### A API estará disponível em: http://localhost:3000
## 📚 Documentação

Acesse a documentação interativa em:
bash 
    http://localhost:3000/api-docs
## 🔍 Endpoints Principais

👤 Autenticação

Registrar novo usuário:
http

    POST /user
    Content-Type: application/json

    {
    "name": "Novo Usuário",
    "email": "usuario@exemplo.com",
    "password": "senhaSegura123"
    }

Login:
http

    POST /sessions
    Content-Type: application/json

    {
    "email": "usuario@exemplo.com",
    "password": "senhaSegura123"
    }
### 📝 Tarefas (requer autenticação)

Criar tarefa:
http

    POST /task
    Authorization: Bearer <seu_token_jwt>
    Content-Type: application/json

    {
    "title": "Estudar Node.js",
    "description": "Aprender sobre middlewares",
    "check": false
    }

Listar tarefas:
http

    GET /task
    Authorization: Bearer <seu_token_jwt>


## 🤝 Como Contribuir

    Faça um fork do projeto

    Crie sua feature branch (git checkout -b feature/nova-feature)

    Commit suas alterações (git commit -m 'Adiciona nova feature')

    Push para a branch (git push origin feature/nova-feature)

    Abra um Pull Request

