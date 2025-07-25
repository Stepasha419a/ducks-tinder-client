# TODO: build image here, not in docker-compose
# TODO: pass certs
# TODO: pass env

FROM alpine:3.22.0 AS nginx-build

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
    git \
    gettext

WORKDIR /usr/src
RUN wget http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz && \
    tar -zxvf nginx-${NGINX_VERSION}.tar.gz

RUN git clone --recurse-submodules -j8 https://github.com/google/ngx_brotli.git

# build brotli
WORKDIR /usr/src/ngx_brotli/deps/brotli
RUN mkdir out && cd out && \
    cmake -DCMAKE_BUILD_TYPE=Release \
          -DBUILD_SHARED_LIBS=OFF \
          -DCMAKE_C_FLAGS="-Ofast -m64 -march=native -mtune=native -flto -funroll-loops -ffunction-sections -fdata-sections -Wl,--gc-sections" \
          -DCMAKE_CXX_FLAGS="-Ofast -m64 -march=native -mtune=native -flto -funroll-loops -ffunction-sections -fdata-sections -Wl,--gc-sections" \
          -DCMAKE_INSTALL_PREFIX=./installed .. && \
    cmake --build . --config Release --target brotlienc

# build nginx
WORKDIR /usr/src/nginx-${NGINX_VERSION}
ENV CFLAGS="-m64 -march=native -mtune=native -Ofast -flto -funroll-loops -ffunction-sections -fdata-sections -Wl,--gc-sections"
ENV LDFLAGS="-m64 -Wl,-s -Wl,-Bsymbolic -Wl,--gc-sections"

RUN ./configure \
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
FROM alpine:3.22.0

RUN apk add --no-cache gettext pcre
ENTRYPOINT ["./entrypoint.sh"]
