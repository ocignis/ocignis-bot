ARG BASE=node:18.15.0-alpine


###########################################
# Builder stage.
# - compile TypeScript to ./dist folder
###########################################
FROM ${BASE} AS builder

WORKDIR /app


COPY package*.json ./
COPY ./tsconfigs ./tsconfigs
COPY ./src ./src

RUN ls -a

RUN npm ci
RUN npm run db-prisma-client-generate
RUN npm run build


###########################################
# Production stage.
# - create production build (use ./dist folder from builder stage)
# - don't install devDependencies
###########################################
FROM ${BASE} as production

WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/dist ./dist

RUN ls -a

RUN npm ci --omit=dev --ignore-scripts

COPY ./src/prisma/schema.prisma ./src/prisma/schema.prisma
RUN npm run db-prisma-client-generate

EXPOSE 4000

CMD [ "npm", "run", "docker-prod" ]