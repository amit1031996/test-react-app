import ufo from "./ufo.png";
import "./App.css";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import React, { useRef } from "react";
import WordCloud from "./components/WordCloud/WordCloud";
import Choropleth from "./components/Choropleth/Choropleth";
import ChoroplethFood from "./components/Choropleth/ChoroplethFood";
import BeeswarmUFO from "./components/Beeswarm/beeswarm";
import Sketch from "./components/UFOMotionVisualization/sketch";
import aadiData from "./data/aadi/UFO sightings.json";
import UfoInSpace from "./components/UfoInSpace/ufo-in-space.js";
import bgWhite from "./assets/bg-white.jpg";
import bgBlack from "./assets/bg-black.jpg";
import bgGreen from "./assets/bg-green.jpg";
import cowHero from "./assets/cow-hero.png";
import cowBlur from "./assets/cow-blur.png";
import alienHand from "./assets/hand.png";
import boorgirImg from "./assets/boorgir.png";
import cowHand from "./assets/cow_hand.png";
import  Jitter  from "./components/animation/jitter";
import UFOinPhone from "./assets/UfoInPhone.png";
import ufologo from "./assets/ufo.png";

class App extends React.Component {
  render() {
    //const beeswarmSection = useRef("Beeswwarm");
    
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
        <div className="App bg-[#101010]">
          <div
            className="section relative bg-[#dadada] text-[#101010]"
            id="hero-section"
          >
            <img src = {ufologo} className="absolute z-50 object-scale-down h-10 w-10 top-2 left-6"></img>
            <span className="absolute z-50 top-2 right-6">
              <p>
             Earth Date : {new Date().toISOString().split('T')[0]}
             </p>
            </span>
            <div className="bg">
              <img src={bgWhite}></img>
            </div>
            <div id="cow-container">
              <img src={cowBlur}></img>
              <img src={cowHero}></img>
              <img src={cowBlur}></img>
            </div>
            <div className="content">
              <h1 className="text-8xl font-bold animate-pulse">search continues</h1>
             
              
              <p>
                <Jitter css="">
                but humans... they catch on
                </Jitter>
              </p>
            </div>
          </div>
          <div
            className="section text-center relative bg-[#101010] text-[#19B548]"
            id="beeswax-section"
          >
            <img src = {UFOinPhone} className="origin-bottom -rotate-12 absolute left-8 top-1/3 z-50 h-80 w-96 object-scale-down"></img>
            <div className="bg">
              <img src={bgBlack}></img>
            </div>
            <div className="content ">
              <br/>
              <br />
              <br />
              <h1 className="text-4xl font-bold">2014, not a good year</h1>
              <p className="w-2/3 text-center mx-auto">
                Really “dropped a ball”, as humans like to say. Suspect rising
                popularity of “Instagram” to be reason. Good thing mothership
                sent new signiture cloaking update.
              </p>
            </div>
            <br />
            <br />
            <br />
            <BeeswarmUFO data={aadiData} />
            <br />
            <br />
            <br />
          </div>
          <div
            className="section bg-[#017A24] text-[#ffffff]"
            id="wordcloud-section"
          >
            <div className="bg">
              <img src={bgGreen}></img>
            </div>
            <div className="content">
              <br/>
              <br/>
              <br/>
              <h1 className="text-4xl font-bold">
                Still unaware of intentions
              </h1>
              <p className="w-2/3 text-center mx-auto">
                Standard issue Telepathy Radar<sup>TM</sup> has been a good information
                gathering resource. Witness testimonies not a cause for concern
                (for now)
              </p>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br/>
            <br/>
            <WordCloud />
          </div>
          <div
            className="section bg-[#DADADA] text-[#101010]"
            id="database-section"
          >
            <div className="bg">
              <img src={bgWhite}></img>
            </div>
            <div className="content">
              <br/>
              <br/>
              <br/>
              <h1 className="text-4xl font-bold">UFO sightings compendium</h1>
              {/* <p>
              The beeswarm chart displays the UFO sightings over time
            </p> */}
              <UfoInSpace />
            </div>
          </div>
          <div
            className="section bg-[#101010] text-[#19B548]"
            id="choro-section"
          >
            <div className="bg">
              <img src={bgBlack}></img>
            </div>
            <div className="content">
              <br/>
              <br/>
              <br/>
              <h1 className="text-4xl font-bold">An alternative strategy?</h1>
              <p>
                Cows at source probably the key? Search sectors updated to
                popular fast food chains
              </p>
              <div id="choropleth-parent">
                <Choropleth />
                <ChoroplethFood />
              </div>
            </div>
          </div>
          <div id="final-section" className="text-[#19B548]">
            <div className="content">
              <br/>
              <br/>
              <br/>
              <h1 className="text-4xl font-bold">
                We are so close. We will find the answer.
              </h1>
              <p>Why are hamburgers so delicious?</p>
            </div>
            <div id="final-images">
              <img id="final-hand" src={alienHand}></img>
              <img id="final-burger" src={boorgirImg}></img>
              <img id="final-cow-hand" src={cowHand}></img>
            </div>
            <Sketch />
          </div>
        </div>
        {/* <Footer /> */}
      </>
    );
  }
}

export default App;
