# Use official Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Install ts-node globally to run TypeScript
RUN npm install -g ts-node

# Expose port
EXPOSE 8080

# Start the app
CMD ["ts-node", "index.ts"]