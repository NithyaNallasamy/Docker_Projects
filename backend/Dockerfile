# 1. Use a lightweight Node.js image (Alpine Linux)
FROM node:20-alpine

# 2. Create a directory for our app inside the container
WORKDIR /usr/src/app

# 3. Copy package files first. 
# This is a "Layer Optimization" trick—if your code changes but your 
# dependencies don't, Docker skips 'npm install' on the next build.
COPY package*.json ./

# 4. Install production dependencies
RUN npm install

# 5. Copy the rest of your application code
COPY . .

# 6. The port your Express app listens on (defined in index.js)
EXPOSE 5000

# 7. Start the application
CMD ["node", "index.js"]
