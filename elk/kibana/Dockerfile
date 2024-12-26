FROM docker.elastic.co/kibana/kibana:7.17.10

RUN 	mkdir -p /usr/share/kibana/config/ssl && \
	openssl req -x509 -nodes -days 365 \
	-newkey rsa:2048 \
	-keyout /usr/share/kibana/config/ssl/kibana-selfsigned.key \
	-out /usr/share/kibana/config/ssl/kibana-selfsigned.crt \
	-subj "/C=US/ST=State/L=City/O=Organization/OU=Department/CN=localhost"

#COPY ./kibana.yml /usr/share/kibana/config/kibana.yml