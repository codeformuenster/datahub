FROM webwurst/confd:0.11-alpine

COPY ./etc/confd /etc/confd
COPY ./run.sh /opt/rancher/bin/

VOLUME /usr/share/elasticsearch/config
VOLUME /opt/rancher/bin

CMD ["confd", "-backend", "rancher", "-prefix", "/2015-12-19"]
