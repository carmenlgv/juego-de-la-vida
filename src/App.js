import React, { Component } from 'react';
import './App.css';
import Tablero from './Tablero.js';
import construirArreglo from './construirArreglo.js';

const estadoInicial = (filas) => {
  const arreglo = construirArreglo(filas);
  return {
    arreglo
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.filas = 50;
    this.state = estadoInicial(this.filas);
  }
  tick() {
    this.setState(this.seleccionarVecinos());
  }
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 500);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  seleccionarVecinos() {
    let estadoSig;
    let celulasTemp=[];
    let celulas = this.state.arreglo;
    let vecino;
    celulas.map((celula) => {
      let coordX = 0;
      let coordY = 0;
      let numVecinos = 0;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (x !== 0 || y !== 0) {
            coordX = (celula.x + x + this.filas) % this.filas;
            coordY = (celula.y + y + this.filas) % this.filas;
            vecino = celulas.find(x => x.id === coordX + "." + coordY);
            numVecinos += vecino.estado;
          }
        }
      }
      estadoSig=this.reglas(celula.estado,numVecinos);
      celula.estadoSig=estadoSig;
    })
    celulasTemp=celulas;
    return(this.cambioDeEstado(celulasTemp));
  }

  reglas(estado,numVecinos) {
    let estadoSig=0;
      if (estado === 0) {
        if (numVecinos === 3) {
          estadoSig = 1;
        }
      }
      else {
        if (numVecinos === 2 || numVecinos === 3) {
          estadoSig = 1;
        }
      }
      return estadoSig;
  }
  cambioDeEstado(celulasTemp){
    celulasTemp.map((celula) => {  
      celula.estado = celula.estadoSig;
    })
    return celulasTemp;
  }
  render() {
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
