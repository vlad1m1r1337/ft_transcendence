FROM docker.elastic.co/elasticsearch/elasticsearch:8.17.0

USER root
RUN date -u && apt-get update && apt-get install -y unzip && rm -rf /var/lib/apt/lists/*


WORKDIR /usr/share/elasticsearch

COPY ./config /usr/share/elasticsearch/config/certificates
COPY ./generate_certs.sh /usr/share/elasticsearch/generate_certs.sh

RUN chmod +x /usr/share/elasticsearch/generate_certs.sh

CMD ["/usr/share/elasticsearch/generate_certs.sh"]
