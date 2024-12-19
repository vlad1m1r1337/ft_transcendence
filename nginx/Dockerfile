FROM	alpine:3.18

RUN	apk update && \
	apk upgrade && \
	apk add --no-cache nginx tini socat curl openssl

# Generate selfsigned certificates.
RUN 	mkdir -p /etc/nginx/ssl && \
	openssl req -x509 -nodes -days 365 \
	-newkey rsa:2048 \
	-keyout /etc/nginx/ssl/nginx-selfsigned.key \
	-out /etc/nginx/ssl/nginx-selfsigned.crt \
	-subj "/C=US/ST=State/L=City/O=Organization/OU=Department/CN=localhost"

COPY	./conf/nginx.conf /etc/nginx/nginx.conf

COPY 	check.sh .

EXPOSE	443

# "tini": lightweight init system for Docker containers. It helps manage processes, handle signals (like SIGTERM), and avoid zombie processes.
# "--": This is used to indicate the end of options for tini. Everything after this will be passed as arguments to the command being executed.
ENTRYPOINT ["/sbin/tini", "--", "./check.sh"]
