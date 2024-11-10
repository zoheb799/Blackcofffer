import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RegionChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 600;
    const height = 500;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    // Clear any previous SVG elements
    d3.select(svgRef.current).selectAll('*').remove();

    // Group data by sector and sum intensity within each sector
    const sectorData = Array.from(
      d3.group(data, d => d.sector),
      ([key, values]) => ({ sector: key, intensity: d3.sum(values, v => v.intensity) })
    );

    // Set up color scale
    const color = d3.scaleOrdinal()
      .domain(sectorData.map(d => d.sector))
      .range(d3.schemeCategory10);

    // Create SVG container
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Create the pie and arc generators
    const pie = d3.pie().value(d => d.intensity);
    const arc = d3.arc().innerRadius(radius - 100).outerRadius(radius);
    const arcHover = d3.arc().innerRadius(radius - 100).outerRadius(radius + 10);

    // Bind data to pie chart and create arcs with growing animation
    svg.selectAll('path')
      .data(pie(sectorData))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.sector))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .transition()
      .duration(1000)
      .attrTween('d', function(d) {
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function(t) {
          return arc(i(t));
        };
      });

    // Hover effect for each slice
    svg.selectAll('path')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', arcHover)  // Expand the slice on hover
          .style('opacity', 0.8);
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', arc)  // Revert to original size
          .style('opacity', 1);
      });

    // Add text labels for each slice with fade-in effect
    svg.selectAll('text')
      .data(pie(sectorData))
      .enter()
      .append('text')
      .text(d => d.data.sector)
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', 12)
      .style('fill', 'white')
      .style('opacity', 0) // Initial opacity is 0
      .transition()
      .delay(1000)
      .duration(500)
      .style('opacity', 1); // Fade-in effect for labels
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default RegionChart;
