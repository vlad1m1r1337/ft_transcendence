FROM docker.elastic.co/logstash/logstash:8.17.0

COPY ./certs /usr/share/logstash/certs
COPY ./config/logstash.yml /usr/share/logstash/config/logstash.yml
COPY ./pipeline /usr/share/logstash/pipeline