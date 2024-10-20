FROM prom/prometheus:v2.42.0

WORKDIR /etc/prometheus

COPY configs/prometheus_rules.yml .
COPY configs/prometheus.yml .

EXPOSE 9090

RUN /bin/promtool check rules /etc/prometheus/prometheus_rules.yml

CMD ["--config.file=/etc/prometheus/prometheus.yml", "--web.listen-address=:9090"]
