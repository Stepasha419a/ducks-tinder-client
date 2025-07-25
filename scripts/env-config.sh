#!/bin/sh

echo "window._env_ = {" > /usr/share/nginx/html/env-config.js

printenv | grep '^VAR_' | while IFS='=' read -r key value; do
  esc_value=$(printf '%s\n' "$value" | sed 's/"/\\"/g')
  echo "  \"$key\": \"$esc_value\"," >> /usr/share/nginx/html/env-config.js
done

echo "}" >> /usr/share/nginx/html/env-config.js