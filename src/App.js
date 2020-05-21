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
  tick() {
    this.setState(this.seleccionarVecinos());
  }
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  seleccionarVecinos() {
    let estadoSig;
    let celulasTemp=[];
    console.log("seleccionando vecinos");
    let celulas = this.state.arreglo;
    celulas.map((celula) => {
      var vecino;
      var coordX = 0;
      var coordY = 0;
      var numVecinos = 0;
      for (var x = -1; x <= 1; x++) {
        for (var y = -1; y <= 1; y++) {
          if (x !== 0 || y !== 0) {
            coordX = (celula.x + x + 20) % 20;
            coordY = (celula.y + y + 20) % 20;
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
    var estadoSig=0;
      if (estado === 0) {
        if (numVecinos === 3) {
          estadoSig = 1;
        }
        else {
          estadoSig = 0;
        }
      }
      else {
        if (numVecinos === 2 || numVecinos === 3) {
          estadoSig = 1;
        }
        else {
          estadoSig = 0;
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
