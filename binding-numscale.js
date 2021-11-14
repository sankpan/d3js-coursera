const container = d3.select("#container");
let clients;

dataLoaded = (data) => {
  clients = data;
  clients.sort((a, b) => d3.ascending(a.Name, b.Name));
  showData();
};

d3.csv("data.csv")
  .then(dataLoaded)
  .catch((err) => console.log(err));

addNewClient = () => {
  clients.push({ Name: "Test Name" });
  showData();
};

removeClient = () => {
  clients = clients.filter((d) => d.Name !== "Test Name");
  showData();
};

showData = () => {
  const max = d3.max(clients, (c) => c.Weight);
  const fnScale = d3.scaleLinear().domain([0, max]).range([0, 400]);
  const d3join = container.selectAll("div").data(clients);
  d3join
    .enter()
    .append("div")
    .style("width", (c) => fnScale(c.Weight) + "px")
    .style("margin", "5px")
    .style("background-color", "blue")
    .style("color", "white")
    .style("font-size", "20px")
    .html((d) => d.Name + "-- New" + " " + fnScale(d.Weight));
  d3join.html((d) => d.Name + "-- Existing" + " " + max);
  d3join.exit().remove();
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
