# Imagem base derivada do Node.js
FROM node

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar todos os arquivos do projeto para a imagem
COPY . /app

# Instalar as dependências
RUN npm install

# Comando para inicializar o serviço Shipping
CMD ["node", "/app/services/shipping/index.js"]
