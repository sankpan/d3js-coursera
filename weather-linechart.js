//top and right would have smaller space, just to give chart some space
const dimensions = {
  width: window.innerWidth * 0.9,
  height: 400,
  margin: {
    top: 15,
    right: 15,
    bottom: 40,
    left: 60,
  },
};

drawLineChart = async () => {
  const dataset = await d3.json("weather-data.json");
  const yAccessorFn = (d) => +d.temperatureMax;
  const dateParser = d3.timeParse("%Y-%m-%d");
  const xAccessorFn = (d) => dateParser(d.date);
  //calculate the dimensions of the bounded space
  dimensions.widthBounds =
    dimensions.width - dimensions.margin.right - dimensions.margin.left;
  dimensions.heightBounds =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
  const wrapper = d3
    .select("#wrapper")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);
  const chartBounds = wrapper
    .append("g")
    .style(
      "transform",
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    );
  //y scale fn for temperatur
  const yScaleFn = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessorFn))
    .range([dimensions.heightBounds, 0]);
  //freezing temp placement
  const freezeTempStart = yScaleFn(32);
  const freezeTempRect = chartBounds
    .append("rect")
    .attr("x", 0)
    .attr("width", dimensions.widthBounds)
    .attr("y", freezeTempStart)
    .attr("height", dimensions.heightBounds - freezeTempStart)
    .attr("fill", "#e0f3f3");

  //x scale fn for dates
  const xScaleFn = d3
    .scaleTime()
    .domain(d3.extent(dataset, xAccessorFn))
    .range([0, dimensions.widthBounds]);

  //create axis using function
  const yAxisGenerator = d3.axisLeft(yScaleFn);
  //attach axis
  const yAxis = chartBounds.append("g").call(yAxisGenerator);
  //create x Axis
  const xAxisGenerator = d3.axisBottom(xScaleFn).ticks(6);
  //add axis
  const xAxis = chartBounds
    .append("g")
    .call(xAxisGenerator)
    .attr("transform", `translate(0, ${dimensions.heightBounds})`);
  //line generator
  const lineGenerator = d3
    .line()
    .x((d) => xScaleFn(xAccessorFn(d)))
    .y((d) => yScaleFn(yAccessorFn(d)));

  const line = chartBounds
    .append("path")
    .attr("d", lineGenerator(dataset))
    .attr("fill", "none")
    .attr("stroke", "#af9358")
    .attr("stroke-width", 2);
};

drawLineChart();
