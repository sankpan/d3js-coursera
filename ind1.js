const svg = d3.select("svg");
//svg.style('background-color', 'green');
const svgWidth = svg.attr("width");
const svgHeight = svg.attr("height");

const render = (data) => {
  const yValAccessor = (d) => d.country;
  const xValAccessor = (d) => d.population;

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, xValAccessor)])
    .range([0, 600]);

  const yScale = d3.scaleBand().domain(data.map(yValAccessor)).range([0, 400]);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", (d) => yScale(yValAccessor(d)))
    .attr("width", (d) => xScale(xValAccessor(d)))
    .attr("height", yScale.bandwidth());
};

d3.csv("data.csv").then((data) => {
  data.forEach((d) => {
    d.population = +d.population * 1000;
  });
  render(data);
});
// const face = svg
//     .append("circle")
//     .attr("r", `calc(${svgHeight} / 4`)
//     .attr("cx", `calc( ${svgWidth} / 2)`)
//     .attr("cy", `calc(${svgHeight} / 2`)
//     .attr('fill', 'yellow')
//     .attr('stroke', 'black');

// const leftEye = svg
//     .append("circle")
//     .attr("r", 25)
//     .attr("cx", `calc((${svgWidth} - 220px) / 2)`)
//     .attr("cy", `calc((${svgHeight} - 90px) / 2`)
//     .attr('fill', 'black');

// const rightEye = svg
//     .append("circle")
//     .attr("r", 25)
//     .attr("cx", `calc((${svgWidth} + 200px) / 2)`)
//     .attr("cy", `calc((${svgHeight} - 90px) / 2`)
//     .attr('fill', 'black');
