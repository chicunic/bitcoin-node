# build
FROM node:18-buster AS builder

RUN mkdir -p /app/bitcore/config/ /app/bitcore/log/
RUN cd /app/bitcore/ && git clone https://github.com/bitpay/bitcore.git
RUN mv /app/bitcore/bitcore/ /app/bitcore/exec/

ADD bitcore.config.json /app/bitcore/exec/

RUN cd /app/bitcore/exec/ && \
    npm install && \
    npm run bootstrap && \
    npm run compile


# copy files to slim image
FROM node:18-buster-slim

COPY --from=builder /app/bitcore/ /app/bitcore/
RUN chown -R 10086:10086 /app/
RUN mkdir -p "/.npm" && chown -R 10086:0 "/.npm"

WORKDIR /app/bitcore/

EXPOSE 8080

USER 10086

CMD ["bash","-c","npm --prefix=/app/bitcore/exec/packages/bitcore-node start >> /app/bitcore/log/bitcore.log 2>&1"]
