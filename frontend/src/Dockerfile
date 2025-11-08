# Stage 1: Build the React application
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application with a lightweight NGINX image
FROM nginx:stable-alpine

# Remove the default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the build output from the 'builder' stage into NGINX's web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the host
EXPOSE 80

# The command to start NGINX is the default, no need to add a CMD instruction
