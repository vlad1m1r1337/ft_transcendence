#!/bin/bash
#
##cat config/certificates/instances.yml
#if [[ ! -f /certs/bundle.zip ]]; then
#  bin/elasticsearch-certutil cert --silent --pem --in config/certificates/instances.yml -out /certs/bundle.zip
#  unzip /certs/bundle.zip -d /certs
#fi
#
#chown -R 1000:0 /certs

# Создаем папку /certs, если она не существует
mkdir -p /certs

# Генерируем сертификаты, если они еще не созданы
if [[ ! -f /certs/bundle.zip ]]; then
  bin/elasticsearch-certutil cert \
    --silent \
    --pem \
    --in config/certificates/instances.yml \
    -out /certs/bundle.zip
fi

# Распаковываем созданные сертификаты
unzip -o /certs/bundle.zip -d /usr/share/elasticsearch/certs

# Меняем владельца для папки с сертификатами
chown -R 1000:0 /certs
