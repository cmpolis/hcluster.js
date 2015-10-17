//
//
//
var d3a = require('d3-arrays'),
    distance = require('distancejs'),
    clone = require('clone'),
    extend = require('extend');

//
function hcluster() {
  var data, clusters, tree, posKey, distanceFn, linkage;

  // simple constructor
  function clust(opts) {
    linkage = opts.linkage || 'avg';
    posKey = opts.posKey || 'position';
    distanceFn = opts.distanceFn || distance.angularSimilarity;
  }

  // return data or set data and build tree
  clust.data = function(value) {
    if(!arguments.length) return data;

    // dataset will be mutated
    data = clone(value);
    clust._buildTree();
  };

  //
  clust._buildTree = function() {

    // calculate distances and build single datum clusters
    data.forEach(function(d) {
      d._distances = data.map(function(compareTo) {
        return distanceFn(d[posKey], compareTo[posKey]);
      });

      clusters.push(extend(d, {
        indexes: [ndx]
      });
    });

  };

  return clust;
};

module.exports = hcluster;
