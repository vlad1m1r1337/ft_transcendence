#!/bin/sh


if [ ! -d "/home/${USER}/ft_transcendence/data" ]; then
	mkdir -p /home/${USER}/ft_transcendence/data
fi

if [ -d "/home/${USER}/ft_transcendence/data" ]; then
	if [ ! -d "/home/${USER}/ft_transcendence/data/nginx" ]; then
		mkdir -p ~/ft_transcendence/data/nginx
		chmod 777 ~/ft_transcendence/data/nginx
	fi
	if [ ! -d "/home/${USER}/ft_trnscendence/data/postgresql" ]; then
		mkdir -p ~/ft_transcendence/data/postgresql
		chmod 777 ~/ft_transcendence/data/postgresql
	fi
	if [ ! -d "/home/${USER}/ft_transcendence/data/prometheus" ]; then
		mkdir -p ~/ft_transcendence/data/prometheus
		chmod 777 ~/ft_transcendence/data/prometheus
	fi
	if [ ! -d "/home/${USER}/ft_transcendence/data/grafana" ]; then
		mkdir -p ~/ft_transcendence/data/grafana
		chmod 777 ~/ft_transcendence/data/grafana
	fi
fi
