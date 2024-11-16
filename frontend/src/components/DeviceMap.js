import * as d3 from 'd3';
import React, { useRef, useEffect, useState } from 'react';
import { useDeviceContext } from './DeviceContent';
import { feature } from 'topojson-client';

const DeviceMap = ({ width = 1195, height = 430 }) => {
  const svgRef = useRef(null);
  const projectionRef = useRef(d3.geoMercator());
  const zoomRef = useRef(d3.zoom());
  const [zoomLevel, setZoomLevel] = useState(1);
  const [worldMap, setWorldMap] = useState(null);
  const { deviceCordinates, deviceColors, currentDeviceShowing, setCurrentDeviceShowing, devices, settenDaysDataAdded, setOneDaysDataAdded} = useDeviceContext();
  const data = deviceCordinates;

  // Fetch world map data
  useEffect(() => {
    fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
      .then(response => response.json())
      .then(topology => {
        const world = feature(topology, topology.objects.countries);
        setWorldMap(world);
      });
  }, []);

  useEffect(() => {
    if (!worldMap) return;

    const svg = d3.select(svgRef.current);
    const projection = projectionRef.current;

    svg.selectAll('*').remove();

    const mapGroup = svg.append('g');
    const bubbleGroup = svg.append('g');

    projection
      .scale(width / 2 / Math.PI)
      .center([0, 20])
      .translate([width / 2, height / 2]);

    const geoPathGenerator = d3.geoPath().projection(projection);

    mapGroup
      .selectAll('path')
      .data(worldMap.features)
      .join('path')
      .attr('d', geoPathGenerator)
      .attr('fill', '#e0e0e0')
      .attr('stroke', '#999')
      .attr('stroke-width', 0.5);

    const updateBubbles = (transform) => {
      const bubbles = bubbleGroup
        .selectAll('circle')
        .data(data.features);

      bubbles.enter()
        .append('circle')
        .merge(bubbles)
        .attr('cx', d => {
          const [x, y] = d3.geoCentroid(d);
          return transform.applyX(projection([x, y])[0]);
        })
        .attr('cy', d => {
          const [x, y] = d3.geoCentroid(d);
          return transform.applyY(projection([x, y])[1]);
        })
        .attr('r', d => Math.max(8 / transform.k, 5))
        .attr('fill', (d, i) => {
          // Use deviceColors array to get the color for this device
          // If deviceColors[i] is a function (state setter), we need to check its current value
          const color = typeof deviceColors[i] === 'function' 
            ? d3.select(`#device-${i}`).attr('fill') || 'blue' // fallback to blue
            : deviceColors[i];
          return color;
        })
        .attr('id', (d, i) => `device-${i}`) // Add ID to track devices
        .attr('fill-opacity', 0.6)
        .attr('stroke', 'black')
        .attr('stroke-width', d => Math.max(0.45, 1 / transform.k))
        .attr('data-index', (d, i) => i)
        // to select the device the user clicks on
        .on('click', (event, d) => {
          // Log the details of the clicked bubble
          if (d.properties && d.properties.name) {
            const parts = d.properties.name.split(' '); // Split the string by spaces
            const secondPart = parts[1]; // Access the second part of the name which is the device mac address
            const index = d3.select(event.currentTarget).attr('data-index');
            // console.log('Second part of the name:', secondPart);
            // console.log(currentDeviceShowing);
            // console.log("Device Clicked On: " + devices[index].device_mac_address);
            if(secondPart != currentDeviceShowing.device_mac_address){
              // console.log('This is the device on the charts up top');
              // console.log('Array index of the clicked bubble: ', index);
              // console.log(devices[index].device_mac_address);
              setCurrentDeviceShowing(devices[index].device_mac_address);
              settenDaysDataAdded(false);
              setOneDaysDataAdded(false);
            }
          }
    
        });

      bubbles.exit().remove();
    };

    const zoom = zoomRef.current
      .scaleExtent([1, 16])
      .on('zoom', (event) => {
        const transform = event.transform;
        setZoomLevel(transform.k);

        mapGroup.attr('transform', transform);
        updateBubbles(transform);
      });

    svg.call(zoom);

    // Initial render
    updateBubbles(d3.zoomIdentity);

    // Update colors when deviceColors changes
    const updateColors = () => {
      bubbleGroup.selectAll('circle')
        .attr('fill', (d, i) => {
          const color = typeof deviceColors[i] === 'function' 
            ? d3.select(`#device-${i}`).attr('fill') || 'blue'
            : deviceColors[i];
          return color;
        });
    };

    // Set up an observer to watch for deviceColors changes
    const intervalId = setInterval(updateColors, 1000); // Check every second

    // Tooltip behavior
    bubbleGroup.selectAll('circle')
      .on('mouseover', function(event, d) {
        const [x, y] = d3.pointer(event);
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', d => Math.max((12 / zoomLevel) * (d.count || 1), 8));

        svg.select('#tooltip').remove();
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', x + 15)
          .attr('y', y - 10)
          .attr('font-size', `${Math.max((12 / zoomLevel), 10)}px`)
          .attr('fill', 'black')
          .text(d.names ? d.names.join(', ') : d.properties.name || 'Unknown');
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', d => Math.max(8 / zoomLevel, 5));
        svg.select('#tooltip').remove();
      });

    // Cleanup
    return () => {
      clearInterval(intervalId);
    };

  }, [width, height, worldMap, data, deviceColors]);

  if (width === 0 || !worldMap) {
    return null;
  }

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      style={{
        backgroundColor: '#f8f9fa',
        width: '100%',
        height: '100%',
        display: 'block',
        maxWidth: '100%',
      }}
    />
  );
};

export default DeviceMap;