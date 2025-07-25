#!/bin/sh

/usr/src/app/env-config.sh

envsubst '${VAR_PROXY_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

exec nginx -g 'daemon off;'