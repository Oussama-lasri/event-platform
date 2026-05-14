FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci           
# RUN npm ci --only=production       
COPY . .
COPY .env.docker .env

RUN mkdir -p uploads

EXPOSE 5000

CMD ["npm", "run", "dev"]    