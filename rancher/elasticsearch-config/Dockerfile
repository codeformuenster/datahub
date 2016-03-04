FROM webwurst/confd:0.11-alpine

COPY ./etc/confd /etc/confd

VOLUME /usr/share/elasticsearch/config
CMD ["confd", "-backend", "rancher", "-prefix", "/2015-12-19"]
