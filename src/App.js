import Timer from "./components/timer/timer.component";
import Board from "./components/board/board.component";
import './App.css';


function App() {

  return (
    
    <div className="app">
      <div className="coffee" >
        <a href="https://www.buymeacoffee.com/sjcho0517g">
          <img className='supportButton' alt='Buy me a coffee icon' src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=sjcho0517g&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
        </a>
      </div>
      <Timer />
      <Board />
    </div>
   
  );
}

export default App;
