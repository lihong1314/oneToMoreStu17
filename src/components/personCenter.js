
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import BottomFooter from './bottomFooter';
const { Header, Content, Sider } = Layout;
import { Link } from 'react-router';

export default class PersonCenter extends Component {
    render() {
        return (
            <div>
                <div className="index_bg"></div>
                <div className="content clearFix">
                    <nav>
                        <div className="nav_top_img">
                            <img src="images/bg_nav_top.png" alt="" />
                        </div>
                        <div className="nav_item_box">
                            <div className="nav_title">
                                我的帐户
                            </div>
                            <ul className="nav_item_u">
                                <li>
                                    <Link activeClassName="active" to="/Main/Person/PersonInfo">
                                        <span className="iconfont icon-wode"></span>
                                        个人中心
                                    </Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/Main/Person/MyLessonTime">
                                         <span className="iconfont icon-bookshelf"></span>
                                        我的课时
                                    </Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/Main/Person/MyOrder">
                                        <span className="iconfont icon-aiguifanfile2"></span>
                                        我的订单
                                    </Link>
                                </li>
                                <li>
                                     <Link activeClassName="active" to="/Main/Person/Integrai">
                                        <span className="iconfont icon-jifen1"></span>
                                        积分
                                    </Link>
                                </li>
                                <li>
                                     <Link activeClassName="active" to="/Main/Person/Discount">
                                        <span className="iconfont icon-youhuijuan"></span>
                                        优惠劵
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/* <!--时间  --> */}
                        <div className="nav_item_box">
                            <div className="_clock fr"></div>
                            <div className="clock_box">
                                <div className="fl clockImg">
                                    <img src="images/icon_clock.png" alt="" />
                                </div>
                                <div className="clock_time">
                                    <p className="b_time">15:19:44</p>
                                    <p>当前时间</p>
                                </div>
                            </div>
                        </div>
                        {/* <!--二维码  --> */}
                        <div className="nav_item_box text-center">
                            <div className="_title fr">
                                <img src="images/icon_gocode.png" alt="" />
                            </div>
                            <div className="code_box">
                                <img src="images/wecode.png" alt="" />
                            </div>
                            <p className="code_text">
                                扫码关注 官方微信
                            </p>
                            <p className="code_text2">
                                400-8787-276
                            </p>
                        </div>
                    </nav>
                    <div className="r_content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }

}