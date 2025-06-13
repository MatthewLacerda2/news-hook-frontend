# Install dependencies
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the app (this will use env vars from Cloud Run)
RUN npm run build

# Start the app
CMD ["npm", "start"]
