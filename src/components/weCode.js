import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
require('../styles/LoginWeCode.css');
import LoadCode from './loadCode';


/*微信扫码快速登录*/

let b_img = require('../images/login_r_img.png');
export default class weCode extends Component {
    render() {
        return (
            <div className="login_c_c">
                <div className="login_l_img fl">
                    <img src={b_img} alt="" />
                </div>
                <div className="fl" style={{float:'right' }}>
                    <div className="login_code_box">
                        <LoadCode source="http://learnapi.gogo-talk.com:8333/api/Register/GetImageUrl" />
                        <div className="code_b_text">
                            微信扫码快速/登录
                        </div>
                        <ul className="login_btn_box">
                            <li>
                                <Link to="/PwdLogin">
                                    <span className="iconfont icon-zhuanhuan"></span>
                                    切换密码登录
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}