FROM node:latest
LABEL MAINTAINER="Fitrahananda"



WORKDIR /home/app

COPY . .

ENV TZ="Asia/Jakarta"

RUN npm install --save --production=true

EXPOSE 80 3000
CMD ["npm", "start"]



