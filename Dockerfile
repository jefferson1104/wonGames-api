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

# VARIAVEIS DE AMBIENTE
ENV NODE_ENV production
ENV DATABASE_CLIENT=postgres
ENV ADMIN_JWT_SECRET=0z25DjnjcXjvFMJmTIR0/BCKh6Jxevfrbp4nJcC40+Nl5n7rFmz52qeWrjNoxhZ3RafmzCh/vKrGcrsSsXiSag==

RUN yarn build

EXPOSE 1337
CMD ["yarn", "start"]
