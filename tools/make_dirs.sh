#!/bin/sh


if [ ! -d "${PWD}/data" ]; then
	mkdir -p ${PWD}/data
fi

if [ -d "${PWD}/data" ]; then
	if [ ! -d "${PWD}/data/nginx" ]; then
		mkdir -p ${PWD}/data/nginx
		chmod 777 ${PWD}/data/nginx
	fi
	if [ ! -d "${PWD}/data/postgresql" ]; then
		mkdir ${PWD}/data/postgresql
		chmod 777 ${PWD}/data/postgresql
	fi
	if [ ! -d "${PWD}/data/prometheus" ]; then
		mkdir -p ${PWD}/data/prometheus
		chmod 777 ${PWD}/data/prometheus
	fi
	if [ ! -d "${PWD}/data/grafana" ]; then
		mkdir -p ${PWD}/data/grafana
		chmod 777 ${PWD}/data/grafana
	fi
fi
