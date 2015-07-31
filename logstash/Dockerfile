FROM logstash:1.5

WORKDIR /opt/logstash
COPY conf /opt/logstash/conf

RUN bin/plugin install --no-verify fingerprint
RUN bin/plugin install logstash-input-http_poller

RUN curl -SOL https://github.com/codeformuenster/logstash-filter-geocoder/releases/download/v0.1.0/logstash-filter-geocoder-0.1.0.gem \
  && bin/plugin install logstash-filter-geocoder-0.1.0.gem
RUN curl -SOL https://github.com/codeformuenster/logstash-filter-split_featurecollection/releases/download/0.1.0/logstash-filter-split_featurecollection-0.1.0.gem \
  && bin/plugin install logstash-filter-split_featurecollection-0.1.0.gem

CMD ["bin/logstash", "-f", "/opt/logstash/conf/*.conf"]
EXPOSE 7001
