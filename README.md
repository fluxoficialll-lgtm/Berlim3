# Visão Geral do Projeto

Este repositório contém uma aplicação web completa, dividida em duas partes principais:

- **/frontend**: A aplicação do cliente, construída com React e Vite.
- **/backend**: O servidor, construído com Node.js e Express.

## Como Começar

Para executar o projeto completo em seu ambiente de desenvolvimento, siga os passos abaixo.

### Pré-requisitos

- Node.js (versão 20 ou superior)
- npm

### Instalação

1.  **Instale as dependências do Backend:**

    ```bash
    cd backend
    npm install
    ```

2.  **Instale as dependências do Frontend:**

    ```bash
    cd ../frontend
    npm install
    ```

### Executando a Aplicação

Para iniciar tanto o backend quanto o frontend simultaneamente, navegue até o diretório do **backend** e execute o comando de desenvolvimento:

```bash
cd ../backend
npm run dev
```

Este comando utilizará o `concurrently` para iniciar o servidor do backend (`npm start`) e o servidor de desenvolvimento do frontend (`npm run dev --prefix frontend`) ao mesmo tempo.

## Documentação Adicional

Para informações mais detalhadas sobre cada parte da aplicação, consulte os arquivos README específicos:

- **[Frontend](./frontend/README.md)**
- **[Backend](./backend/README.md)**
