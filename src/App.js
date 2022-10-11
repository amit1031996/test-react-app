import ufo from './ufo.png';
import './App.css';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
    <Nav />
    <div className="App">
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
    </div>
    <Footer />
    </>
  );
}

export default App;
