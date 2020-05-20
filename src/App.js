import React, { Component } from 'react';
import './App.css';
import Tablero from './Tablero.js';
import construirArreglo from './construirArreglo.js';

const estadoInicial = () => {
  const arreglo = construirArreglo();
  return {
    arreglo
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = estadoInicial();
  }
  render() {
    return (
      <div className="App">
        <Tablero
          arreglo={this.state.arreglo}
        //seleccionarVecinos={() => this.seleccionarVecinos()}
        />
        {this.seleccionarVecinos()}
      </div>
    );
  }

  seleccionarVecinos() {
    const myArray = this.state.arreglo;
    
    myArray.map((celula) => {
      var vecino;
      var coordX = celula.x;
      var coordY = celula.y;
      var numVecinos = 0;
      for (var x = -1; x <= 1; x++) {
        for (var y = -1; y <= 1; y++) {
          if (x !== 0 || y !== 0) {
            coordX = (coordX + x);
            coordY = (coordY + y);
            if(coordY > 0 && coordY < 20 && coordX > 0 && coordX < 20)
            {vecino = myArray.find(x => x.id === coordX + "." + coordY);
            numVecinos += vecino.estado;}
          }
        }
      }
      celula.vecinos = numVecinos;
    })

  }
}



export default App;
