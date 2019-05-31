FROM node:10.15.0-slim

RUN apt-get update

RUN apt install -y software-properties-common
RUN apt install -y tesseract-ocr
RUN apt install -y tesseract-ocr-all
RUN apt install -y imagemagick

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm install

COPY ./src /usr/src/app/src
COPY ./client /usr/src/app/client
COPY ./misc /usr/src/app/misc

RUN mkdir /usr/src/app/uploads

EXPOSE 8382

CMD ["npm", "run", "start"]
