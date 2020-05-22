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
    let celulasTemp=[];
    let vecino;
    this.state.arreglo.map((celula) => {
      let coordX;
      let coordY;
      let numVecinos = 0;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (x !== 0 || y !== 0) {
            coordX = (celula.x + x + this.filas) % this.filas;
            coordY = (celula.y + y + this.filas) % this.filas;
            vecino = this.state.arreglo.find(x => x.id === coordX + "." + coordY);
            numVecinos += vecino.estado;
          }
        }
      }
      celula.estadoSig=(numVecinos === 2 || numVecinos === 3)?this.reglas(celula.estado,numVecinos):0;
    })
    celulasTemp=this.state.arreglo;
    return(this.cambioDeEstado(celulasTemp));
  }

  reglas(estado,numVecinos) {
    let estadoSig = (estado === 0)?this.celulaMuerta(numVecinos):this.celulaViva(numVecinos);
      return estadoSig;
  }
  celulaMuerta(numVecinos){
    let estadoSig = (numVecinos === 3)?1:0;
    return estadoSig;
  }
  celulaViva(numVecinos){
    let estadoSig = (numVecinos === 2 || numVecinos === 3)?1:0;
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
