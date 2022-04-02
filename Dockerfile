# PEGA UMA VERSAO BASE DO STRAPI COM O NODE NA VERSAO 14x PARA CRIAR A IMAGEM
FROM strapi/base:14

WORKDIR /opt/app

# OS DOIS COMANDOS ABAIXO COPIA O package.json E yarn.lcok PARA DENTRO DA IAMGEM
COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --prod

RUN npx browserslist@latest --update-db

# O COMANDO ABAIXO COPIA TODAS AS PASTAS E ARQUIVOS PARA DENTRO DA IMAGEM
COPY . .

ENV NODE_ENV production
ENV DATABASE_CLIENT=postgres

RUN yarn build

EXPOSE 1337
CMD ["yarn", "start"]
