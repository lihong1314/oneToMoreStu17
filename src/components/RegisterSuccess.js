import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { Link, hashHistory } from 'react-router';

let b_img = require('../images/login_r_img.png');

export default class RegisterSuccess extends Component {
    constructor() {
        super();
        this.state = {
            min: 6
        }
    }
    componentDidMount() {
        var _min = this.state.min;
        let timer = setInterval(() => {
            
            this.setState(
                {
                    min : _min
                }
            )
            _min --;
            if(_min <= 1 ){
                clearInterval(timer);
                hashHistory.push('/Main/Index');
            }
        },1000)
    }
    render() {
        return (
            <div className="login_c_c">
                <div className="RegisterSuccess">
                    <img src="images/registerSuccess.png" alt=""/>
                    <p className="regsuc">
                        注册成功
                    </p>
                    <p className="goMian">
                        { this.state.min }s后  <Link to="/Main/index/index" >去首页</Link>
                    </p>
                </div>
                {/*  查看活动  */}
            </div>
        )
    }
}
