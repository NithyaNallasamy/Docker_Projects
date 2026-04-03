# STAGE 1: The "Build" Environment
# We use a heavy Node image only to compile the code
FROM node:20-alpine AS build-stage

WORKDIR /app

# Copy package files first to cache dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code and build the project
COPY . .
RUN npm run build

# STAGE 2: The "Production" Environment
# We switch to a tiny Nginx image to serve the static files
FROM nginx:stable-alpine

# Copy the compiled "dist" folder from the build-stage
# to Nginx's default public folder
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 (the default Nginx port)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
