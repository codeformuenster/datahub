#!/bin/bash

set -e

PLUGIN_TXT=${PLUGIN_TXT:-/usr/share/elasticsearch/plugins.txt}

while [ ! -f "/usr/share/elasticsearch/config/elasticsearch.yml" ]; do
  sleep 1
done

if [ -f "$PLUGIN_TXT" ]; then
  for plugin in $(<"${PLUGIN_TXT}"); do
    /usr/share/elasticsearch/bin/plugin --install $plugin
  done
fi

# set -ex \
#   && cd /usr/share/elasticsearch/config/ \
#   && for path in \
#     ./data \
#     ./logs \
#     ./config \
#     ./config/scripts \
#   ; do \
#     mkdir -p "$path"; \
#     chown -R elasticsearch:elasticsearch "$path"; \
#   done

# Change the ownership of /usr/share/elasticsearch/data to elasticsearch
chown -R elasticsearch:elasticsearch /usr/share/elasticsearch/config
chown -R elasticsearch:elasticsearch /usr/share/elasticsearch/data

exec /docker-entrypoint.sh elasticsearch