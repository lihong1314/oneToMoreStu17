import React, { Component } from 'react';
import { Link } from 'react-router';
import Panel from './Panel';
import Button from './Button';

export default class DeviceTesting extends Component {
    componentWillMount(){
        window.location.href=`/testDev/testDevPage.html?rgg=${Math.floor(Date.now()/1000)}`
    }
    render() {
        
    }
}