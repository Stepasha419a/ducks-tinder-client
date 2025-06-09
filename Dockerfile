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

RUN git clone --recursive https://github.com/google/brotli.git /tmp/brotli

RUN cd /tmp/brotli && \
    git submodule init && git submodule update && \
    cd /tmp/brotli && \
    mkdir build && cd build && \
    cmake .. && make && make install

RUN rm -rf /tmp/brotli