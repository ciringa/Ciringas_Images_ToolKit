# construir a imagem da aplicação node
FROM node:20

# define o diretório de trabalho
WORKDIR /api

# copia os arquivos de dependências para o diretório de trabalho 
COPY package*.json ./

# instala as dependências
RUN npm install 

# copia o restante do código para o workspace
COPY . .

# expõe a porta que será utilizada
EXPOSE 4545:5454

# roda a aplicação
CMD [ "npm", "start"]
