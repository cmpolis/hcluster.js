//
//
//
var distance = require('distancejs'),
    extend = require('extend');

//
var hcluster = function() {
  var data,
      clusters,
      clustersGivenK,
      treeRoot,
      posKey = 'position',
      distanceName = 'angular',
      distanceFn = distance.angular,
      linkage = 'avg',
      verbose = false,
      onProgress = function() {};

  //
  // simple constructor
  function clust() { }

  //
  // getters, setters a la D3

  // return data or set data and build tree
  clust.data = function(value) {
    if(!arguments.length) return data;

    // dataset will be mutated
    data = value;
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
  clust.distance = function(value) {
    if(!arguments.length) return distanceName;
    distanceName = value;
    distanceFn = {
      angular: distance.angular,
      euclidean: distance.euclidean
    }[value] || distance.angular;
    return clust;
  }
  clust.onProgress = function(func) {
    if(!arguments.length) return onProgress;
    onProgress = func;
    return clust;
  }

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
  clust.getClusters = function(n) {
    if(!treeRoot) throw new Error('Need to passin data and build tree first.');
    if(n > data.length) throw new Error('n must be less than the size of the dataset');
    return clustersGivenK[data.length - n]
             .map(function(indexes) {
               return indexes.map(function(ndx) { return data[ndx]; });
             });
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

  // min distance between set of cluster indexes
  clust._minDistance = function(setA, setB) {
    var distances = [];
    for(var ndxA = 0; ndxA < setA.length; ndxA++) {
      for(var ndxB = 0; ndxB < setB.length; ndxB++) {
        distances.push(data[setA[ndxA]]._distances[setB[ndxB]]);
      }
    }
    return distances.sort()[0];
  };

  // max distance between set of cluster indexes
  clust._maxDistance = function(setA, setB) {
    var distances = [];
    for(var ndxA = 0; ndxA < setA.length; ndxA++) {
      for(var ndxB = 0; ndxB < setB.length; ndxB++) {
        distances.push(data[setA[ndxA]]._distances[setB[ndxB]]);
      }
    }
    return distances.sort()[distances.length-1];
  };

  //
  // tree construction

  //
  clust._buildTree = function() {
    if(!data || !data.length) throw new Error('Need `data` to build tree');

    //
    var node, clusterPairs, nearestPair, newCluster;
    clusters = [];
    clustersGivenK = [];
    tree = {};

    // calculate distances and build single datum clusters
    data.forEach(function(d, ndx) {
      d._distances = data.map(function(compareTo) {
        return distanceFn(d[posKey], compareTo[posKey]);
      });
      clusters.push(extend(d, {
        height: 0,
        indexes: [ndx]
      }));
    });

    // for tree of n leafs, n-1 linkages
    for(var iter = 0; iter < data.length - 1; iter++) {
      onProgress(iter / (data.length - 1));
      
      verbose && console.log(iter + ': ' +
          clusters.map(function(c) { return c.indexes; }).join('|'));

      // find closest pair of clusters, pair[2] is distance
      clusterPairs = clust._squareMatrixPairs(clusters.length);
      clusterPairs.forEach(function(pair) {
        pair[2] = clust['_'+linkage+'Distance'](
                  clusters[pair[0]].indexes,
                  clusters[pair[1]].indexes ); });
      nearestPair = clusterPairs
        .reduce(function(pairA, pairB) { return pairA[2] <= pairB[2] ? pairA : pairB; },
                [0, 0, Infinity]);
      newCluster = {
        name: 'Node ' + iter,
        height: nearestPair[2],
        indexes: clusters[nearestPair[0]].indexes.concat(clusters[nearestPair[1]].indexes),
        children: [ clusters[nearestPair[0]], clusters[nearestPair[1]] ],
      };
      verbose && console.log(newCluster);
      clustersGivenK.push(clusters.map(function(c) { return c.indexes; }));

      // remove merged nodes and push new node
      clusters.splice(Math.max(nearestPair[0], nearestPair[1]),1);
      clusters.splice(Math.min(nearestPair[0], nearestPair[1]),1);
      clusters.push(newCluster);
    }

    treeRoot = clusters[0];
    // clust._rebalanceTree(treeRoot);
  };

  // TODO: better rebalancing algo? ... this is just for presentation
  // rebalance after tree is built (b/c it is top down operation)
  // clust._rebalanceTree = function(node) {
  //   if(node.parent && node.parent.children && node.parent.children.length &&
  //      node.children && node.children.length) {
  //     var rightDistance = clust['_'+linkage+'Distance'](
  //       node.parent.children[1].indexes,
  //       node.children[0].indexes);
  //     var leftDistance = clust['_'+linkage+'Distance'](
  //       node.parent.children[1].indexes,
  //       node.children[1].indexes);

  //     // switch order of node.children
  //     if(leftDistance > rightDistance) {
  //       node.children = [ node.children[1], node.children[0] ];
  //       node.indexes = node.children[0].indexes.concat(node.children[1].indexes);
  //     }
  //   }
  //   if(node.children) {
  //     clust._rebalanceTree(node.children[0]);
  //     clust._rebalanceTree(node.children[1]);
  //   }
  // };

  return clust;
};

module.exports = hcluster;
