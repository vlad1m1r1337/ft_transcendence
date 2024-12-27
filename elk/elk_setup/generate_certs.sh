#!/bin/bash

#mkdir -p /certs

bin/elasticsearch-certutil ca \
    --silent \
    --pem \
    -out config/certificates/ca.zip;
unzip config/certificates/ca.zip -d config/certs;

bin/elasticsearch-certutil cert \
    --silent \
    --pem \
    -out config/certs/certs.zip \
    --in config/certificates/instances.yml \
    --ca-cert config/certs/ca/ca.crt \
    --ca-key config/certs/ca/ca.key;
unzip config/certs/certs.zip -d config/certs;
rm -rf config/certs/certs.zip;

## Меняем владельца для папки с сертификатами
chown -R 1000:0 config/certs
