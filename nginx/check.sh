#!/bin/sh

PURPLE="\033[0;35m"
RED="\033[0;31m"

# 'socat': A command-line utility that establishes two bidirectional byte streams and transfers data between them. It can connect various types of sockets, including TCP, UDP, UNIX, etc.

# ' - ': This indicates that socat should read from standard input (stdin) and write to standard output (stdout). It acts as a placeholder for the first socket.

# 'TCP:front:3000': This specifies the target address and port to connect to

until socat - TCP:front:5000; do
    echo -e "${RED}Front isn't up...waiting..."
    sleep 4
done

echo -e "${PURPLE}Front is up!"

nginx -g "daemon off;"
