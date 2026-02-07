#!/usr/bin/env bash
# exit on error
set -o errexit

# Navega para a pasta do frontend e instala as dependências
cd frontend
npm install

# Constrói a aplicação de frontend
npm run build