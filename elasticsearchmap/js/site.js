function init() {

  // initialize map object with view
  var map = L.map('map').setView([51.96, 7.62], 12);

  // add tile layer
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  var hostname = window.location.hostname;
  // initialize es client
  var client = new elasticsearch.Client({
    //host: hostname + ":9200"
    host: "104.238.158.210:9200"
  });

  var resultsLayer = new L.LayerGroup().addTo(map);

  client.ping({
    requestTimeout: 30000,

    // undocumented params are appended to the query string
    hello: "elasticsearch!"
  }, function (error) {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
      queryElasticWithBBox({target: map});
    }
  });

  var queryElasticWithBBox = function (event) {
    var bbox = event.target.getBounds();
    var northWest = bbox.getNorthWest();
    var southEast = bbox.getSouthEast();
    var bboxQuery = {"query":{"geo_shape": {"geometry": {"shape": {"type": "envelope","coordinates": [[northWest.lng, northWest.lat],[southEast.lng, southEast.lat]]}}}}};
    query(bboxQuery, function (hits) {
      resultsLayer.clearLayers();
      var only_polygons = hits.filter(function (h) { return h._source.geometry.type === "Polygon"; });
      // console.log(only_polygons)
      resultsLayer.addLayer(L.geoJson(only_polygons.map(function(hit) { return hit._source; })));

      var only_points = hits.filter(function (h) { return h._source.geometry.type === "Point" && h._source.geometry.coordinates[0] != null; });
      // console.log(only_points)
      // resultsLayer.addLayer(L.geoJson(only_points.map(function(hit) { return hit._source; })));
      for (p of only_points) {
        // console.log(p._source.geometry.coordinates)
        coord = [Number(p._source.geometry.coordinates[1]), Number(p._source.geometry.coordinates[0])];
        console.log(coord);

        // resultsLayer.addLayer(L.marker(p._source.geometry.coordinates));
        resultsLayer.addLayer(L.marker(coord));
      }
      // resultsLayer.addLayer(L.marker(only_points.map(function(hit) { return hit._source.geometry.coordinates; })));
      // L.marker([51.5, -0.09]).addTo(map);
    });
  };

  var query = function (queryBody, callback) {
    client.search({
      body: queryBody,
      size: 1500
    }).then(function (body) {
      var hits = body.hits.hits;
      callback(hits);
    }, function (error) {
      console.trace(error.message);
    });
  };

  map.on("moveend", queryElasticWithBBox);

}

window.onLoad = init();
