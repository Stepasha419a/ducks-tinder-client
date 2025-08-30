#!/bin/bash

/usr/src/app/env-config.sh

REQUIRED_VARS="VAR_MODE PROXY_SERVER_NAME PROXY_CERT_PATH PROXY_KEY_PATH"

for var in $REQUIRED_VARS; do
  if [ -z "${!var}" ]; then
    echo "Error: var $var is unset"
    exit 1
  fi
done

: "${PROXY_ROOT_PATH:=/}"
if [ "$PROXY_ROOT_PATH" = "/" ]; then
  PROXY_ALIAS_OPTIONAL_SLASH="/"
  PROXY_ROOT_PATH_WITH_OPTIONAL_SLASH=""
else
  PROXY_ALIAS_OPTIONAL_SLASH=""
  PROXY_ROOT_PATH_WITH_OPTIONAL_SLASH="$PROXY_ROOT_PATH"
fi

export PROXY_ROOT_PATH PROXY_ROOT_PATH_WITH_OPTIONAL_SLASH PROXY_ALIAS_OPTIONAL_SLASH

SUBST_LIST=$(printf '${%s} ' $REQUIRED_VARS)
SUBST_LIST+="\${PROXY_ROOT_PATH} \${PROXY_ROOT_PATH_WITH_OPTIONAL_SLASH} \${PROXY_ALIAS_OPTIONAL_SLASH}"

envsubst "$SUBST_LIST" < /usr/share/nginx/html/root/index.html > /usr/share/nginx/html/root/index.runtime.html
sed -i 's/<base-placeholder/<base/' /usr/share/nginx/html/root/index.runtime.html

envsubst "$SUBST_LIST" < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

exec nginx -g 'daemon off;'