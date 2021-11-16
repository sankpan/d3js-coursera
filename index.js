drawScatterPlot = async () => {
  const dataset = await d3.json("weather-data.json");
  const xAccessorFn = (d) => +d.dewPoint;
  const yAccessorFn = (d) => +d.humidity;

  //scatter plot needs to be square so take the min dimension needed
  const minimumDim = d3.min([
    window.innerWidth * 0.9,
    window.innerHeight * 0.9,
  ]);
  //use width to define both dimensions
  const dimensions = {
    width: minimumDim,
    height: minimumDim,
    margin: {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50,
    },
  };
  //calculate dims of the bounds
  dimensions.boundsWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundsHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
  //create elements
  const wrapper = d3
    .select("#wrapper")
    .append("svg")
    .attr("height", dimensions.height)
    .attr("width", dimensions.width);
  //add chart area
  const chartBounds = wrapper
    .append("g")
    .style(
      "transform",
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    );
  //x scale with nice feature
  const xScaleFn = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAccessorFn))
    .range([0, dimensions.boundsWidth])
    .nice();
  //y scale - invert for the scale to run from bottom to top
  const yScaleFn = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessorFn))
    .range([dimensions.boundsHeight, 0])
    .nice();

  //sample circle
  // chartBounds
  //   .append("circle")
  //   .attr("cx", dimensions.boundsWidth / 2)
  //   .attr("cy", dimensions.boundsHeight / 2)
  //   .attr("r", 10);
  const chart = chartBounds
    .selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("cx", (d) => xScaleFn(xAccessorFn(d)))
    .attr("cy", (d) => yScaleFn(yAccessorFn(d)))
    .attr("r", 5)
    .attr("fill", "cornflowerblue");

  //x Axis
  const xAxisGenerator = d3.axisBottom(xScaleFn);
  const yAxisGenerator = d3.axisLeft(yScaleFn).ticks(4);
  //add
  const xAxis = chartBounds
    .append("g")
    .attr("transform", `translate(0, ${dimensions.boundsHeight})`)
    .call(xAxisGenerator);
  //add label
  xAxis
    .append("text")
    .attr("x", dimensions.boundsWidth / 2)
    .attr("y", dimensions.margin.bottom - 10)
    .attr("fill", "black")
    .style("font-size", "1.4em")
    .html("Dew point (&deg;F)");

  const yAxis = chartBounds.append("g").call(yAxisGenerator);
  yAxis
    .append("text")
    .html("Relative Humidity")
    .attr("x", -dimensions.boundsHeight / 2)
    .attr("y", -dimensions.margin.left + 20)
    .attr("fill", "black")
    .style("font-size", "1.4em")
    .style("transform", "rotate(-90deg)")
    .style("text-anchor", "middle");
};

drawScatterPlot();
