const KG_PER_POUND = 0.45;
const METER_PER_INCH = 0.0254;

const container = d3.select("#container");

dataLoaded = (data) => {
  data.sort((a, b) => d3.ascending(a.Name, b.Name));
  showData(data);
};

d3.csv("data.csv")
  .then(dataLoaded)
  .catch((err) => console.log(err));

showData = (data) => {
  data.map((d) => (d.BMI = getBMI(d)));
  data.forEach((client) => {
    write(client.Name + "," + client.BMI);
  });
  write('----------------------------');
  const meanBMI = d3.mean(data, d => d.BMI);
  write('Mean BMI is: ' + meanBMI);
};

write = (text) => {
  container
    .append("div")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .html(text);
};

getBMI = (client) => {
  let weightInKg = client.Weight * KG_PER_POUND;
  let heightInMeter = client.Height * METER_PER_INCH;
  let BMI = weightInKg / heightInMeter / heightInMeter;
  return BMI;
};
