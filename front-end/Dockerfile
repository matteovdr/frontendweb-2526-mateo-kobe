FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /usr/src/app
COPY . .

FROM base as build


ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

ARG VITE_GOOGLE_CLIENT_ID
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build

# ---------------------- #

FROM nginx:1.29.3-alpine

# "./nginx.conf" sturen naar "/etc/nginx/nginx.conf"
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*

# Productie build kopieren en in  de html map plaatsen

COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]