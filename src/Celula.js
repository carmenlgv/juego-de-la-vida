import React, { Component } from 'react';
import './celula.css';

class Celula extends Component {
    render() {
        return (
            <div className={"celula celula" + this.props.estado}
                key={this.props.id}>
                {this.props.x}
                {this.props.y}
            </div>
        );
    }
};
export default Celula;