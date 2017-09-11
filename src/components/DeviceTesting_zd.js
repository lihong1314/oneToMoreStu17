import React, { Component } from 'react';
import { Link } from 'react-router';
import Panel from './Panel';
import Button from './Button';
export default class DeviceTesting extends Component {
    constructor() {
        super();
        this.state = {
            checkFlag:true
        }

    }
    checkClick(){
        this.setState({
            checkFlag:false
        })
    }
    componentWilldMount(){
        
        
    }
    render() {
        let test1 = require('../images/icon_test1.png');
        let test2 = require('../images/icon_test2.png');
        
        return (
            <Panel border="orange">
                <p className="testTingTitle">设备检测</p>
                <iframe src={`/testDev/testDevPage.html?rgg=${Math.floor(Date.now()/1000)}`} width='100%' height='700' />
            </Panel>
        )
    }
}