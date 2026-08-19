FROM node:24-alpine AS builder
ARG PUBLIC_LINKEDIN_URL
ENV PUBLIC_LINKEDIN_URL=${PUBLIC_LINKEDIN_URL}
ARG PUBLIC_GITHUB_URL
ENV PUBLIC_GITHUB_URL=${PUBLIC_GITHUB_URL}
ARG PUBLIC_EMAIL
ENV PUBLIC_EMAIL=${PUBLIC_EMAIL}
ARG PUBLIC_RESUME_LINK
ENV PUBLIC_RESUME_LINK=${PUBLIC_RESUME_LINK}
ARG PUBLIC_HOME_PAGE
ENV PUBLIC_HOME_PAGE=${PUBLIC_HOME_PAGE}

WORKDIR /usr/app
RUN corepack enable
COPY package.json pnpm-lock.yaml tsconfig.json pnpm-workspace.yaml astro.config.mjs ./
COPY public ./public
COPY src ./src
RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM nginx:latest
COPY --from=builder /usr/app/dist /var/www/dist
