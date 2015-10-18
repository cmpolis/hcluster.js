//
//
//

// http://bl.ocks.org/shamangeorge/8029743
var colors = window.colors = [{"name":"Almond","position":[239,222,205]},{"name":"Antique Brass","position":[205,149,117]},{"name":"Apricot","position":[253,217,181]},{"name":"Aquamarine","position":[120,219,226]},{"name":"Asparagus","position":[135,169,107]},{"name":"Atomic Tangerine","position":[255,164,116]},{"name":"Banana Mania","position":[250,231,181]},{"name":"Beaver","position":[159,129,112]},{"name":"Bittersweet","position":[253,124,110]},{"name":"Black","position":[1,1,1]},{"name":"Blizzard Blue","position":[172,229,238]},{"name":"Blue","position":[31,117,254]},{"name":"Blue Bell","position":[162,162,208]},{"name":"Blue Gray","position":[102,153,204]},{"name":"Blue Green","position":[13,152,186]},{"name":"Blue Violet","position":[115,102,189]},{"name":"Blush","position":[222,93,131]},{"name":"Brick Red","position":[203,65,84]},{"name":"Brown","position":[180,103,77]},{"name":"Burnt Orange","position":[255,127,73]},{"name":"Burnt Sienna","position":[234,126,93]},{"name":"Cadet Blue","position":[176,183,198]},{"name":"Canary","position":[255,255,153]},{"name":"Caribbean Green","position":[28,211,162]},{"name":"Carnation Pink","position":[255,170,204]},{"name":"Cerise","position":[221,68,146]},{"name":"Cerulean","position":[29,172,214]},{"name":"Chestnut","position":[188,93,88]},{"name":"Copper","position":[221,148,117]},{"name":"Cornflower","position":[154,206,235]},{"name":"Cotton Candy","position":[255,188,217]},{"name":"Dandelion","position":[253,219,109]},{"name":"Denim","position":[43,108,196]},{"name":"Desert Sand","position":[239,205,184]},{"name":"Eggplant","position":[110,81,96]},{"name":"Electric Lime","position":[206,255,29]},{"name":"Fern","position":[113,188,120]},{"name":"Forest Green","position":[109,174,129]},{"name":"Fuchsia","position":[195,100,197]},{"name":"Fuzzy Wuzzy","position":[204,102,102]},{"name":"Gold","position":[231,198,151]},{"name":"Goldenrod","position":[252,217,117]},{"name":"Granny Smith Apple","position":[168,228,160]},{"name":"Gray","position":[149,145,140]},{"name":"Green","position":[28,172,120]},{"name":"Green Blue","position":[17,100,180]},{"name":"Green Yellow","position":[240,232,145]},{"name":"Hot Magenta","position":[255,29,206]},{"name":"Inchworm","position":[178,236,93]},{"name":"Indigo","position":[93,118,203]},{"name":"Jazzberry Jam","position":[202,55,103]},{"name":"Jungle Green","position":[59,176,143]},{"name":"Laser Lemon","position":[254,254,34]},{"name":"Lavender","position":[252,180,213]},{"name":"Lemon Yellow","position":[255,244,79]},{"name":"Macaroni and Cheese","position":[255,189,136]},{"name":"Magenta","position":[246,100,175]},{"name":"Magic Mint","position":[170,240,209]},{"name":"Mahogany","position":[205,74,76]},{"name":"Maize","position":[237,209,156]},{"name":"Manatee","position":[151,154,170]},{"name":"Mango Tango","position":[255,130,67]},{"name":"Maroon","position":[200,56,90]},{"name":"Mauvelous","position":[239,152,170]},{"name":"Melon","position":[253,188,180]},{"name":"Midnight Blue","position":[26,72,118]},{"name":"Mountain Meadow","position":[48,186,143]},{"name":"Mulberry","position":[197,75,140]},{"name":"Navy Blue","position":[25,116,210]},{"name":"Neon Carrot","position":[255,163,67]},{"name":"Olive Green","position":[186,184,108]},{"name":"Orange","position":[255,117,56]},{"name":"Orange Red","position":[255,43,43]},{"name":"Orange Yellow","position":[248,213,104]},{"name":"Orchid","position":[230,168,215]},{"name":"Outer Space","position":[65,74,76]},{"name":"Outrageous Orange","position":[255,110,74]},{"name":"Pacific Blue","position":[28,169,201]},{"name":"Peach","position":[255,207,171]},{"name":"Periwinkle","position":[197,208,230]},{"name":"Piggy Pink","position":[253,221,230]},{"name":"Pine Green","position":[21,128,120]},{"name":"Pink Flamingo","position":[252,116,253]},{"name":"Pink Sherbet","position":[247,143,167]},{"name":"Plum","position":[142,69,133]},{"name":"Purple Heart","position":[116,66,200]},{"name":"Purple Mountain's Majesty","position":[157,129,186]},{"name":"Purple Pizzazz","position":[254,78,218]},{"name":"Radical Red","position":[255,73,108]},{"name":"Raw Sienna","position":[214,138,89]},{"name":"Raw Umber","position":[113,75,35]},{"name":"Razzle Dazzle Rose","position":[255,72,208]},{"name":"Razzmatazz","position":[227,37,107]},{"name":"Red","position":[238,32,77]},{"name":"Red Orange","position":[255,83,73]},{"name":"Red Violet","position":[192,68,143]},{"name":"Robin's Egg Blue","position":[31,206,203]},{"name":"Royal Purple","position":[120,81,169]},{"name":"Salmon","position":[255,155,170]},{"name":"Scarlet","position":[252,40,71]},{"name":"Screamin' Green","position":[118,255,122]},{"name":"Sea Green","position":[159,226,191]},{"name":"Sepia","position":[165,105,79]},{"name":"Shadow","position":[138,121,93]},{"name":"Shamrock","position":[69,206,162]},{"name":"Shocking Pink","position":[251,126,253]},{"name":"Silver","position":[205,197,194]},{"name":"Sky Blue","position":[128,218,235]},{"name":"Spring Green","position":[236,234,190]},{"name":"Sunglow","position":[255,207,72]},{"name":"Sunset Orange","position":[253,94,83]},{"name":"Tan","position":[250,167,108]},{"name":"Teal Blue","position":[24,167,181]},{"name":"Thistle","position":[235,199,223]},{"name":"Tickle Me Pink","position":[252,137,172]},{"name":"Timberwolf","position":[219,215,210]},{"name":"Tropical Rain Forest","position":[23,128,109]},{"name":"Tumbleweed","position":[222,170,136]},{"name":"Turquoise Blue","position":[119,221,231]},{"name":"Unmellow Yellow","position":[255,255,102]},{"name":"Violet (Purple)","position":[146,110,174]},{"name":"Violet Blue","position":[50,74,178]},{"name":"Violet Red","position":[247,83,148]},{"name":"Vivid Tangerine","position":[255,160,137]},{"name":"Vivid Violet","position":[143,80,157]},{"name":"White","position":[255,255,255]},{"name":"Wild Blue Yonder","position":[162,173,208]},{"name":"Wild Strawberry","position":[255,67,164]},{"name":"Wild Watermelon","position":[252,108,133]},{"name":"Wisteria","position":[205,164,222]},{"name":"Yellow","position":[252,232,131]},{"name":"Yellow Green","position":[197,227,132]},{"name":"Yellow Orange","position":[255,174,66]}];

