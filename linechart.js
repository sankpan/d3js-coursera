let body = d3.select("#body");

showData = (data) => {
  let bodyHeight = 200;
  let bodyWidth = 400;

  //date object and price float
  data = data.map((d) => ({
    date: new Date(d.date),
    price: +d.price,
  }));

  let maxValue = d3.max(data, (d) => d.price);
  let yScale = d3.scaleLinear().domain([0, maxValue]).range([bodyHeight, 0]);
  body.append("g").call(d3.axisLeft(yScale));

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.date))
    .range([0, bodyWidth]);
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b"));

  body.append("g").attr("transform", `translate(0, ${bodyHeight})`).call(xAxis);

  const chartLine = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.price))
    .defined((d) => !!d.price);

  body.append("path").datum(data).attr("d", chartLine).attr("class", "line");
};

d3.csv("dataLine.csv").then(showData);
