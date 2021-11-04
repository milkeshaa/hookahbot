FROM node:lts-alpine3.14

WORKDIR /code
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .

CMD ["tail", "-f", "/dev/null"]