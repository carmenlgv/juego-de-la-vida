import React, { Component } from 'react';
import Celula from './Celula.js';
import './celula.css';

class Tablero extends Component {
    render() {
        return (
            <div className="tablero">{
                this.props.arreglo.map((celula) =>
                    <Celula
                        arreglo={this.props.arreglo}
                        estado={celula.estado}
                        key={celula.id}  
                        vecinos={celula.vecinos}
                        estadoSig={celula.estadoSig}               
                    />
                )
                
            }
            
            </div>
        );
    }
};
export default Tablero;