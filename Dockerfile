FROM alpine:3.22.0

ENV NGINX_VERSION=1.27.2

RUN apk add --no-cache \
    git \
    gcc \
    make \
    libc-dev \
    musl-dev \
    openssl-dev \
    zlib-dev \
    linux-headers \
    cmake \
    gettext

RUN git clone --recursive https://github.com/google/brotli.git /tmp/brotli

RUN cd /tmp/brotli && \
    git submodule init && git submodule update && \
    cd /tmp/brotli && \
    mkdir build && cd build && \
    cmake .. && make && make install

RUN rm -rf /tmp/brotli