import React,{Component} from 'react';
import './celula.css';

export default class Celula extends Component{
  render(){
    return(
        <div className={"celula celula"+this.props.estado}
        >
        {this.props.x}
        {this.props.y}
        </div>
    );
  }
};