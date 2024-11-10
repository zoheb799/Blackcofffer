import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CountryChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const countryData = data.filter(item => item.country && item.intensity);

    const xScale = d3.scaleBand()
      .domain(countryData.map(d => d.country))
      .range([0, width])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(countryData, d => d.intensity) || 0])
      .nice()
      .range([height, 0]);

    const colorScale = d3.scaleOrdinal()
      .domain(countryData.map(d => d.country))
      .range(d3.schemeCategory10);

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const area = d3.area()
      .x(d => xScale(d.country) + xScale.bandwidth() / 2)
      .y0(height)
      .y1(d => yScale(d.intensity))
      .curve(d3.curveCatmullRom); 
    svg.append('path')
      .datum(countryData)
      .attr('fill', 'steelblue')
      .attr('stroke', 'none')
      .attr('d', area)
      .attr('opacity', 0)
      .transition()
      .duration(1500)
      .attr('opacity', 0.7);

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '12px');

    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale).ticks(6));

    // Add tooltips on hover
    svg.selectAll('.dot')
      .data(countryData)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(d.country) + xScale.bandwidth() / 2)
      .attr('cy', d => yScale(d.intensity))
      .attr('r', 5)
      .attr('fill', d => colorScale(d.country))
      .attr('opacity', 0)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr('opacity', 1);

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default CountryChart;
