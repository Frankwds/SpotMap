# Dockerfile.dev
# Use the official Node.js image as the base image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json ./
COPY yarn.lock ./

# Install dependencies using yarn
RUN yarn install

# Copy the rest of the application code
COPY . ./

# Expose port 3000 for the development server
EXPOSE 3000
EXPOSE 8080
EXPOSE 80

# Start the development server
CMD ["yarn", "start", "--host", "0.0.0.0"]