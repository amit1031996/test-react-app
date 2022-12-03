import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as d3Cloud from "d3-cloud";
import sightings from '../../data/UFO_sightings.json';
import './WordCloud.css';

const WordCloud = () => {
  const wordCloudRef = useRef();

  useEffect(() => {

    //get parent container dimensions
    const parentWidth = parseInt(d3.select("#wordcloud-container").style("width"));
    const parentHeight = parseInt(d3.select("#wordcloud-container").style("height"));

    // get and clean data
    const mergedText = mergeText(sightings);

    const stopwords = new Set("i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall,undefined,called,nuforc,enough,indicates,type,come,since,may,elects,since,around,saw,see,seen,thought,got,else,along,just".split(","));

    const splitWords = mergedText.split(/[\s./!-,]+/g)
    .map(w => w.replace(/^[“‘"\-—()\[\]{}]+/g, ""))
    .map(w => w.replace(/[;:.!?()\[\]{},"'’”\-—]+$/g, ""))
    .map(w => w.replace(/['’]s$/g, ""))
    .map(w => w.replace(/^[^a-z]*([a-z])[^a-z]*$/, ""))
    .map(w => w.substring(0, 30))
    .map(w => w.toLowerCase())
    .filter(w => w && !stopwords.has(w));

    WordCloud(splitWords, {
      width: parentWidth,
      height: parentHeight,
      maxWords: 200,
      fontFamily: "sans-serif", 
      fontScale: 1.2,
      textColor: "green",
    })
  });

  function WordCloud(
    text,
    {
      size = (group) => group.length, // Given a grouping of words, returns the size factor for that word
      word = (d) => d, // Given an item of the data array, returns the word
      marginTop = 0, // top margin, in pixels
      marginRight = 0, // right margin, in pixels
      marginBottom = 0, // bottom margin, in pixels
      marginLeft = 0, // left margin, in pixels
      width = 680, // outer width, in pixels
      height = 400, // outer height, in pixels
      maxWords = 250, // maximum number of words to extract from the text
      fontFamily = "sans-serif", // font family
      fontScale = 15, // base font size
      padding = 0, // amount of padding between the words (in pixels)
      rotate = 0, // a constant or function to rotate the words
      invalidation, // when this promise resolves, stop the simulation
    } = {}
  ) {
    const words =
      typeof text === "string" ? text.split(/\W+/g) : Array.from(text);

    const data = d3
      .rollups(words, size, (w) => w)
      .sort(([, a], [, b]) => d3.descending(a, b))
      .slice(0, maxWords)
      .map(([key, size]) => ({ text: word(key), size }));

    const svg = d3
      .select(wordCloudRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("font-family", fontFamily)
      .attr("text-anchor", "middle")
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const g = svg
      .append("g")
      .attr("transform", `translate(${marginLeft},${marginTop})`);

    const cloud = d3Cloud()
      .size([
        width - marginLeft - marginRight,
        height - marginTop - marginBottom,
      ])
      .words(data)
      .padding(padding)
      .rotate(rotate)
      .font(fontFamily)
      .fontSize((d) => Math.sqrt(d.size) * fontScale)
      .on("word", ({ size, x, y, rotate, text }) => {
        g.append("text")
          .attr("fill", "#101010")
          .attr("font-size", size)
          .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
          .text(text);
      });

    cloud.start();
    invalidation && invalidation.then(() => cloud.stop());
    return svg.node();
  }

  function mergeText(sightings){
    let merged_text;
    sightings.forEach(function(d) {
      merged_text += ` ${d.shape} ${d.text}`;
    });
    return merged_text;
  }

  return (
    <div id="wordcloud-container">
      <svg ref={wordCloudRef}></svg>
    </div>
  );
};

// const Barchart = ({data}) => {
//     const ref = useD3(
//         (svg) => {
//           const height = 500;
//           const width = 500;
//           const margin = { top: 20, right: 30, bottom: 30, left: 40 };

//           const x = d3
//             .scaleBand()
//             .domain(data.map((d) => d.year))
//             .rangeRound([margin.left, width - margin.right])
//             .padding(0.1);

//           const y1 = d3
//             .scaleLinear()
//             .domain([0, d3.max(data, (d) => d.sales)])
//             .rangeRound([height - margin.bottom, margin.top]);

//           const xAxis = (g) =>
//             g.attr("transform", `translate(0,${height - margin.bottom})`).call(
//               d3
//                 .axisBottom(x)
//                 .tickValues(
//                   d3
//                     .ticks(...d3.extent(x.domain()), width / 40)
//                     .filter((v) => x(v) !== undefined)
//                 )
//                 .tickSizeOuter(0)
//             );

//           const y1Axis = (g) =>
//             g
//               .attr("transform", `translate(${margin.left},0)`)
//               .style("color", "steelblue")
//               .call(d3.axisLeft(y1).ticks(null, "s"))
//               .call((g) => g.select(".domain").remove())
//               .call((g) =>
//                 g
//                   .append("text")
//                   .attr("x", -margin.left)
//                   .attr("y", 10)
//                   .attr("fill", "currentColor")
//                   .attr("text-anchor", "start")
//                   .text(data.y1)
//               );

//           svg.select(".x-axis").call(xAxis);
//           svg.select(".y-axis").call(y1Axis);

//           svg
//             .select(".plot-area")
//             .attr("fill", "steelblue")
//             .selectAll(".bar")
//             .data(data)
//             .join("rect")
//             .attr("class", "bar")
//             .attr("x", (d) => x(d.year))
//             .attr("width", x.bandwidth())
//             .attr("y", (d) => y1(d.sales))
//             .attr("height", (d) => y1(0) - y1(d.sales));
//         },
//         [data.length]
//       );
// const WordCloud = (
//   text,
//   {
//     size = (group) => group.length, // Given a grouping of words, returns the size factor for that word
//     word = (d) => d, // Given an item of the data array, returns the word
//     marginTop = 0, // top margin, in pixels
//     marginRight = 0, // right margin, in pixels
//     marginBottom = 0, // bottom margin, in pixels
//     marginLeft = 0, // left margin, in pixels
//     width = 640, // outer width, in pixels
//     height = 400, // outer height, in pixels
//     maxWords = 250, // maximum number of words to extract from the text
//     fontFamily = "sans-serif", // font family
//     fontScale = 15, // base font size
//     padding = 0, // amount of padding between the words (in pixels)
//     rotate = 0, // a constant or function to rotate the words
//     invalidation, // when this promise resolves, stop the simulation
//   }
// ) => {
//   const ref = useD3(
//     (svg) => {
//       const words =
//         typeof text === "string" ? text.split(/\W+/g) : Array.from(text);

//       const data = d3
//         .rollups(words, size, (w) => w)
//         .sort(([, a], [, b]) => d3.descending(a, b))
//         .slice(0, maxWords)
//         .map(([key, size]) => ({ text: word(key), size }));

//       svg = d3
//         .create("svg")
//         .attr("viewBox", [0, 0, width, height])
//         .attr("width", width)
//         .attr("font-family", fontFamily)
//         .attr("text-anchor", "middle")
//         .attr("ref", { ref })
//         .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
//       svg
//         .append("rect")
//         .attr("width", "100%")
//         .attr("height", "100%")
//         .attr("fill", "#313639");

//       const g = svg
//         .append("g")
//         .attr("transform", `translate(${marginLeft},${marginTop})`);

//       const cloud = d3Cloud()
//         .size([
//           width - marginLeft - marginRight,
//           height - marginTop - marginBottom,
//         ])
//         .words(data)
//         .padding(padding)
//         .rotate(rotate)
//         .font(fontFamily)
//         .fontSize((d) => Math.sqrt(d.size) * fontScale)
//         .on("word", ({ size, x, y, rotate, text }) => {
//           g.append("text")
//             .attr("fill", "#6CC417")
//             .attr("font-size", size)
//             .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
//             .text(text);
//         });

//       cloud.start();
//       invalidation && invalidation.then(() => cloud.stop());
//       return svg.node();
//     },
//     [text.length]
//   );

//   return (
//     <svg ref={ref}> </svg>
//   );
// };

export default WordCloud;
