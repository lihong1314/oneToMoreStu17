import React, { Component } from 'react';
import BottomFooter from './bottomFooter';
import { Link } from 'react-router';
require('../styles/b_index.css');

export default class Index extends Component {

    render() {
        return (
            <div className="contanier">
            <header>
                <div className="logo fl">
                    <img src="images/logo.png" alt="" />
                </div>
                <div className="nav">
                    <ul>
                        <li>
                            <Link activeClassName="active" to="/Main/Index/Index">
                                <span className="iconfont icon-book"></span>
                                学习中心
                            </Link>
                        </li>
                        <li>
                                <Link activeClassName="active" to="/Main/Person">
                                <span className="iconfont icon-wode"></span>
                                我的帐户
                                </Link>
                        </li>
                        <li>
                            <a href="http://www.gogo-talk.com:9338/CourseBuy.html" target="_blank">
                                <span className="iconfont icon-qianbao-copy"></span>
                                购买课时
                            </a>
                        </li>
                    </ul>
                    <div className="edit fr">
                        <a href="#">
                            退出
                            <span className="iconfont icon-tuichu"></span>
                        </a>
                    </div>
                </div>
            </header>
                {this.props.children}
            </div>
        )
    }
}

