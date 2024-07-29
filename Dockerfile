# ===================================
# =========== BUILD IMAGE ===========
# ===================================
FROM node:22-alpine AS BUILD_IMAGE

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy package.json files
COPY package.json package-lock.json ./

# Download all dependencies. Dependencies will be cached
# if the package.json files are not changed
RUN npm i

# Copy the source from the current directory to
# the Working Directory inside the container
COPY . .

# Compile the website (production build)
RUN npm run build

# remove development dependencies
RUN npm prune --production

# ===================================
# ========== RUNTIME IMAGE ==========
# ===================================
FROM node:22-alpine

# Set the Current Working Directory inside the container
WORKDIR /app

# Adds Bash for env variable access (alpine does not ship w/ Bash)
RUN apk update && apk add bash

COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/package.json ./package.json

# Run it
CMD npm run start
