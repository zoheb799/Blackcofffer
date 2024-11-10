import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const LikelihoodChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    d3.select(svgRef.current).selectAll('*').remove();

    const filteredData = data.filter(d => d.start_year && d.likelihood !== undefined);

    const svg = d3.select(svgRef.current)
      .attr('width', 700)
      .attr('height', 450)
      .style('background', '#f8f9fa')
      .style('border-radius', '12px')
      .style('padding', '25px')
      .style('box-shadow', '0px 6px 16px rgba(0, 0, 0, 0.15)');

    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const width = svg.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = svg.node().getBoundingClientRect().height - margin.top - margin.bottom;

    const x = d3.scaleLinear()
      .domain([d3.min(filteredData, d => d.start_year), d3.max(filteredData, d => d.start_year)])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.likelihood)])
      .range([height, 0]);

    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const line = d3.line()
      .x(d => x(d.start_year))
      .y(d => y(d.likelihood))
      .curve(d3.curveMonotoneX);

    chart.append('path')
      .data([filteredData])
      .attr('d', line)
      .style('fill', 'none')
      .style('stroke', '#2d7dd2')
      .style('stroke-width', 3)
      .style('opacity', 0)
      .transition()
      .duration(1200)
      .style('opacity', 1);

    chart.append('g')
      .selectAll('.dot')
      .data(filteredData)
      .enter().append('circle')
      .attr('r', 5)
      .attr('cx', d => x(d.start_year))
      .attr('cy', d => y(d.likelihood))
      .style('fill', '#2d7dd2')
      .transition()
      .duration(800)
      .attr('r', 7);

    chart.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat(d3.format('d')))
      .selectAll('text')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .style('fill', '#444');

    chart.append('g')
      .call(d3.axisLeft(y).ticks(6))
      .selectAll('text')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .style('fill', '#444');

    svg.append('text')
      .attr('x', width / 2 + margin.left)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .style('fill', '#2d7dd2')
      .text('Likelihood Over Time');

    svg.append('text')
      .attr('x', width / 2 + margin.left)
      .attr('y', height + margin.top + margin.bottom / 1.5)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text('Year');

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', margin.left / 2 - 10)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text('Likelihood');
      
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default LikelihoodChart;
