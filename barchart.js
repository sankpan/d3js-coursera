const container = d3.select("#body");
let clients;

dataLoaded = (data) => {
  clients = data;
  clients.sort((a, b) => d3.ascending(a.Name, b.Name));
  showData();
};

d3.csv("data.csv")
  .then(dataLoaded)
  .catch((err) => console.log(err));

showData = () => {
  const max = d3.max(clients, (c) => c.Weight);
  const fnXScale = d3.scaleLinear().domain([0, max]).range([0, 400]);
  const names = clients.map((d) => d.Name);
  const fnYScale = d3.scaleBand().domain(names).range([0, 150]).padding(0.1);
  const d3join = container.selectAll("rect").data(clients);
  d3join
    .enter()
    .append("rect")
    .style("width", (c) => fnXScale(c.Weight) + "px")
    .style("fill", "blue")
    .style("color", "white")
    .style("height", fnYScale.bandwidth())
    .attr("y", (c) => fnYScale(c.Name));

  //axis
  const xAxis = d3
    .axisBottom(fnXScale)
    .ticks(5)
    .tickFormat((t) => t + " lb");
  d3.select("#xAxis").attr("transform", "translate(50, 180)").call(xAxis);
  const yAxis = d3.axisLeft(fnYScale);
  d3.select("#yAxis").attr("transform", "translate(50, 30)").call(yAxis);
};

// write = (text) => {
//   container
//     .append("div")
//     .style("font-size", "20px")
//     .style("font-weight", "bold")
//     .html(text);
// };

// getBMI = (client) => {
//   let weightInKg = client.Weight * KG_PER_POUND;
//   let heightInMeter = client.Height * METER_PER_INCH;
//   let BMI = weightInKg / heightInMeter / heightInMeter;
//   return BMI;
// };
