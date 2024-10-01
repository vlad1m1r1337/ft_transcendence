FROM	alpine:3.18

RUN	apk update && \
	apk upgrade && \
	apk add --no-cache nginx tini socat curl

COPY 	check.sh .

EXPOSE	443

ENTRYPOINT ["/sbin/tini", "--", "./check.sh"]
