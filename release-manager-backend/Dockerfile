FROM node:20.9.0

WORKDIR /app

COPY package.json /app/package.json

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:docker"]
