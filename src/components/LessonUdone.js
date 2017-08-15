import React, { Component } from 'react';
import { Link } from 'react-router';
import { Avatar } from 'antd';
import { Rate, Icon } from 'antd';
import LessonItemUdone from './LessonItemUdone';

export default class LessonUdone extends Component {
    
    render() {
        let dataObj = this.props.data;
        let b_img = require('../images/tu1.png');
        let userImg = { marginLeft: '10px' };
        let items = [];
        dataObj.map(function(d,i){
           
            var stuArr = [];
            for (var j = 0; j < d.Num; j++) {
                stuArr.push(<Avatar icon="user" style={userImg} key={j}/>)
            }

            items.push(
                <li key={i}>
                    <div className="index_ds_item" >
                        <div className="index_ds_header">
                            <div>
                                <div className="index_ds_time">
                                    {/*今日（周一）12:00*/}
                                    {d.StartTime}
                                </div>
                                <div className="index_ds_states">
                                    <i className="iconfont" style={{ color: "#ff001c", marginRight: '9px' }}>&#xe675;</i>即将开课：12:30
                                </div>
                            </div>
                        </div>
                        <div className="index_b_lesson_item">
                            <div className="index_b_lesson_img">
                                <img src={d.FilePath} alt="" />
                            </div>
                            <div className="index_b_le_text">
                                <span className="lesson_level">{d.LevelName}</span>
                                <span>{d.FileTittle}</span>
                                <p className="lesson_dec">{d.Describe}</p>

                            </div>
                            <div className="lesson_user">
                                {stuArr}
                                {/*<Avatar icon="user" style={userImg} />
                                <Avatar icon="user" style={userImg} />
                                <Avatar icon="user" style={userImg} />
                                <Avatar icon="user" style={userImg} />
                                <Avatar icon="user" style={userImg} />
                                <Avatar icon="user" style={userImg} />*/}
                                <a href="http://learnapi.gogo-talk.com:8333/Room/sturoom.html?lessonId=19&type=lesson" target="_blank" className="b_btn">进入教室</a>
                            </div>
                        </div>
                    </div>

                </li>
            );
        })



        return (
            <ul className="index_panelbox">
                {items}
            </ul>
        )
    }
}

