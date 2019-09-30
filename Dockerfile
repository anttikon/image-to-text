FROM node:12.10.0-alpine

RUN apk add tesseract-ocr
RUN apk add tesseract-ocr-data-fin
RUN apk add imagemagick

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN mkdir /usr/src/app/uploads

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm install

COPY ./src /usr/src/app/src

EXPOSE 8382

CMD ["npm", "run", "start"]