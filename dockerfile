FROM node:16-alpine

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci
COPY . .
EXPOSE 3000
CMD [ "npm" ,"run" ,"module3" ]