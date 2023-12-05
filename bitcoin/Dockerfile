# build
FROM quay.io/centos/centos:stream9 AS builder

ARG BITCOIN_URL=https://bitcoin.org/bin/bitcoin-core-25.0/bitcoin-25.0-x86_64-linux-gnu.tar.gz
ARG BITCOIN_NAME=bitcoin-25.0-x86_64-linux-gnu.tar.gz
ARG BITCOIN_DIR=bitcoin-25.0

COPY bitcoin.conf /app/bitcoin/config/

RUN mkdir -p /app/bitcoin/exec/ /app/bitcoin/tmp/ && \
    cd /app/bitcoin/tmp/ && \
    curl -O ${BITCOIN_URL} && \
    tar xzf ${BITCOIN_NAME} && \
    mv /app/bitcoin/tmp/${BITCOIN_DIR}/* /app/bitcoin/exec/


# copy files to slim image
FROM quay.io/centos/centos:stream9

COPY --from=builder /app/bitcoin/exec/ /app/bitcoin/exec/

RUN mkdir -p /app/bitcoin/data/ /app/bitcoin/log/ && \
    chown -R 10086:10086 /app/

WORKDIR /app/bitcoin/

USER 10086

CMD ["bash", "-c", "/app/bitcoin/exec/bin/bitcoind -conf=/app/bitcoin/config/bitcoin.conf -datadir=/app/bitcoin/data/ -debuglogfile=/app/bitcoin/log/bitcoin.log  > /dev/null 2>&1"]
