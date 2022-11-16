FROM node:lts-alpine

EXPOSE 8080

# For pg_isready (a bit hacky)
RUN apk add --no-cache postgresql-client

WORKDIR /app
COPY . .
RUN npm install && npm run build
ENV NODE_ENV production
CMD sh ./src/WaitForDBAndStart.sh