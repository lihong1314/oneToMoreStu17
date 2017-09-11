import React, { Component } from 'react';
import BottomFooter from './bottomFooter';
import { Link } from 'react-router';
require('../styles/b_index.css');

export default class Index extends Component {
    getTokenClick() {
        window.frames[0].postMessage(JSON.stringify({ token: window.localStorage.getItem('Tonken') }), "*");
    }
    cleanTokenClick() {
        window.frames[0].postMessage(JSON.stringify({ token: '' }), "*");
        window.localStorage.setItem('Tonken','');
    }
    render() {
        return (
            <div className="contanier">
                <header>
                    <div className="logo fl">
                        <img src="../images/logo_blue.png" alt="" />
                    </div>
                    <div className="nav">
                        <ul>
                            <li>
                                <Link activeClassName="active" to="/Main/Index/">
                                    <span className="iconfont icon-book"></span>
                                    学习中心
                                </Link>
                            </li>
                            <li>
                                <Link activeClassName="active" to="/Main/Person/">
                                    <span className="iconfont icon-wode"></span>
                                    我的帐户
                                </Link>
                            </li>
                            <li onClick={this.getTokenClick.bind(this)}>
                                <a href="http://hifan.gogo-talk.com/CourseBuy.html" target="_blank">
                                    <span className="iconfont icon-qianbao-copy"></span>
                                    购买课时
                                </a>
                            </li>
                        </ul>
                        <div className="edit fr" onClick={this.cleanTokenClick.bind(this)}>
                            <a href="http://hifan.gogo-talk.com/">
                                退出
                            <span className="iconfont icon-tuichu"></span>
                            </a>
                        </div>
                        <div className='back' onClick={this.getTokenClick.bind(this)}>
                            <a href="http://hifan.gogo-talk.com/">
                                返回官网
                            <span className="iconfont icon-fanhui"></span>
                            </a>
                        </div>
                    </div>
                    <iframe src="http://hifan.gogo-talk.com/auth.html" style={{ display: 'none', height: '1px', width: '1px' }}></iframe>
                </header>
                {this.props.children}
                <footer>
                    <p>全国客服热线：400-6767-671<span>|</span>周一至周日：8:00-22:00</p>
                    <p>hi翻外教课堂www.hi-fan.cn京ICP备15001014号-4&nbsp;&nbsp;All Rights Reserved Copyright 2002-2017笨鸟盛世（北京）教育科技有限公司 版权所有</p>
                </footer>
            </div>
        )
    }
}

