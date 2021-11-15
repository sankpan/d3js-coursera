let body = d3.select("#body");

function showData(data) {
  let bodyHeight = 200;
  let bodyWidth = 400;

  data = data.map((d) => ({
    country: d.country,
    sales: +d.sales,
  }));

  //start with converting data to pie
  const pieGenFn = d3.pie().value((d) => d.sales);
  //function to generate color scale for pie
  const colorScaleFn = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.country))
    .range(d3.schemeGreens[5]);
  //create arc
  const arc = d3
    .arc()
    .outerRadius(bodyHeight / 2)
    .innerRadius(bodyHeight / 4);
  //get arc group
  const arcg = body.selectAll(".arc").data(pieGenFn(data)).enter().append("g");
  arcg
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => colorScaleFn(d.data.country));
}

d3.csv("dataArc.csv").then(showData);
