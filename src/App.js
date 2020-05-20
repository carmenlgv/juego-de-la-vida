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
        />
        {this.seleccionarVecinos()}
        {this.reglas()}

      </div>
    );
  }

  seleccionarVecinos() {
    const myArray = this.state.arreglo;
    myArray.map((celula) => {
      var vecino;
      var coordX = 0;
      var coordY = 0;
      var numVecinos = 0;
      for (var x = -1; x <= 1; x++) {
        for (var y = -1; y <= 1; y++) {
          if (x !== 0 || y !== 0) {
            coordX = (celula.x + x + 20) % 20;
            coordY = (celula.y + y + 20) % 20;
            vecino = myArray.find(x => x.id === coordX + "." + coordY);
            numVecinos += vecino.estado;
          }
        }
      }
      celula.vecinos = numVecinos;
    })

  }

  reglas() {
    const myArray = this.state.arreglo;
    myArray.map((celula) => {
      if (celula.estado === 0) {
        if (celula.vecinos === 3) {
          celula.estadoSig = 1;
        }
        else {
          celula.estadoSig = 0;
        }

      }
      else {
        if (celula.vecinos === 2 || celula.vecinos === 3) {
          celula.estadoSig = 1;
        }
        else {
          celula.estadoSig = 0;
        }
      }
    })
  }
  cambioDeEstado(){
    const myArray = this.state.arreglo;
    myArray.map((celula) => {  
      celula.estado = celula.estadoSig;
    })
  }
}



export default App;
