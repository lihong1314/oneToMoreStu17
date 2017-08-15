// jifen_copy.jpg
import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { Link, hashHistory } from 'react-router';
import { Spin, Switch, Alert } from 'antd';

let b_img = require('../images/login_r_img.png');

export default class MyJiFen extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="personInfo">
                <img src="./images/jifen_copy.jpg" alt="" />
            </div>
        )
    }
}