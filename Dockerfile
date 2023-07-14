FROM node:18 as builder
ARG VITE_RESUME_LINK
WORKDIR /usr/app
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
COPY package.json pnpm-lock.yaml tsconfig.json vite.config.ts index.html ./
COPY src ./src
RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM nginx:latest
COPY --from=builder /usr/app/dist /var/www/dist
