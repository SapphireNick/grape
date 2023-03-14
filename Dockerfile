FROM node:16-slim

EXPOSE 8080

RUN apt-get update
# For pg_isready (a bit hacky) and openssl for prisma
RUN apt-get install -y openssl postgresql-client

WORKDIR /app
COPY . .
RUN npm install && npm run build
ENV NODE_ENV production
CMD sh ./src/WaitForDBAndStart.sh