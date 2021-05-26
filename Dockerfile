FROM node:lts-alpine

WORKDIR /app

RUN apk add  --no-cache ffmpeg

COPY . .

RUN cd web && yarn && yarn build
RUN cp -r ./web/build ./server
RUN cd server && yarn && yarn build

EXPOSE 5000

CMD ["node", "./server/dist/index.js"]