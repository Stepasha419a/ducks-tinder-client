#!/bin/sh

echo "window._env_ = {" > /usr/src/app/env-config.js

printenv | grep '^VAR_' | while IFS='=' read -r key value; do
  esc_value=$(printf '%s\n' "$value" | sed 's/"/\\"/g')
  echo "  \"$key\": \"$esc_value\"," >> /usr/src/app/env-config.js
done

echo "}" >> /usr/src/app/env-config.js