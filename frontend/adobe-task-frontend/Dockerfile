# Use Node to build the React app
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use a lightweight HTTP server to serve the static files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the frontend port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]