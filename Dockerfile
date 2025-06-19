FROM alpine:3.22.0

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
