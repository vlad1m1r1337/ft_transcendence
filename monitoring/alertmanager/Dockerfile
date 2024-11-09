# Этап 1: Подготовка конфигурационного файла в Alpine
#FROM alpine:3.20 AS builder

# Устанавливаем gettext для использования envsubst
#RUN apk --no-cache add gettext
#RUN cp /usr/bin/envsubst /envsubst

#WORKDIR /etc/alertmanager/

# Копируем шаблон и подставляем переменные
#COPY config/alertmanager.yml.tpl ./alertmanager.yml.tpl
#ENV SMTP_SERVER=smtp.gmail.com:587
#ENV SMTP_SERVER_PASSWORD="duqz czzx avid zmaz"
#ENV RECIPIENT=timka2257@yandex.ru
#ENV EMAIL_USER=tim.alerting@gmail.com

#ARG SMTP_SERVER \
 #   SMTP_SERVER_PASSWORD \
  #  RECIPIENT \
   # EMAIL_USER

# Используем envsubst для создания окончательного alertmanager.yml
#RUN envsubst < ./alertmanager.yml.tpl > ./alertmanager.yml

# Этап 2: Настройка Alertmanager с готовым конфигом
FROM prom/alertmanager:v0.27.0

# Копируем созданный конфигурационный файл из предыдущего этапа
COPY ./config/alertmanager.yml /etc/alertmanager/alertmanager.yml
#COPY ./config/alertmanager.yml.tpl /etc/alertmanager/alertmanager.yml.tpl
#COPY --from=builder /usr/bin/envsubst envsubst

ENTRYPOINT [ "/bin/alertmanager" ]

# Запуск Alertmanager
CMD [ "--config.file=/etc/alertmanager/alertmanager.yml" ]

