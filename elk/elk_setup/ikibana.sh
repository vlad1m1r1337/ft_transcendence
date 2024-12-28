#!/bin/bash

set -a
source .env
set +a

ELASTICSEARCH_HOST=https://localhost:9200

curl -u elastic:${ELASTIC_PASSWORD} -X POST "https://localhost:9200/_security/user/${KIBANA_USER}" -H "Content-Type: application/json" -d "{
  \"password\" : \"${ELASTIC_PASSWORD}\",
  \"roles\" : [ \"kibana_system\" ]
}" --cacert ${CA_CERT_PATH}

echo "Ожидаем доступности Elasticsearch..."
until curl --cacert "${CA_CERT_PATH}" -u "${ELASTIC_USER}:${ELASTIC_PASSWORD}" "${ELASTICSEARCH_HOST}/_cluster/health" | grep -q '"status":"\(green\|yellow\)"' ; do
  sleep 5
done
echo "Elasticsearch доступен!"

echo "Создаём политику ILM..."
curl -X PUT "$ELASTICSEARCH_HOST/_ilm/policy/logs_retention_policy" \
-H "Content-Type: application/json" \
--cacert "${CA_CERT_PATH}" \
-u "${ELASTIC_USER}:${ELASTIC_PASSWORD}" \
-d '{
  "policy": {
    "phases": {
      "hot": {
        "min_age": "0ms",
        "actions": {
          "rollover": {
            "max_size": "10gb",
            "max_age": "1d"
          }
        }
      },
      "delete": {
        "min_age": "2d",
        "actions": {
          "delete": {}
        }
      }
    }
  }
}'

echo "Создаём шаблон индекса..."
curl -X PUT "$ELASTICSEARCH_HOST/_index_template/logs_template" \
-H "Content-Type: application/json" \
--cacert "${CA_CERT_PATH}" \
-u "${ELASTIC_USER}:${ELASTIC_PASSWORD}" \
-d '{
  "index_patterns": ["logs-*"],
  "template": {
    "settings": {
      "index.lifecycle.name": "logs_retention_policy",
      "index.lifecycle.rollover_alias": "logs"
    }
  }
}'

echo "Создаём начальный индекс..."
curl -X PUT "$ELASTICSEARCH_HOST/logs-000001" \
-H "Content-Type: application/json" \
--cacert "${CA_CERT_PATH}" \
-u "${ELASTIC_USER}:${ELASTIC_PASSWORD}" \
-d '{
  "aliases": {
    "logs": {
      "is_write_index": true
    }
  }
}'
