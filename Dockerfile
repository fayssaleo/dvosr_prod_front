# étape de build
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# étape de production
FROM nginx:1.17.1-alpine
COPY ./docker-files/nginx/conf.d/ /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
