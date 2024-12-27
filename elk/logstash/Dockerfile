FROM docker.elastic.co/logstash/logstash:7.17.10

COPY ./certs /usr/share/logstash
COPY ./config/logstash.yml /usr/share/logstash/config/logstash.yml
COPY ./pipeline /usr/share/logstash/pipeline