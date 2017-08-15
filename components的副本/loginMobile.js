import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactDOM, { render } from 'react-dom';

import LoginHeader from './loginHeader';
import LoginFooter from './loginFooter';

let b_img = require('../images/login_r_img.png');

export default class loginMobile extends Component {
    render() {
        return (
            <div>
                <LoginHeader />
                <div className="login_c_box">
                    <div className="login_c_c">
                        <div className="login_l_img fl">
                            <img src={b_img} alt="" />
                        </div>
                        <div className="fl" style={{marginLeft:'30px'}}>
                            {
                                this.props.children
                            }
                        </div>
                    </div>
                </div>
                <LoginFooter />
            </div>
        )
    }
}