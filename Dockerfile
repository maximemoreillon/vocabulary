FROM node:20
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]