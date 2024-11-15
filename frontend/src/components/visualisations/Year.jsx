import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const YearChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const yearData = data.filter(item => item.start_year);

    const years = d3.rollup(
      yearData, 
      v => d3.mean(v, d => d.intensity), 
      d => d.start_year
    );

    const yearArray = Array.from(years, ([key, value]) => ({ key, value }));

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const x = d3.scaleBand()
      .domain(yearArray.map(d => d.key))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(yearArray, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3.line()
      .x(d => x(d.key) + x.bandwidth() / 2)
      .y(d => y(d.value));

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.append('path')
      .data([yearArray])
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line)
      .style('opacity', 0)  
      .transition()
      .duration(1000)  
      .style('opacity', 1);  // Fade in

    // Add the X axis with transition animation
    const xAxis = svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    xAxis.selectAll('text')
      .style('opacity', 0)  // Initially hidden
      .transition()
      .duration(1000)
      .style('opacity', 1);  // Fade in

    // Add the Y axis with transition animation
    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y))
      .selectAll('path, line')
      .style('opacity', 0)  // Initially hidden
      .transition()
      .duration(1000)
      .style('opacity', 1);  // Fade in

  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default YearChart;
