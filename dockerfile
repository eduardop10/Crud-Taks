# Stage 1: Backend
FROM node:16 AS backend
WORKDIR /app
COPY ./backEnd /app
#RUN npm install --frozen-lockfile
RUN npm install -g prisma
ENV PATH="/app/node_modules/.bin:${PATH}"

# Run Prisma migrations
CMD ["bash", "-c", "sleep 5 && npx prisma migrate deploy --schema=./prisma/schema.prisma"]

# Stage 2: Frontend
FROM httpd:2.4 AS frontend
COPY --from=backend /app /usr/local/apache2/htdocs/

# Final Stage
FROM postgres
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=crud

# Expose necessary ports
EXPOSE 3333
EXPOSE 80

# Copy backend files
COPY --from=backend /app /app

# Install dependencies and start backend and frontend services
WORKDIR /app
RUN apt-get update && apt-get install -y npm

# Start backend server
CMD ["bash", "-c", "npm run dev"]
