FROM alpine
# FROM webwurst/confd:0.11-alpine

# COPY ./etc/confd /etc/confd
# COPY ./run.sh /opt/rancher/bin/
COPY ./etc/logstash /etc/logstash

# VOLUME /opt/rancher/bin
VOLUME /etc/logstash

# CMD ["confd", "-backend", "rancher", "-prefix", "/2015-12-19"]
CMD ["/bin/true"]
