import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import Button from './Button';
import LessonItemCompleted from './LessonItemCompleted';

export default class pinjia extends Component {
    render() {
        return (
            <div>
                <ul className="index_panelbox">
                    <li>
                        <LessonItemCompleted isShoWPinJia="false"/>
                    </li>
                    <li>
                        <LessonItemCompleted isShoWPinJia="false"/>
                    </li>
                    <li>
                        <LessonItemCompleted isShoWPinJia="true"/>
                    </li>
                </ul>
                <div style={{width:'100%',height:'100%',background:'rgba(" 0,0,0,0.6 ")',position:'fixed',top:'0',left:'0',bottom:'0',textAlign:'center'}}>
                    <Link to="/Main/Index/LessonList">
                        <img src="./images/copy_pingjia.png" alt=""/>
                    </Link>
                </div>
            </div>
        )
    }
}