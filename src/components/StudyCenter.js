
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import BottomFooter from './bottomFooter';
const { Header, Content, Sider } = Layout;
import { Link } from 'react-router';

export default class StudyCenter extends Component {
    constructor() {
        super();
        this.state = {

        };
    }
    componentWillMount() {

    }
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
                                学习中心
                            </div>
                            <ul className="nav_item_u">
                                <li>
                                    <Link activeClassName="active" to="/Main/Index/Index">
                                        <span className="iconfont icon-home" style={{ fontSize: '22px', marginRight: '19px' }}></span>
                                        首页
                                    </Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/Main/Index/YueLesson">
                                        <span className="iconfont icon-kongzhiqirili"></span>
                                        约课
                                    </Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/Main/Index/LessonList">
                                        <span className="iconfont icon-yuyue" style={{ fontSize: '22px', marginRight: '19px' }}></span>
                                        课表
                                    </Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/Main/Index/Check">
                                        <span className="iconfont icon-jiance" style={{ fontSize: '24px', marginRight: '17px' }}></span>
                                        检测设备
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
                        <div className="left-bottom-imgbox">
                            <img src="../images/left_person.png" alt=""/>
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