import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const IntensityChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    d3.select(chartRef.current).selectAll('*').remove();

    const intensityBySector = d3.rollup(
      data,
      (v) => d3.sum(v, (d) => d.intensity),
      (d) => d.sector
    );

    const sectors = Array.from(intensityBySector, ([sector, intensity]) => ({ sector, intensity }));

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };

    const xScale = d3
      .scaleBand()
      .domain(sectors.map((d) => d.sector))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(sectors, (d) => d.intensity)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    svg
      .selectAll('.bar')
      .data(sectors)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.sector))
      .attr('y', height - margin.bottom) 
      .attr('width', xScale.bandwidth())
      .attr('height', 0) 
      .attr('fill', 'steelblue')
      .transition() 
      .duration(800) 
      .delay((d, i) => i * 100) 
      .attr('y', (d) => yScale(d.intensity))
      .attr('height', (d) => yScale(0) - yScale(d.intensity));

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-40)')
      .style('text-anchor', 'end');

    svg.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(yScale));

    svg
      .selectAll('.label')
      .data(sectors)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => xScale(d.sector) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.intensity) - 5)
      .attr('text-anchor', 'middle')
      .attr('opacity', 0) 
      .transition() 
      .duration(800)
      .delay((d, i) => i * 100 + 400) 
      .attr('opacity', 1) 
      .text((d) => d.intensity);
  }, [data]);

  return <div ref={chartRef}></div>;
};

export default IntensityChart;
