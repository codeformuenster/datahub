FROM java:openjdk-7-jre

WORKDIR /opt/kibana
RUN curl -L https://download.elasticsearch.org/kibana/kibana/kibana-4.0.2-linux-x64.tar.gz \
  | tar -xz --directory /opt/kibana --strip-components 1

ENV PATH /opt/kibana/bin:$PATH

WORKDIR /kibana
COPY kibana.yml.env /kibana/
COPY run /kibana/

CMD ["/kibana/run"]
EXPOSE 5601
