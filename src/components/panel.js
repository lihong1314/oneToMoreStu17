import React, { Component } from 'react';

export default class Panel extends Component{
    render () {
        let borderColor =this.props.border == 'orange'? {borderTop:'6px solid #ffc000'} : {borderTop:'6px solid #f31e35'}
        let panelStyle = {
            background:'#fff',
            border:'1px solid #ccc',
            width:'100%',
            position:'relative',
            marginBottom:'20px',
            ...borderColor
        }
        
        
        return (
            <div className="b_panel" style={panelStyle}>
                {this.props.children}
            </div>
        )
    }
}