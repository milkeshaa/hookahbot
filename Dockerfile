FROM node:lts-alpine3.14

WORKDIR /code
COPY package.json .
RUN npm install
COPY . .

CMD ["tail", "-f", "/dev/null"]