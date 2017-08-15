import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactDOM, { render } from 'react-dom';

import LoginHeader from './loginHeader';
import LoginFooter from './loginFooter';


export default class loginMobile extends Component {
    render() {
        return (
            <div>
                <LoginHeader />
                <div className="login_c_box">
                    {
                        this.props.children
                    }
                </div>
                <LoginFooter />
            </div>
        )
    }
}