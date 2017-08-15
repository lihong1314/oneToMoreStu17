import React, { Component } from 'react';
import { Link } from 'react-router';
import Button from './Button';
import { Avatar } from 'antd';
import { Rate, Icon } from 'antd';

export default class LessonItemUdone extends Component {
    render() {
        let b_img = require('../images/tu1.png');
        let userImg = { marginLeft: '10px' };
        let { btnText, isShow } = this.props;
        console.log(this.props.isShow);
        return (
            <div className="index_ds_item">
                <div className="index_ds_header">
                    {
                        isShow == 'true' ?
                            <div>
                                <div className="index_ds_time">
                                    今日（周一）12:00
                                    </div>
                                <div className="index_ds_states">
                                    <i className="iconfont" style={{ color: "#ff001c", marginRight: '9px' }}>&#xe675;</i>即将开课：12:30
                                </div>
                            </div>
                            : <div className="p_tuijian_title">
                                <span>
                                    <img src="../images/title_bg.jpg" alt="" />
                                </span>
                                约课
                            </div>
                    }
                </div>
                <div className="index_b_lesson_item">
                    <div className="index_b_lesson_img">
                        <img src={b_img} alt="" />
                    </div>
                    <div className="index_b_le_text">
                        <span className="lesson_level">G1</span>
                        <span>Reader: Cat School - 绘本：猫咪学校</span>
                        <p className="lesson_dec">to introduce onesslf ; to exchange greeting</p>

                    </div>
                    {
                        isShow == 'true' ?
                            <div className="lesson_user">
                                <Avatar icon="user" style={userImg} />
                                <Avatar icon="user" style={userImg} />
                                <Avatar icon="user" style={userImg} />
                                <Avatar icon="user" style={userImg} />
                                <Avatar icon="user" style={userImg} />
                                <Avatar icon="user" style={userImg} />
                                <a href="http://learnapi.gogo-talk.com:8333/Room/sturoom.html?lessonId=19&type=lesson" target="_blank" className="b_btn">进入教室</a>
                            </div> : ''
                    }

                </div>
            </div>
        )
    }
}