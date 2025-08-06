#!/bin/bash

/usr/src/app/env-config.sh

REQUIRED_VARS="PROXY_SERVER_NAME"

for var in $REQUIRED_VARS; do
  if [ -z "${!var}" ]; then
    echo "Error: var $var is unset"
    exit 1
  fi
done

SUBST_LIST=$(printf '${%s} ' $REQUIRED_VARS)

envsubst "$SUBST_LIST" < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

exec nginx -g 'daemon off;'