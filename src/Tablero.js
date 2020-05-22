import React, { Component } from 'react';
import Celula from './Celula.js';
import './celula.css';

class Tablero extends Component {
    render() {
        return (
            <div className="tablero">{
                this.props.arreglo.map((celula) =>
                    <Celula
                        estado={celula.estado}
                        key={celula.id}
                    />
                )
            }
            </div>
        );
    }
};
export default Tablero;