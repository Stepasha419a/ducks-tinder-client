# TODO: build image here, not in docker-compose
# TODO: pass certs
# TODO: pass env

FROM alpine:3.22.0 AS nginx-build

ARG TARGETARCH
ENV NGINX_VERSION=1.27.2

RUN apk add --no-cache \
    gcc \
    cmake \
    make \
    pcre-dev \
    libc-dev \
    zlib-dev \
    openssl-dev \
    wget \
    git

WORKDIR /usr/src
RUN wget http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz && \
    tar -zxvf nginx-${NGINX_VERSION}.tar.gz

RUN git clone --recurse-submodules -j8 https://github.com/google/ngx_brotli.git

# build brotli
WORKDIR /usr/src/ngx_brotli/deps/brotli

RUN set -eux; \
    if [ "${TARGETARCH}" = "amd64" ]; then \
       ARCH_FLAGS="-m64 -march=native -mtune=native -flto -funroll-loops -ffunction-sections -fdata-sections -Wl,--gc-sections"; \
    else \
       ARCH_FLAGS="-Ofast -flto -funroll-loops -ffunction-sections -fdata-sections -Wl,--gc-sections"; \
    fi; \
    mkdir out && cd out && \
    cmake -DCMAKE_BUILD_TYPE=Release \
          -DBUILD_SHARED_LIBS=OFF \
          -DCMAKE_C_FLAGS="${ARCH_FLAGS}" \
          -DCMAKE_CXX_FLAGS="${ARCH_FLAGS}" \
          -DCMAKE_INSTALL_PREFIX=./installed .. && \
    cmake --build . --config Release --target brotlienc

# build nginx
WORKDIR /usr/src/nginx-${NGINX_VERSION}
ENV CFLAGS=""
ENV LDFLAGS=""

RUN set -eux; \
    if [ "${TARGETARCH}" = "amd64" ]; then \
      export CFLAGS="-m64 -march=native -mtune=native -Ofast -flto -funroll-loops -ffunction-sections -fdata-sections -Wl,--gc-sections"; \
      export LDFLAGS="-m64 -Wl,-s -Wl,-Bsymbolic -Wl,--gc-sections"; \
    else \
      export CFLAGS="-Ofast -flto -funroll-loops -ffunction-sections -fdata-sections -Wl,--gc-sections"; \
      export LDFLAGS="-Wl,-s -Wl,-Bsymbolic -Wl,--gc-sections"; \
    fi; \
    ./configure \
      --prefix=/etc/nginx \
      --sbin-path=/usr/sbin/nginx \
      --conf-path=/etc/nginx/nginx.conf \
      --pid-path=/var/run/nginx.pid \
      --with-http_ssl_module \
      --with-http_v2_module \
      --with-threads \
      --add-module=/usr/src/ngx_brotli && \
    make -j$(nproc) && \
    make install

FROM node:22.17-alpine3.22 AS frontend-build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app/frontend

COPY ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./
COPY ./scripts/remove-webpack-error.js ./scripts/
COPY ./apps/chat/package.json ./apps/chat/
COPY ./apps/policy/package.json ./apps/policy/
COPY ./apps/root/package.json ./apps/root/

RUN pnpm run install:webpack

COPY . .

RUN pnpm run nx:build:apps

FROM alpine:3.22.0

RUN apk add --no-cache gettext pcre bash

COPY --from=nginx-build /usr/sbin/nginx /usr/sbin/nginx
COPY --from=nginx-build /etc/nginx /etc/nginx
COPY --from=nginx-build /var/run /var/run

COPY --from=frontend-build /usr/src/app/frontend/apps/root/dist /usr/share/nginx/html/root
COPY --from=frontend-build /usr/src/app/frontend/apps/policy/dist /usr/share/nginx/html/policy
COPY --from=frontend-build /usr/src/app/frontend/apps/chat/dist /usr/share/nginx/html/chat
COPY --from=frontend-build /usr/src/app/frontend/nginx/nginx.conf /etc/nginx/nginx.conf.template

COPY ./scripts/env-config.sh /usr/src/app/env-config.sh
COPY ./scripts/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./env-config.sh ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
