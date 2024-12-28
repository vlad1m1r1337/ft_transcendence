FROM prom/alertmanager:v0.27.0

COPY ./config/alertmanager.yml /etc/alertmanager/alertmanager.yml

ENTRYPOINT [ "/bin/alertmanager" ]

CMD [ "--config.file=/etc/alertmanager/alertmanager.yml" ]

