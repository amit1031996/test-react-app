import React, { useState, useRef } from 'react';
import * as d3 from 'd3';
import data from '../../data/aadi/UFO sightings.json';
import { useEffect } from 'react';

const BeeswarmUFO = ({ data }) => {

  const d3Chart = useRef();
  
  useEffect(() => {
    if (data) {
      let sightings = data.map(p => {
        return {
          ...p,
          posted: new Date(p.posted)
        }
      })
      BeeswarmChart(sightings, {
        x: d => d.posted,
        label: "Date →",
        type: d3.scaleLinear, // try d3.scaleLog
        title: d => `${d.summary}: ${d.shape}\n${d.posted.toLocaleString("en")}.`,
        width:640
      })
    }

  }, [data])

  const BeeswarmChart = (data, {
    value = d => d, // convenience alias for x
    label, // convenience alias for xLabel
    type = d3.scaleTime, // convenience alias for xType
    domain, // convenience alias for xDomain
    x = value, // given d in data, returns the quantitative x value
    title = null, // given d in data, returns the title
    group, // given d in data, returns an (ordinal) value for color
    groups, // an array of ordinal values representing the data groups
    colors = d3.schemeTableau10, // an array of color strings, for the dots
    radius = 3, // (fixed) radius of the circles
    padding = 1.5, // (fixed) padding between the circles
    marginTop = 10, // top margin, in pixels
    marginRight = 20, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 20, // left margin, in pixels
    width = 640, // outer width, in pixels
    height, // outer height, in pixels
    xType = type, // type of x-scale, e.g. d3.scaleLinear
    xLabel = label, // a label for the x-axis
    xDomain = domain, // [xmin, xmax]
    xRange = [marginLeft, width - marginRight] // [left, right]
  } = {}) => {
    const X = d3.map(data, x);
  const T = title == null ? null : d3.map(data, title);
  
  // Compute which data points are considered defined.
  const I = d3.range(X.length).filter(i => !isNaN(X[i]));

  // Compute default domains.
  if (xDomain === undefined) xDomain = d3.extent(X);
  const xScale = d3.scaleTime(xDomain, xRange);
  console.log(xScale);
  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);   
    
   const Y = dodge(I.map(i => xScale(X[i])), radius * 2 + padding);

    // Compute the default height;
    if (height === undefined) height = (d3.max(Y, Math.abs) + radius + padding) * 2 + marginTop + marginBottom;

    // Given an array of x-values and a separation radius, returns an array of y-values.
    function dodge(X, radius) {
      const Y = new Float64Array(X.length);
      const radius2 = radius ** 2;
      const epsilon = 1e-3;
      let head = null, tail = null;
    
      // Returns true if circle ⟨x,y⟩ intersects with any circle in the queue.
      function intersects(x, y) {
        let a = head;
        while (a) {
          const ai = a.index;
          if (radius2 - epsilon > (X[ai] - x) ** 2 + (Y[ai] - y) ** 2) return true;
          a = a.next;
        }
        return false;
      }

      // Place each circle sequentially.
      for (const bi of d3.range(X.length).sort((i, j) => X[i] - X[j])) {
  
        // Remove circles from the queue that can’t intersect the new circle b.
        while (head && X[head.index] < X[bi] - radius2) head = head.next;
    
        // Choose the minimum non-intersecting tangent.
        if (intersects(X[bi], Y[bi] = 0)) {
          let a = head;
          Y[bi] = Infinity;
          do {
            const ai = a.index;
            let y1 = Y[ai] + Math.sqrt(radius2 - (X[ai] - X[bi]) ** 2);
            let y2 = Y[ai] - Math.sqrt(radius2 - (X[ai] - X[bi]) ** 2);
            if (Math.abs(y1) < Math.abs(Y[bi]) && !intersects(X[bi], y1)) Y[bi] = y1;
            if (Math.abs(y2) < Math.abs(Y[bi]) && !intersects(X[bi], y2)) Y[bi] = y2;
            a = a.next;
          } while (a);
        }
    
        // Add b to the queue.
        const b = {index: bi, next: null};
        if (head === null) head = tail = b;
        else tail = tail.next = b;
      }
    
      return Y;
    }
    const svg = d3.select(d3Chart.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "width: 40%; height: auto; height: intrinsic;");

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis)
      .call(g => g.append("text")
          .attr("x", width)
          .attr("y", marginBottom - 4)
          .attr("fill", "white")
          .attr("text-anchor", "end")
          .text(xLabel));

  const dot = svg.append("g")
    .selectAll("circle")
    .data(I)
    .join("circle")
      .attr("cx", i => xScale(X[i]))
      .attr("fill", "white")
      .attr("cy", i => (marginTop + height - marginBottom) / 2 + Y[i])
      .attr("r", radius);

  if (T) dot.append("title")
      .text(i => T[i]);

  return svg.node();
  }

  return (
    <div id="beeswax-container">
      <svg ref={d3Chart}></svg>
    </div>
  )

}


export default BeeswarmUFO;