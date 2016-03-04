FROM webwurst/confd:0.11-alpine

COPY ./etc/confd /etc/confd
COPY ./prepare_run.sh /usr/share/elasticsearch/_prepare_run/

VOLUME /usr/share/elasticsearch/config
VOLUME /usr/share/elasticsearch/_prepare_run

CMD ["confd", "-backend", "rancher", "-prefix", "/2015-12-19"]
