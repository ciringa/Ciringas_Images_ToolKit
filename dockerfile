
# Etapa 1: Construir a imagem da aplicação Node.js
FROM node:18 AS node-stage

# Definir o diretório de trabalho
WORKDIR /api/

# Copiar apenas os arquivos de dependências para aproveitar o cache
COPY package*.json . 

# Instalar as dependências Node.js
RUN npm install 

# Copiar o restante do código para o diretório de trabalho
COPY . .

# Expor a porta que será utilizada pela aplicação Node.js
EXPOSE 4545

# Etapa 2: Instalar dependências Python
# Atualizar os pacotes e instalar Python3 e pip
RUN apt-get update && apt-get install -y python3 python3-pip

# Copiar o arquivo de dependências Python e instalar as bibliotecas necessárias
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Definir o comando de execução da aplicação em produção (substituir 'dev' por 'start')
CMD ["npm", "run", "start"]
