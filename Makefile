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

# rules

build: gen
	@echo "${PURPLE}*Building ${PROJECT} environment...*${RESET}"
	@${COMPOSE} -f docker-compose-main.yaml up -d --build

up:
	@echo "${CYAN}*Initializing ${PROJECT} setup...* ${RESET}"
	@${COMPOSE} up -d

down:
	@echo "${YELLOW}*Shutting down ${PROJECT}...* ${RESET}"
	@${COMPOSE} down

re: down up
	@echo "${BLUE}* Rebuilding ${PROJECT}...* ${RESET}"

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
	@sudo rm -rf ./certs
	@sudo rm -rf ./monitoring/alertmanager/config/alertmanager.yml

gen:
	@if [ -f .env ]; then \
		echo "${PURPLE}*Preparing important files to build ${PROJECT}...*${RESET}"; \
		if [ ! -f ./monitoring/alertmanager/config/alertmanager.yml ]; then \
			chmod +x ./tools/gen_alertmanager_config.sh; \
			bash ./tools/gen_alertmanager_config.sh; \
		fi; \
		if [ ! -d ./certs ]; then \
			${COMPOSE} -f docker-compose-certs.yaml up -d && \
			sleep 15 && \
			docker cp create_certs:/usr/share/elasticsearch/certs ./certs; \
		fi; \
	else \
		echo ".env file not found! Please load or create it before running make"; \
		exit 1; \
	fi

.PHONY: build up down re clean fclean gen
