FROM node:20.11.1-alpine as build

WORKDIR /app
COPY . /app
RUN npm install && npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]