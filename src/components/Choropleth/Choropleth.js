import React, { useEffect, useRef } from "react";
import * as topojson from "topojson";
import * as d3 from "d3";
import sightings from "../../data/UFO_sightings.json";
import abbrevs from "../../data/abbrev.json";
import us from "../../data/counties-albers-10m.json";
import "./Choropleth.css";

const Choro = () => {
  const choroplethRef = useRef();

  useEffect(() => {
    //choropleth setup
    const states = topojson.feature(us, us.objects.states);
    const statemap = new Map(states.features.map((d) => [d.id, d]));
    const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
    const namemap = new Map(
      states.features.map((d) => [d.properties.name, d.id])
    );

    //get parent container dimensions
    const parentWidth = parseInt(
      d3.select("#choropleth-container").style("width")
    );
    const parentHeight = parseInt(
      d3.select("#choropleth-container").style("height")
    );

    // get and clean data
    const newSightings = filter(noState, sightings);
    const abbrevMap = new Map(abbrevs.map((d) => [d.Code, d.State]));
    const stateFrequency = newSightings.reduce(
      (a, { state }) => Object.assign(a, { [state]: (a[state] || 0) + 1 }),
      {}
    );

    const chartNew = UsStateChoropleth(newSightings, {
      id: (d) => namemap.get(abbrevMap.get(d.state)),
      value: (d) => stateFrequency[d.state],
      scale: d3.scaleQuantize,
      domain: [1, 100],
      range: d3.schemeBlues[8],
      title: (f, d) => `${f.properties.name}\n${stateFrequency[d.state]}`,
    });

    //US State Choropleth
    function UsStateChoropleth(
      data,
      {
        features = states,
        borders = statemesh,
        width = 975,
        height = 610,
        ...options
      } = {}
    ) {
      return Choropleth(data, { features, borders, width, height, ...options });
    }
  });

  // const d3nMap = require('@d3-node/choropleth-us-states');
  function filter(predicateFn, sightings) {
    if (length(sightings) === 0) return [];
    const firstItem = head(sightings);
    const filteredFirst = predicateFn(firstItem) ? [firstItem] : [];
    return concat(filteredFirst, filter(predicateFn, tail(sightings)));
  }

  function head(array) {
    return array[0];
  }

  function tail(array) {
    return array.slice(1);
  }

  function concat(array1, array2) {
    return array1.concat(array2);
  }

  function length(array) {
    return array.length;
  }

  function noState(sighting) {
    if (sighting.country === "USA") return true;
    else return false;
  }

  //Choropleth
  function Choropleth(
    data,
    {
      id = (d) => d.id, // given d in data, returns the feature id
      value = () => undefined, // given d in data, returns the quantitative value
      title, // given a feature f and possibly a datum d, returns the hover text
      format, // optional format specifier for the title
      scale = d3.scaleSequential, // type of color scale
      domain, // [min, max] values; input of color scale
      range = d3.interpolateBlues, // output of color scale
      width = 640, // outer width, in pixels
      height, // outer height, in pixels
      projection, // a D3 projection; null for pre-projected geometry
      features, // a GeoJSON feature collection
      featureId = (d) => d.id, // given a feature, returns its id
      borders, // a GeoJSON object for stroking borders
      outline = projection && projection.rotate ? { type: "Sphere" } : null, // a GeoJSON object for the background
      unknown = "#ccc", // fill color for missing data
      fill = "white", // fill color for outline
      stroke = "white", // stroke color for borders
      strokeLinecap = "round", // stroke line cap for borders
      strokeLinejoin = "round", // stroke line join for borders
      strokeWidth, // stroke width for borders
      strokeOpacity, // stroke opacity for borders
    } = {}
  ) {
    // Compute values.
    const N = d3.map(data, id);
    const V = d3.map(data, value).map((d) => (d == null ? NaN : +d));
    const Im = new d3.InternMap(N.map((id, i) => [id, i]));
    const If = d3.map(features.features, featureId);

    // Compute default domains.
    if (domain === undefined) domain = d3.extent(V);

    // Construct scales.
    const color = scale(domain, range);
    if (color.unknown && unknown !== undefined) color.unknown(unknown);

    // Compute titles.
    if (title === undefined) {
      format = color.tickFormat(100, format);
      title = (f, i) => `${f.properties.name}\n${format(V[i])}`;
    } else if (title !== null) {
      const T = title;
      const O = d3.map(data, (d) => d);
      title = (f, i) => T(f, O[i]);
    }

    // Compute the default height. If an outline object is specified, scale the projection to fit
    // the width, and then compute the corresponding height.
    if (height === undefined) {
      if (outline === undefined) {
        height = 400;
      } else {
        const [[x0, y0], [x1, y1]] = d3
          .geoPath(projection.fitWidth(width, outline))
          .bounds(outline);
        const dy = Math.ceil(y1 - y0),
          l = Math.min(Math.ceil(x1 - x0), dy);
        projection.scale((projection.scale() * (l - 1)) / l).precision(0.2);
        height = dy;
      }
    }

    // Construct a path generator.
    const path = d3.geoPath(projection);

    const svg = d3
      .select(choroplethRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "width: 100%; height: auto; height: intrinsic;");

    if (outline != null)
      svg
        .append("path")
        .attr("fill", fill)
        .attr("stroke", "currentColor")
        .attr("d", path(outline));

    svg
      .append("g")
      .selectAll("path")
      .data(features.features)
      .join("path")
      .attr("fill", (d, i) => color(V[Im.get(If[i])]))
      .attr("d", path)
      .append("title")
      .text((d, i) => title(d, Im.get(If[i])));

    if (borders != null)
      svg
        .append("path")
        .attr("pointer-events", "none")
        .attr("fill", "none")
        .attr("stroke", stroke)
        .attr("stroke-linecap", strokeLinecap)
        .attr("stroke-linejoin", strokeLinejoin)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-opacity", strokeOpacity)
        .attr("d", path(borders));

    return Object.assign(svg.node(), { scales: { color } });
  }

  return (
    <div id="choropleth-container" className="pb-32 pt-32">
      <svg ref={choroplethRef}></svg>
    </div>
  );
};

export default Choro;
