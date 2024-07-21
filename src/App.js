import Navbar from './navbar';
import Home from './Home';
// import './index.css'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="contents">
        <Home></Home>
      </div>
     
    </div>
  );
}

export default App;
