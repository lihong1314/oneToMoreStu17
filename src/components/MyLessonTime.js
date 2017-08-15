import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { Link, hashHistory } from 'react-router';
import { Spin, Switch, Alert } from 'antd';

export default class MyLessonTime extends React.Component {
    constructor() {
        super();

       
    }
    render() {
        return (
            <div>
                <div className="b_panel" style={{paddingBottom:'0',borderBottom:'1px solid #ccc'}}>
                    <div className="b_m_time_head">
                        我的课时
                        </div>
                    <div className="order_item_box">
                        <div className="lesson_time_box fl">
                            <div className="fl lt_shengyu">
                                <p className="g_origin g_f30">
                                    35.0
                                </p>
                                <p className="g_f14">剩余课时</p>
                            </div>
                            <div className="fl ca_jindu">
                                <img src="../images/wlh_classhour.jpg" />
                                {/* <canvas style='display:none' id="canvas" ref="canvas" width="120" height="120" /> */}
                            </div>
                            <div className="fl lt_shengyu">
                                <p className="g_origin g_f30">
                                    45.0
                                </p>
                                <p className="g_f14">已使用课时</p>
                            </div>
                        </div>
                        <div className="lesson_youxiao_box fr">
                            <p className="m_lesson_youxiaoqi">
                                有效期：2018-04-05
                            </p>
                            <p className="m_lesson_goumaikeshi">
                                <a href="javascript;;" className="b_btn" >购买课时</a>
                            </p>
                        </div>
                    </div>
                </div>
                {/* <!--课时记录  --> */}
                <div className="b_panel">
                    <div className="b_m_time_head">
                        课时记录
                        </div>
                    <div className="order_item_box">
                        <table className="lesson_jl">
                            <tr>
                                <td>
                                    约课 G2 Lesson 1-6
                                </td>
                                <td>
                                    <span className="g_origin">-1.0</span>
                                </td>
                                <td>
                                    <span className="g_f9">2018-04-05</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

        )
    }
}