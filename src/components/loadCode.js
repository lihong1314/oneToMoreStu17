import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
require('../styles/LoginWeCode.css');

export default class PwdLogin extends Component {
    constructor() {
        super();
        this.state = {
            codeUrl: 'string',
            randomNuber: null
        };
    }
    componentDidMount() {
        let Num = 0;
        fetch(this.props.source,
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(json => {
                if(json.result == 1){
                    this.setState({
                        codeUrl:json.data,
                        randomNuber : json.msg
                    })
                    
                    let testTimer = setInterval(() => {
                        Num ++;
                        if(Num >= 60){
                            return false;
                        }
                        fetch("http://learnapi.gogo-talk.com:8333/api/Register/GetOpenId?RandomNuber="+this.state.randomNuber,
                        {
                            method: "GET"
                        })
                        .then(res => res.json())
                        .then(json => {
                            if(json.result == 1){
                                window.localStorage.setItem('openId',json.msg)
                                clearInterval(testTimer);
                                hashHistory.push('/Register');
                            }else if(json.result == 2){
                                window.localStorage.setItem('Tonken',json.data.userToken);
                                clearInterval(testTimer);
                                hashHistory.push('/Main/Index');
                            }
                            
                        })
                        this.props.testTimer

                        if(this.props.isStop){
                            clearInterval(testTimer);
                        }
                    },1000);
                }
                    
            })
    }
    render() {

        return (
            <div className="code_img">
                <img src={this.state.codeUrl} alt="" />
            </div>
        )
    }
}