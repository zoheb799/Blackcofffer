import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CityIndex = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.end_year))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)])
      .nice()
      .range([height, 0]);

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y));

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.end_year))
      .attr('y', height) 
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', (d, i) => d3.schemeCategory10[i % 10])
      .transition()
      .duration(1000) 
      .attr('y', d => y(d.intensity))
      .attr('height', d => height - y(d.intensity));
    svg.selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => x(d.end_year) + x.bandwidth() / 2) 
      .attr('y', height) 
      .attr('text-anchor', 'middle')
      .style('fill', '#333')
      .style('font-size', '12px')
      .text(d => d.intensity)
      .transition()
      .duration(1000) 
      .attr('y', d => y(d.intensity) - 5); 

  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};
export default CityIndex;
