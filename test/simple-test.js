//
//
//

//
var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect;
var hcluster = require('../src/hcluster'),
    colors = require('./colorset');

//
describe('Hcluster Algorithm with simple case', function() {

  //
  describe('simple color dataset', function() {
    before(function() { this.set = colors.complete; });

    it('builds the correct tree', function() {
      var clusters = hcluster()
        .verbose(false)
        .data(this.set);
      console.log(
        clusters.orderedNodes()
          .map(function(d) { return d.name; })
          .join(',')
      );
    });
  });
});
