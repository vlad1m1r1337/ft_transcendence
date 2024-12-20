#!/bin/sh

PURPLE="\033[0;35m"
RED="\033[0;31m"

# 'socat': A command-line utility that establishes two bidirectional byte streams and transfers data between them. It can connect various types of sockets, including TCP, UDP, UNIX, etc.

# ' - ': This indicates that socat should read from standard input (stdin) and write to standard output (stdout). It acts as a placeholder for the first socket.

# 'TCP:front:3000': This specifies the target address and port to connect to

until socat - TCP:front:5000 && socat - TCP:back:5001; do
    if ! socat - TCP:front:5000; then
        echo -e "${RED}Front isn't up...waiting..."
    fi
    if ! socat - TCP:back:5001; then
        echo -e "${RED}Back isn't up...waiting..."
    fi
    sleep 4
done

echo -e "${PURPLE}Both Front and Back are up!"

nginx -g "daemon off;"
