FROM node:14.15.4-alpine

WORKDIR /app

RUN apk add  --no-cache ffmpeg

COPY . .

RUN cd web && yarn && yarn build
RUN cp -r ./web/build ./server
RUN cd server && yarn && yarn build

EXPOSE 3000

CMD ["node", "./server/dist/index.js"]