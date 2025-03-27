FROM node:23

# Install dependencies
# RUN apt-get update && apt-get install -y \
#     nodejs \
#     npm

# RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash - && \


WORKDIR /app

COPY package.json .

RUN npm install
RUN npm install bcrypt --build-from-source


EXPOSE 80

COPY . .

RUN npm run build
RUN npm run build:server



CMD ["npm", "run", "serve:server"]

