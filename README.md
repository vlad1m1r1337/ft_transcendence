# ft_transcendence

## ❗️❗️Текущая версия кода❗️❗️
Сейчас хватает написать make и контейнеры запустятся. После этого можно заходить на сайт, вводя ```localhost``` в браузере. В данном случае происходит редирект на ```https://localhost:443```

Позже реализую secure(https) вход на каждый из сервисов, а пока если ввести ```http://localhost:<port>```, то можно попасть на следующие сервисы:
+ ```port:3000``` - Grafana
+ ```port:9090``` - Prometheus
+ ```port:5601``` - ElasticSearch
+ ```port:9200``` - Kibana
+ ```port:5044``` - Logstash
+ ```port:9113``` - Nginx-exporter
+ ```port:9100``` - Node-exporter

## Вся инфа прописана в docker-compose.yaml файле. Позже добавлю доку и docker-compose будет ещё меняться.
## Текущий общий объём используемого дискового пространства после поднятия контейнеров > 2GB.

## TEAM ```🔜SOON🔜```
+ adavitav - Backend
+ vgribkov - Frontend
+ tgalyaut - DevOps
