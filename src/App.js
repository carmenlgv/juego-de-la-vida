import React, {Component} from 'react';
import './App.css';
import Tablero from './Tablero.js';
import construirArreglo from './construirArreglo.js';

const estadoInicial = () =>{
  const arreglo = construirArreglo();
  return{
    arreglo
  };

}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = estadoInicial();
  }
  render(){
  return (
    <div className="App">       
        <Tablero
         arreglo={this.state.arreglo}
         />
    </div>
  );
  }
}

export default App;
