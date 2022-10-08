import logo from './logo.svg';
import './App.css';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
    <Nav />
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-3xl bg-sky-500 hover:bg-sky-800">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    <Footer />
    </>
  );
}

export default App;
