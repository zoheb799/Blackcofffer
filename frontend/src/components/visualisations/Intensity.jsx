// IntensityChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const IntensityChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Clear any existing SVG to handle re-renders
    d3.select(chartRef.current).selectAll('*').remove();

    // Aggregate data by sector
    const intensityBySector = d3.rollup(
      data,
      (v) => d3.sum(v, (d) => d.intensity),
      (d) => d.sector
    );

    const sectors = Array.from(intensityBySector, ([sector, intensity]) => ({ sector, intensity }));

    // Set chart dimensions and margins
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };

    // Set up scales
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

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Add bars with animation
    svg
      .selectAll('.bar')
      .data(sectors)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.sector))
      .attr('y', height - margin.bottom) // Start from bottom
      .attr('width', xScale.bandwidth())
      .attr('height', 0) // Start with height 0
      .attr('fill', 'steelblue')
      .transition() // Add transition
      .duration(800) // Duration of each bar’s growth
      .delay((d, i) => i * 100) // Delay between each bar
      .attr('y', (d) => yScale(d.intensity))
      .attr('height', (d) => yScale(0) - yScale(d.intensity));

    // Add X axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-40)')
      .style('text-anchor', 'end');

    // Add Y axis
    svg.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(yScale));

    // Add labels with animation
    svg
      .selectAll('.label')
      .data(sectors)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => xScale(d.sector) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.intensity) - 5)
      .attr('text-anchor', 'middle')
      .attr('opacity', 0) // Start with invisible labels
      .transition() // Add transition for labels
      .duration(800)
      .delay((d, i) => i * 100 + 400) // Delay so they appear after the bars
      .attr('opacity', 1) // Make labels visible
      .text((d) => d.intensity);
  }, [data]);

  return <div ref={chartRef}></div>;
};

export default IntensityChart;
