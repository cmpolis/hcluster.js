# hcluster.js

Agglomerative Hierarchical Clustering in JavaScript. (that plays nice with d3.js).

*by [@ChrisPolis](http://twitter.com/chrispolis)*

## Usage

```
var colorCluster = hcluster()
  .distance('euclidean') // support for 'euclidean' and 'angular'
  .linkage('avg')        // support for 'avg' ONLY for now
  .verbose(true)         // false by default
  .posKey('rgbValue')    // 'position' by default

  // pass in an array of objects w/ array values for 'position' or specified posKey()
  .data(colors);         // as an array of objects w/ array values for 'position'

// integrate into d3 layout.cluster
var cluster = d3.layout.cluster().size([200, 200]),
    nodes = cluster.nodes(colorCluster.tree()),
    links = cluster.links(nodes);
```

## License

MIT
