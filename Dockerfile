# construir a imagem da aplicação node
FROM node:18
#define o diretorio de trabalho
WORKDIR /api/
#copia os arquivos para o diretorio de trabalho 
COPY package*.json ./api
##instalar as dependencias
RUN npm install 
# copiar o restante do código para o workspace
COPY . .
# exponha a porta que será utilizada
EXPOSE 4545
# Rode a aplicaçao 
CMD [ "npm", "run" , "dev" ]
