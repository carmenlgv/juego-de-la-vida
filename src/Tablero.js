import React,{Component} from 'react';
import Celula from './Celula.js';
import './celula.css';

export default class Tablero extends Component{
  render(){
    return(
        
        <div className="tablero">{
            this.props.arreglo.map((celula)=>
            <Celula estado={celula.estado}
            x={celula.x}
            y={celula.y} />)           
          }
          </div>
          
    );
  }
};