FROM webwurst/confd:0.11-alpine

COPY ./etc/confd /etc/confd
# COPY ./prepare_run.sh /usr/share/elasticsearch/_prepare_run/
ADD ./run.sh /opt/rancher/bin/

VOLUME /usr/share/elasticsearch/config
# VOLUME /usr/share/elasticsearch/_prepare_run
VOLUME /opt/rancher/bin

CMD ["confd", "-backend", "rancher", "-prefix", "/2015-12-19"]
