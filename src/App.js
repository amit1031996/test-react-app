import ufo from "./ufo.png";
import "./App.css";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import React from "react";
import WordCloud from "./components/WordCloud/WordCloud";
import Choropleth from "./components/Choropleth/Choropleth";
import BeeswarmUFO from "./components/Beeswarm/beeswarm";
import Sketch from "./components/UFOMotionVisualization/sketch"
import aadiData from "./data/aadi/UFO sightings.json"
import UfoInSpace from "./components/UfoInSpace/ufo-in-space.js"

class App extends React.Component {
  render() {
    return (
      <>
        {/* <Nav /> */}
        {/* <div className="App">
          <header className="App-header">
            <img src={ufo} className="App-logo" alt="logo" />
            <p className="text-3xl hover:cursor-pointer transition duration-200 bg-green-500 hover:bg-green-600">
              This has been implemented using <code>tailwind.css</code>.
            </p>
            <a
              className="text-green-500"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gleep Glorp
            </a>
          </header>
        </div> */}
        <div className="App bg-[#313639] text-[#ffffff] pt-16">
          <div className="section">
            <h1 className="text-3xl font-bold">WordCloud Component</h1>
            <p>The wordcloud aggregates string data from witness testimonies.</p>
            <WordCloud />
          </div>
          <div className="section">
            <h1 className="text-3xl font-bold">Choropleth Component</h1>
            <p>
              The choropleth displays US states with colors corresponding to the
              number of documented UFO sightings
            </p>
            <Choropleth />
          </div>
          <div className="section">
            <h1 className="text-3xl font-bold">Beeswarm Component</h1>
            <p>
              The beeswarm chart displays the UFO sightings over time
            </p>
            <BeeswarmUFO data = {aadiData}/>
          </div>
          {/* <div className="section"> */}
            <h1 className="text-3xl font-bold">UFO database</h1>
            <p>
              Multidimensional representation of UFO data
            </p>
            <UfoInSpace/>
          {/* </div>  */}
          {/* <div className="section"> */}
            <h1 className="text-3xl font-bold">UFO flight Visualization</h1>
            <p>
              Mouse controlled visualization of a UFO's flight
            </p>
            <Sketch/>
          {/* </div> */}
        </div>
        {/* <Footer /> */}
      </>
    );
  }
}

export default App;
