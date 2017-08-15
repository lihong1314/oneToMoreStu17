import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import Button from './Button';

export default class Alert extends Component {
    componentDidMount() {
        let t = setTimeout(() => {
            hashHistory.push('/Main/Index/LessonDetail/1');
        },3000)
    }
    render() {
        let None = {
            'display':'none'
        }
        let Block = {
            'display':'block'
        }
        let state = this.props.isShow ? None : Block;
        return (
            <div>
                <div className="confirm-wins-container" style={ Block }></div>
                <div className="wins wins_msg" style={{'textAlign':'center'}}>
                    预约成功
                </div>
            </div>
        )
    }
}