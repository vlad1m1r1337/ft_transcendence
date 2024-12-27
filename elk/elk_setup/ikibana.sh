#!/bin/bash

# Загрузка переменных из .env файла
set -a
source .env
set +a

curl -u elastic:${ELASTIC_PASSWORD} -X POST "https://localhost:9200/_security/user/${KIBANA_USER}" -H "Content-Type: application/json" -d "{
  \"password\" : \"${ELASTIC_PASSWORD}\",
  \"roles\" : [ \"kibana_system\" ]
}" --cacert ${CA_CERT_PATH}