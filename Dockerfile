FROM ubuntu:24.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    nodejs \
    npm

WORKDIR /app

COPY package* .

RUN npm install

EXPOSE 80

COPY . .

RUN npm run build
RUN npm run build:server



CMD ["npm", "run", "serve:server"]

