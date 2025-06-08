FROM alpine:3.22.0

# TODO: check if script has no unused deps, unused steps in build
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