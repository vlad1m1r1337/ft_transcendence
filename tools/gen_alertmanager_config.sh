#!/bin/bash

# Load environment variables from .env file
set -o allexport
source .env
set +o allexport

# Path to the template file
TEMPLATE_FILE="./monitoring/alertmanager/config/alertmanager.yml.tpl"
# Output file path
OUTPUT_FILE="./monitoring/alertmanager/config/alertmanager.yml"

# Substitute variables and create alertmanager.yml
envsubst < "$TEMPLATE_FILE" > "$OUTPUT_FILE"

if [ -f "${OUTPUT_FILE}" ]
then
	echo "Generated alertmanager.yml from alertmanager.yml.tpl"
else
	echo "Something went wrong"
fi
