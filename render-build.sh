#!/usr/bin/env bash
# =========================================================================
# SCRIPT DE BUILD PRINCIPAL PARA A RENDER
# =========================================================================
#
# OBJETIVO:
# Este script executa tarefas de setup que são comuns a todos os serviços 
# (backend e frontend) antes que a Render comece a construir cada um deles
# individualmente.
#
# COMO FUNCIONA:
# A Render executa este script na raiz do projeto (o diretório principal) 
# UMA VEZ por deploy. Após a sua conclusão bem-sucedida, a Render então
# processará os `buildCommand` de cada serviço definido no `render.yaml`.

# --- Configuração de Segurança do Script ---
# A linha 'set -o errexit' garante que o script pare imediatamente se
# qualquer comando falhar. Isso previne deploys parciais ou com erros
# silenciosos, tornando o processo mais robusto e previsível.
set -o errexit

# --- Instalação de Dependências Compartilhadas ---
# No nosso monorepo, temos um diretório 'shared' que pode conter código
# ou dependências usadas tanto pelo 'backend' quanto pelo 'frontend'.
# O comando abaixo instala essas dependências de forma centralizada.
echo "⚙️  Instalando dependências do diretório 'shared'..."
npm install --prefix shared
echo "✅  Dependências compartilhadas instaladas com sucesso."

# --- Conclusão ---
# Ao final deste script, informamos que o setup inicial foi concluído.
# A partir daqui, a Render continuará o processo, executando os builds
# específicos de cada serviço conforme definido no `render.yaml`.
echo "🏁  Build da raiz concluído. A Render agora irá construir os serviços individuais."
