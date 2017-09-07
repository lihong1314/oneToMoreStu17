
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import BottomFooter from './bottomFooter';
const { Header, Content, Sider } = Layout;
import { Link } from 'react-router';
import TimeAdd from './timeAdd.js';//时间正计时

export default class StudyCenter extends Component {
    constructor() {
        super();
        this.state = {
            h:null,
            m:null,
            s:null
        };
    }
  
    render() {
        const {h,m,s} =this.state;
        let url = window.location.href.slice(window.location.href.indexOf('#')+1,window.location.href.indexOf('?'));
        let urlClass = '';
        let urlClass1 = '';
        let urlClass2 = '';
        console.log(url);
        if(url == '/Main/Index' || url == '/Main/Index/'){
            urlClass = 'active';
        }else if(url == '/Main/Index/LessonDetail'){
            urlClass1 = 'active'
        }else if(url == '/Main/Index/LessonList/CompletedReac' || url.indexOf('/Main/Index/ScheduleDtailNo')>=0 || url.indexOf('/Main/Index/ScheduleDtail')>=0){
            urlClass2 = 'active';
        }
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
                                    <Link activeClassName="active" to="/Main/Index/Index" className={urlClass}>
                                        <span className="iconfont icon-home" style={{ fontSize: '22px', marginRight: '19px' }}></span>
                                        首页
                                    </Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/Main/Index/YueLesson" className={urlClass1}>
                                        <span className="iconfont icon-kongzhiqirili"></span>
                                        约课
                                    </Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="/Main/Index/LessonList" className={urlClass2}>
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
                                    {/* <p className="b_time">15:19:44</p> */}
                                    <p className="b_time"><TimeAdd step={1} /></p>
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
                                <img src="images/weixin.jpg" alt="" />
                            </div>
                            <p className="code_text">
                                扫码关注 官方微信
                            </p>
                            <p className="code_text2">
                                400-6767-671
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