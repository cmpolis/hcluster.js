# hcluster.js

Agglomerative Hierarchical Clustering in JavaScript. (that plays nice with d3.js).

**[Demo + Blog Post](http://www.bytemuse.com/post/crayon-hierarchical-clustering/)**

*by [@ChrisPolis](http://twitter.com/chrispolis)*

## Usage

```
var colorCluster = hcluster()
  .distance('euclidean') // support for 'euclidean' and 'angular'
  .linkage('avg')        // support for 'avg', 'max' and 'min'
  .verbose(true)         // false by default
  .posKey('rgbValue')    // 'position' by default
  .onProgress(func)      // optional function to provide that will be called on each iteration step with the percent complete (0 to 1) as its first argument

  // pass in an array of objects w/ array values for 'position' or specified posKey()
  .data(colors);         // as an array of objects w/ array values for 'position'

// integrate into d3 layout.cluster
var cluster = d3.layout.cluster().size([200, 200]),
    nodes = cluster.nodes(colorCluster.tree()),
    links = cluster.links(nodes);

// get the tree, cut incertain ways
colorCluster.orderedNodes();  // returns array of leaves, ordered by tree structure
colorCluster.getClusters(k); // return k(2 to n) clusters of leaves
```

## License

MIT
