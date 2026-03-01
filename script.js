const data = [
  { name: "A", value: 1 },
  { name: "B", value: 5 },
  { name: "C", value: 8 },
  { name: "D", value: 10 }
];

const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = 400 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

const svg = d3.select("#bar-chart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleBand()
  .domain(data.map(d => d.name))
  .range([0, width])
  .padding(0.2);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .range([height, 0]);

svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x));

svg.append("g")
  .call(d3.axisLeft(y));

svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => x(d.name))
  .attr("y", d => y(d.value))
  .attr("width", x.bandwidth())
  .attr("height", d => height - y(d.value))
  .attr("fill", "steelblue");
