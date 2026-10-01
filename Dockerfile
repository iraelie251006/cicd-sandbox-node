# Stage 1: Build environment
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install ALL dependencies (including devDependencies) to run tests/linting if needed in CI
# Though usually CI runs these before docker build. But for layer caching we use ci.
RUN npm ci

# Copy application source code
COPY . .

# Stage 2: Production environment
FROM node:20-alpine AS production

WORKDIR /app

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --omit=dev

# Copy the application source from the builder stage
# (Alternatively just copy from the host, but multi-stage ensures we can build/compile if needed)
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public

# Change ownership to the non-root user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Expose the application port
EXPOSE 3000

# Add a healthcheck to ensure the container is running properly
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/status || exit 1

# Start the application
CMD ["npm", "start"]
