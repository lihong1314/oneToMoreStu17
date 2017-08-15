import React, { Component } from 'react';
import { Link } from 'react-router';
import { Breadcrumb } from 'antd';

import LessonItemUdone from './LessonItemUdone'; //课程详情中课程介绍

export default class OrderLessonDetail extends Component {
    constructor() {
        super();
        this.state = {
            ModalText: 'Content of the modal',
            visible: false,
        }
    }
    
    render() {
        return (
            <div className="OrderLessonDetail" style={{borderTop:'6px solid #ffc000'}}>
                <Breadcrumb>
                    <Link to="/Main/Index/YueLesson" style={{color:"#ff6600"}}><i className="iconfont" style={{fontSize:'24px',position:'relative',top:'3px'}}>&#xe648;</i>返回</Link>
                </Breadcrumb>
                <div className="b_lesson_detail">
                    <LessonItemUdone btnText="进入教室" isShow="false" />
                </div>
                <div className="order_main">
                    <div className="order_date">
                        <div className="date_item active" style={{ borderLeft: 'none' }}>
                            <span className="date_day">周一</span>
                            <span className="date_date">06-12</span>
                        </div>
                        <div className="date_item">
                            <span className="date_day">周二</span>
                            <span className="date_date">06-12</span>
                        </div>
                        <div className="date_item">
                            <span className="date_day">周三</span>
                            <span className="date_date">06-13</span>
                        </div>
                        <div className="date_item">
                            <span className="date_day">周四</span>
                            <span className="date_date">06-14</span>
                        </div>
                        <div className="date_item">
                            <span className="date_day">周五</span>
                            <span className="date_date">06-12</span>
                        </div>
                        <div className="date_item mo">
                            <span className="date_day">周六</span>
                            <span className="date_date">06-12</span>
                        </div>
                        <div className="date_item mo">
                            <span className="date_day">周日</span>
                            <span className="date_date">06-12</span>
                        </div>
                        <div className="date_item">
                            <span className="date_day">周一</span>
                            <span className="date_date">06-12</span>
                        </div>
                        <div className="date_item">
                            <span className="date_day">周二</span>
                            <span className="date_date">06-12</span>
                        </div>
                        <div className="date_item">
                            <span className="date_day">周三</span>
                            <span className="date_date">06-13</span>
                        </div>
                        <div className="date_item">
                            <span className="date_day">周四</span>
                            <span className="date_date">06-14</span>
                        </div>
                        <div className="date_item">
                            <span className="date_day">周五</span>
                            <span className="date_date">06-12</span>
                        </div>
                        <div className="date_item mo">
                            <span className="date_day">周六</span>
                            <span className="date_date">06-12</span>
                        </div>
                        <div className="date_item mo">
                            <span className="date_day">周日</span>
                            <span className="date_date">06-12</span>
                        </div>

                    </div>
                    <div className="order_class">
                        <ul className="class_item_title">
                            <li>开课时间 <i className="iconfont">&#xe621;</i></li>
                            <li>房间数 <i className="iconfont">&#xe6f6;</i></li>
                            <li>剩余席位 <i className="iconfont">&#xe607;</i></li>
                            <li>消耗课时 <i className="iconfont">&#xe63a;</i></li>
                            <li>操作</li>
                        </ul>
                        <ul className="class_item_content">
                            <li>18:30</li>
                            <li>5</li>
                            <li>5</li>
                            <li>1</li>
                            <li><Link to="/Main/Index/OrderAlert" className="class_ordered">预约</Link></li>
                        </ul>
                    </div>
                </div>
            </div >
        )
    }
}