//
var colorCluster = window.colorCluster = hcluster()
  .distance('euclidean')
  // .verbose(true)
  .data(
    colors.sort(function(a,b) { return Math.random() - 0.5 })
  );

//
var height = 2000,
    width = 500;

//
var svg = d3.select('#container').append('svg')
  .attr('width', width + 300)
  .attr('height', height + 60)
  .append('g')
    .attr('transform', 'translate(30,30)');

//
var cluster = d3.layout.cluster()
  .size([height, width]);
var diagonal = d3.svg.diagonal()
  .projection(function(d) { return [d.y, d.x]; });

//
var nodes = cluster.nodes(colorCluster.tree()),
    links = cluster.links(nodes);

// http://bl.ocks.org/mbostock/2429963
var elbow = function (d, i) {
  return "M" + d.source.y + "," + d.source.x
    + "V" + d.target.x + "H" + d.target.y;
};

var x = d3.scale.linear()
  .domain(d3.extent(nodes, function(d) { return d.height; }))
  .range([width, 0]);
nodes.forEach(function(d,ndx) { d.y = x(d.height); });

//
var link = svg.selectAll('.link')
  .data(links)
  .enter().append('path')
    .attr('class', 'link')
    .attr('stroke', '#AAA')
    .attr('stroke-width', '1.5px')
    .attr('d', elbow);
var node = svg.selectAll('.node')
  .data(nodes)
  .enter().append('g')
    .attr('class', 'node')
    .attr('transform', function(d) { return 'translate('+d.y+','+d.x+')'; });
node.append('circle')
  .style('stroke', 'none')
  .style('fill', function(d) { return d.position ? 'rgb('+d.position.join(',')+')' : '#777'; })
  .attr('r', function(d) { return d.children ? 1.5 : 5.5 });
node.append('text')
  .attr('dx', 6)
  .attr('dy', 2)
  .text(function(d) { return d.children ? '' : d.name; });
