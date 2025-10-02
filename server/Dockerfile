# Use Debian-based Node to avoid native build headaches
FROM node:lts

WORKDIR /app

# Install deps with caching
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

# Cloud Run port
ENV PORT=8080
EXPOSE 8080

# Start
CMD ["npm","start"] 
