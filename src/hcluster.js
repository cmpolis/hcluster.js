//
//
//
var distance = require('distancejs'),
    clone = require('clone'),
    extend = require('extend');

//
var hcluster = function() {
  var data,
      clusters,
      treeRoot,
      posKey = 'position',
      distanceFn = distance.angularSimilarity,
      linkage = 'avg',
      verbose = false;

  //
  // simple constructor
  function clust() { }

  //
  // getters, setters a la D3

  // return data or set data and build tree
  clust.data = function(value) {
    if(!arguments.length) return data;

    // dataset will be mutated
    data = clone(value);
    clust._buildTree();
    return clust;
  };
  clust.posKey = function(value) {
    if(!arguments.length) return posKey;
    posKey = value;
    return clust;
  };
  clust.linkage = function(value) {
    if(!arguments.length) return linkage;
    linkage = value;
    return clust;
  };
  clust.verbose = function(value) {
    if(!arguments.length) return verbose;
    verbose = value;
    return clust;
  };

  //
  // get tree properties

  clust.orderedNodes = function() {
    if(!treeRoot) throw new Error('Need to passin data and build tree first.');

    return treeRoot.indexes.map(function(ndx) {
      return data[ndx];
    });
  };
  clust.tree = function() {
    if(!treeRoot) throw new Error('Need to passin data and build tree first.');
    return treeRoot;
  };

  //
  // math, matrix utility fn's

  // return unique pairs of indexes on n x n matrix above the diagonal
  clust._squareMatrixPairs = function(n) {
    var pairs = [];
    for(var row = 0; row < n; row++) {
      for(var col = row + 1; col < n; col++) {
        pairs.push([row, col]);
      }
    }
    return pairs;
  };

  // average distance between set of cluster indexes
  clust._avgDistance = function(setA, setB) {
    var distance = 0;
    for(var ndxA = 0; ndxA < setA.length; ndxA++) {
      for(var ndxB = 0; ndxB < setB.length; ndxB++) {
        distance += data[setA[ndxA]]._distances[setB[ndxB]];
      }
    }
    return distance / setA.length / setB.length;
  };

  //
  // tree construction

  //
  clust._buildTree = function() {
    if(!data || !data.length) throw new Error('Need `data` to build tree');

    //
    var node, clusterPairs, nearestPair, newCluster;
    clusters = [];
    tree = {};

    // calculate distances and build single datum clusters
    data.forEach(function(d, ndx) {
      d._distances = data.map(function(compareTo) {
        return distanceFn(d[posKey], compareTo[posKey]);
      });
      clusters.push(extend(d, {
        height: 1,
        indexes: [ndx]
      }));
    });

    // for tree of n leafs, n-1 linkages
    for(var iter = 0; iter < data.length - 1; iter++) {
      if(verbose) {
        console.log(iter + ': ' +
          clusters.map(function(c) { return c.indexes; }).join('|'));
      }

      // find closest pair of clusters, pair[2] is distance
      clusterPairs = clust._squareMatrixPairs(clusters.length);
      clusterPairs.forEach(function(pair) {
        pair[2] = clust['_'+linkage+'Distance'](
                  clusters[pair[0]].indexes,
                  clusters[pair[1]].indexes ); });
      nearestPair = clusterPairs
        .sort(function(pairA, pairB) { return pairB[2] - pairA[2]; })[0];
      newCluster = {
        name: 'Node ' + iter,
        height: nearestPair[2],
        indexes: clusters[nearestPair[0]].indexes.concat(clusters[nearestPair[1]].indexes),
        children: [ clusters[nearestPair[0]], clusters[nearestPair[1]] ],
      };
      if(verbose) console.log(newCluster);

      // remove merged nodes and push new node
      // clusters[nearestPair[0]].parent = newCluster;
      // clusters[nearestPair[1]].parent = newCluster;
      clusters.splice(Math.max(nearestPair[0], nearestPair[1]),1);
      clusters.splice(Math.min(nearestPair[0], nearestPair[1]),1);
      clusters.push(newCluster);
    }

    treeRoot = clusters[0];
  };

  return clust;
};

module.exports = hcluster;
