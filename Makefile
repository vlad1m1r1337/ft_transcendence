#variables
PROJECT = ft_transcendence
COMPOSE = docker compose

# colors
RESET = \e[0m
PURPLE = \033[0;35m
CYAN = \033[0;36m
YELLOW = \033[1;33m
RED = \033[0;31m
BLUE = \033[0;34m

# flags
MAKEFLAGS += --no-print-directory

# rules
build: gen
	@echo "${PURPLE}*Building ${PROJECT} environment...*${RESET}"
	@${COMPOSE} -f docker-compose-main.yaml up --remove-orphans -d --build es01
	@$(MAKE) check_es01
	@bash ./elk/elk_setup/ikibana.sh
	@${COMPOSE} -f docker-compose-main.yaml up -d --build kib01
	@${COMPOSE} -f docker-compose-main.yaml up -d --build log01
	@${COMPOSE} -f docker-compose-main.yaml up -d --build
	@echo "${YELLOW}*Info about docker system:*${RESET}"
	@echo "${BLUE}*Memory usage of each container:*${RESET}"
	@docker stats --no-stream --format "{{.Name}}: {{.MemUsage}}"
	@echo "${BLUE}*Amount of disk space each container uses:*${RESET}"
	@docker system df
	@echo "${CYAN}*${PROJECT} was successfully built!*${RESET}"

up:
	@echo "${CYAN}*Initializing ${PROJECT} setup...* ${RESET}"
	@${COMPOSE} -f docker-compose-main.yaml up -d

down:
	@echo "${YELLOW}*Shutting down ${PROJECT}...* ${RESET}"
	@${COMPOSE} -f docker-compose-main.yaml down

re: down up
	@echo "${BLUE}* Projcet ${PROJECT} was rebuilded!* ${RESET}"

clean: down
	@echo "${RED}* Removing ${PROJECT} data...* ${RESET}"
	@docker system prune -a

fclean:
	@echo "${RED}* Performing complete clean-up...* ${RESET}"
	@if [ "$$(docker ps -qa)" != "" ]; then \
		docker stop $$(docker ps -qa); \
	fi
	@docker system prune --all --force --volumes
	@docker network prune --force
	@if [ "$$(docker ps -qa)" != "" ]; then \
		docker rm $$(docker ps -qa); \
	fi
	@if [ "$$(docker images -qa)" != "" ]; then \
		docker rmi $$(docker images -qa); \
	fi
	@if [ "$$(docker volume ls -q)" != "" ]; then \
		docker volume rm $$(docker volume ls -q); \
	fi
	@sudo rm -rf ./monitoring/alertmanager/config/alertmanager.yml
	@${MAKE} clean_certs

gen:
	@if [ -f .env ]; then \
		echo "${PURPLE}*Preparing important files to build ${PROJECT}...*${RESET}"; \
		if [ ! -f ./monitoring/alertmanager/config/alertmanager.yml ]; then \
			chmod +x ./tools/gen_alertmanager_config.sh; \
			bash ./tools/gen_alertmanager_config.sh; \
		fi; \
		if [ ! -d ./certs ]; then \
			${COMPOSE} -f docker-compose-certs.yaml up -d && \
			sleep 5 && \
			docker cp create_certs:/usr/share/elasticsearch/config/certs ./certs && \
			${MAKE} copy_certs; \
		fi; \
	else \
		echo ".env file not found! Please load or create it before running make"; \
		exit 1; \
	fi

check_es01:
	@echo "${PURPLE}Ожидаем готовности Elasticsearch (es01)...${RESET}"
	@until curl -s --cacert certs/ca/ca.crt https://localhost:9200 | grep -q "missing authentication credentials"; do \
	    echo "${YELLOW}Elasticsearch еще не готов. Настройка займет ещё немного времени.${RESET}"; \
	    sleep 5; \
	done
	@echo "${CYAN}Elasticsearch готов!${RESET}"

clean_certs:
	@for dir in ./certs ./elk/elasticsearch/certs ./elk/logstash/certs ./elk/kibana/certs; do \
		if [ -d $$dir ]; then \
			sudo rm -rf $$dir; \
		fi; \
	done

copy_certs:
	@for service in elasticsearch logstash kibana; do \
		cp -r ./certs ./elk/$$service; \
	done

.PHONY: build up down re clean fclean gen check_es01 clean_certs copy_certs