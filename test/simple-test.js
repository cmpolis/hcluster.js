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
    before(function() { this.set = colors.simple; });

    it('builds the correct tree', function() {
      var clusters = hcluster()
        .verbose(true)
        .data(this.set);
      console.log(clusters);
    });
  });
});
