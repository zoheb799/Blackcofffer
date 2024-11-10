import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RelevanceChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const getRelevanceData = (data) => {
      const relevanceCounts = {};
      data.forEach((item) => {
        const relevance = item.relevance;
        if (relevanceCounts[relevance]) {
          relevanceCounts[relevance] += 1;
        } else {
          relevanceCounts[relevance] = 1;
        }
      });

      return Object.keys(relevanceCounts).map((key) => ({
        name: `Relevance ${key}`,
        value: relevanceCounts[key],
      }));
    };

    const relevanceData = getRelevanceData(data);

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value((d) => d.value);

    const arc = d3.arc().outerRadius(radius - 10).innerRadius(0);

    const labelArc = d3.arc().outerRadius(radius).innerRadius(radius - 40);

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const slices = svg
      .selectAll('.arc')
      .data(pie(relevanceData))
      .enter()
      .append('g')
      .attr('class', 'arc');

    slices
      .append('path')
      .attr('d', arc)
      .style('fill', (d, i) => color(i))
      .attr('opacity', 0) 
      .transition()
      .duration(1000)
      .attr('opacity', 1)
      .attrTween('d', function (d) {
        const i = d3.interpolate(
          { startAngle: 0, endAngle: 0 },
          { startAngle: d.startAngle, endAngle: d.endAngle }
        );
        return function (t) {
          return arc(i(t)); 
        };
      });

    slices
      .append('text')
      .attr('transform', (d) => `translate(${labelArc.centroid(d)})`)
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .text((d) => d.data.name)
      .attr('opacity', 0) 
      .transition()
      .duration(1000) 
      .attr('opacity', 1); 
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default RelevanceChart;
