FROM elasticsearch:1.7
COPY config/templates /usr/share/elasticsearch/config/templates

VOLUME /usr/share/elasticsearch/data
CMD ["elasticsearch", "--http.cors.enabled=true"]
EXPOSE 9200
