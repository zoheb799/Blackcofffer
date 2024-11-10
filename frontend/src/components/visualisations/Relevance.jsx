import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RelevanceChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    // Function to extract relevance data and calculate the frequency of each relevance score
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

    // Get the relevance data
    const relevanceData = getRelevanceData(data);

    // Set up the SVG canvas dimensions
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Set up the color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Create the pie chart
    const pie = d3.pie().value((d) => d.value);

    // Set up the arc generator
    const arc = d3.arc().outerRadius(radius - 10).innerRadius(0);

    // Set up the label arc generator
    const labelArc = d3.arc().outerRadius(radius).innerRadius(radius - 40);

    // Create the SVG element
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Create the pie chart slices
    const slices = svg
      .selectAll('.arc')
      .data(pie(relevanceData))
      .enter()
      .append('g')
      .attr('class', 'arc');

    // Add the pie chart path with animation
    slices
      .append('path')
      .attr('d', arc)
      .style('fill', (d, i) => color(i))
      .attr('opacity', 0) // Initial opacity is set to 0 for animation
      .transition()
      .duration(1000) // Duration for the animation (1 second)
      .attr('opacity', 1) // Set opacity to 1 to make the path visible
      .attrTween('d', function (d) {
        const i = d3.interpolate(
          { startAngle: 0, endAngle: 0 },
          { startAngle: d.startAngle, endAngle: d.endAngle }
        );
        return function (t) {
          return arc(i(t)); // Animate the arc path
        };
      });

    // Add labels with animation
    slices
      .append('text')
      .attr('transform', (d) => `translate(${labelArc.centroid(d)})`)
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .text((d) => d.data.name)
      .attr('opacity', 0) // Initial opacity is set to 0 for animation
      .transition()
      .duration(1000) // Duration for the animation (1 second)
      .attr('opacity', 1); // Set opacity to 1 to make the text visible

  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default RelevanceChart;
