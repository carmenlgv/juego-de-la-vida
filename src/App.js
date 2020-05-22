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
    //El state se cambia al arreglo temporal
    this.setState(this.seleccionarVecinos());
  }
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 500);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  seleccionarVecinos() {
    //Por cada celula se obtiene el número de vecinos vivos que tiene
    //Si el número de vecinos es igual a 3, en la siguiente generación vivirá, sin importar el estado.
    //Regresa un arreglo temporal en donde guarda el siguiente estado
    let celulasTemp = [];
    let numVecinos;
    this.state.arreglo.map((celula) => {
      numVecinos = this.calculoVecinos(celula);
      celula.estadoSig = (numVecinos === 3) ? 1 : this.reglas(celula.estado, numVecinos);
    })
    celulasTemp = this.state.arreglo;
    return (this.cambioDeEstado(celulasTemp));
  }

  calculoVecinos(celula) {
    //Calculo de cuántos vecinos vivos tiene una celula
    let numVecinos = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        numVecinos += (x !== 0 || y !== 0) ? this.estadoVecino(celula.x + x, celula.y + y) : 0;
      }
    }
    return numVecinos;
  }
  estadoVecino(x, y) {
    //Regresa el estado de cada vecino
    let vecino;
    x = (x + this.filas) % this.filas;
    y = (y + this.filas) % this.filas;
    vecino = this.state.arreglo.find(z => z.id === x + "." + y);
    return vecino.estado;
  }

  reglas(estado, numVecinos) {
    //Si la celula está viva y si tiene 2 vecinos, vivirá
    let estadoSig = (estado === 1 && numVecinos === 2) ? 1 : 0;
    return estadoSig;
  }
  cambioDeEstado(celulasTemp) {
    //El estado que tendrá la celula en la siguiente generación
    //se cambia al atributo estado para que pueda ser reconocido
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
