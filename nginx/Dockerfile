FROM	alpine:3.18

RUN	apk update && \
	apk upgrade && \
	apk add --no-cache nginx tini socat curl

COPY 	check.sh .

EXPOSE	443

# "tini": lightweight init system for Docker containers. It helps manage processes, handle signals (like SIGTERM), and avoid zombie processes.
# "--": This is used to indicate the end of options for tini. Everything after this will be passed as arguments to the command being executed.
ENTRYPOINT ["/sbin/tini", "--", "./check.sh"]
