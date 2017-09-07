import React, { Component } from 'react';
import { Link } from 'react-router';
import Button from './Button';
import Panel from './Panel';
import OrderLessonItem from './orderLessonItem';
import { Breadcrumb } from 'antd';
import LessonItemUdone from './LessonItemUdone';

export default class Alert extends Component {
    yuyueClick(){
        fetch(`http://learnapi.gogo-talk.com:8333/api/Lesson/AddLesson`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    , 'Authorization': window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
            })
    }
    render() {
        let None = {
            'display': 'none'
        }
        let Block = {
            'display': 'block'
        }
        let state = this.props.isShow ? None : Block;
        return (
            <div>
                <div className="confirm-wins-container" style={Block}></div>
                <div className="wins wins_msg">
                    <div className="win_close">
                        &times;
                    </div>
                    <div className="win_message">
                        本次预约消耗1课时，确定预约？
                    </div>
                    <div className="win_footer">
                        <a style={{ 'background': '#f85d16', 'color': '#fff', 'marginRight': '20px' }} className="b_btn b_close_confirm">
                            取消
                        </a>
                        <a className="b_btn b_msg_confirm" onClick={this.yuyueClick.bind(this)}>
                            确定
                        </a>
                    </div>
                </div>
                <div class="wins wins_only_msg">
                    已剩余席位
                </div>
                <div className="OrderLessonDetail">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/Main/index">学习中心</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/Main/Index/YueLesson">课表</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>课程详情</Breadcrumb.Item>
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
                            <li>开课时间</li>
                            <li>房间数</li>
                            <li>剩余席位</li>
                            <li>消耗课时</li>
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

            </div>
        )
    }
}