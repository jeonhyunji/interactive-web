// import logo from './logo.svg';
import './App.css';
import Card from './card/Card';

function App() {

  const colors = ["red", "yellow", "green", "blue"];
  var translateX = 0;
  const cards = colors.map((value) => {
    translateX += 100;
    return <Card translateX={translateX} color={value} />
  });

  return (
    <div className="App">
      {cards}
    </div>
  );
}

export default App;
