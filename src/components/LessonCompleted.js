import React, { Component } from 'react';
import { Link } from 'react-router';
import { Avatar } from 'antd';
import { Rate, Icon } from 'antd';
import LessonItemCompleted from './LessonItemCompleted';
import ScheduleDtail from './ScheduleDtail';
//已结束
export default class LessonCompleted extends Component {
    constructor() {
        super();
        this.state = {
            isPinjiabox: false,
            isPinjia:true,
            value: 0,
            count: null,
            teacherName: '',
            teacherFileUrl: '',
            teacherGender:0,
            describe: {
                value: '',
                flag: true
            },
            lessonId: 0,
            teacherId: 0,
            studentId: 0,
            pingjiaSucs:false
        };
        this.pingjiaClick = this.pingjiaClick.bind(this);
        this.pingjiaHide = this.pingjiaHide.bind(this);
    }
    componentWillMount() {

    }
    pingjiaClick(v1, v2, v3, v4, v5, v6,v7) {
        if(v7 == null){
            v7=0;
        }
        this.setState({
            isPinjiabox:true,
            isPinjia: true,
            lessonId: v2,
            teacherId: v1,
            teacherName: v3,
            teacherFileUrl: v4,
            teacherGender:v7,
            studentId: v5
        })
        
    }
    pingjiaHide() {
        this.setState({
            isPinjia: false,
            isPinjiabox: false,
        })
    }
    handleChange = (value) => {
        this.setState({ value });
    }
    GradSubmit() {
        const { describe, value, studentId, lessonId, teacherId } = this.state;
        if (value <= 0 || describe.value == "") {
            alert('请填写信息');
            return;
        }
        fetch("http://learnapi.gogo-talk.com:8333/api/HomePage/Tch_Comment",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: window.localStorage.getItem('Tonken')
                },
                body: JSON.stringify({
                    Content: describe.value,
                    LessonId: teacherId,
                    TeacherId: lessonId,
                    StudentId: studentId,
                    Points: value
                })
            })
            .then(res => res.json())
            .then(json => {
                if(json.result == 1){
                    this.setState({
                        isPinjiabox: true,
                        isPinjia:false,
                        value: value,
                        count: value,
                        teacherName: '',
                        teacherFileUrl: '',
                        describe: {
                            value: describe.value,
                            flag: true
                        },
                        lessonId: 0,
                        teacherId: 0,
                        studentId: 0,
                        isA: false,
                        pingjiaSucs:true
                    })
                    //window.history.go(0);
                }
                
            })
    }
    valueChange(val) {
        const { describe } = this.state;
        this.setState({
            describe: {
                value: val,
                flag: false
            }
        })

    }
    pingjiaHides(){
        this.setState({
            isPinjia: false,
            pingjiaSucs:false,
            isPinjiabox:false
        })
        window.history.go(0);
    }
    render() {
        let dataObj = this.props.data;
        let b_img = require('../images/jiangbei.png');
        let userImg = { marginLeft: '0px' };
        let items = [];
        var textError = this.state.describe.flag ? { border: '1px solid #ccc' } : { border: '1px solid #f60000' }
        let isShowz = this.state.isPinjiabox ? { display: 'block', height: document.documentElement.clientHeight + 'px' } : { display: 'none', height: document.documentElement.clientHeight + 'px' }
        let isShows = this.state.isPinjia ? { display: 'block' } : { display: 'none'} 
        let pingjiaSuc = this.state.pingjiaSucs ? {display:'block'}:{display:'none'};
        if (dataObj.length == 0) {
            items = <li>
                <div className="index_ds_item" >
                    <div className="index_imgbox">
                        <img src="../images/yesSuc_none.png" alt="" />
                    </div>
                    <p>还没有已上课程记录。</p>
                </div>
            </li>
        } else {
            dataObj.map((d, i) => {
                let time = new Date(d.StartTime.replace(/-/g,'/'));
                let nowTime = new Date();
                const week = ['周日','周一', '周二', '周三', '周四', '周五', '周六',  '今天'];
                let classState = ''
                if (d.StudentStatus == 1) {
                    classState = '缺勤'
                } else if (d.StudentStatus == 2) {
                    classState = '迟到'
                }

                
                var weekStr = ''
                if (time.getDay() - 1 == nowTime.getDay() - 1) {
                    weekStr = week[7];
                } else {
                    weekStr = week[time.getDay()];
                }
                let m = (time.getMonth() + 1);
                m = m<10?'0'+m:m;
                let day = time.getDate();
                day = day<10?'0'+day:day;
                let h = time.getHours(); 
                h = h<10?'0'+h:h;
                let ms = time.getMinutes();
                ms = ms<10?'0'+ms:ms;
                let timeStr = m + '月' + day + '日（' + weekStr + '） ' + h + ":" + ms;

                let isjianBeiShow = d.GiftCount <= 0 ? { display: 'none' } : { display: 'block' };

                //奖杯个数
                let stuArr = [];
                if(d.GiftCount>10){
                    stuArr.push(<span key={1}> <img src={b_img} alt="" /> </span>);
                }else{
                    for (let j = 0; j < d.GiftCount; j++) {
                        stuArr.push(<span key={j}> <img src={b_img} alt="" /> </span>);
                    }
                }
                
                let pinjia;
                if (d.IsComment == '0') {

                    pinjia = <div className="index_ds_states">
                        <span className="red" ref="daiPinjiaBtn" key={i} onClick={this.pingjiaClick.bind(this, d.LessonId, d.TeacherId, d.TeacherName, d.TeacherImg, d.StudentId,d.TeacherGender)}><i className="iconfont" style={{marginRight:'4px'}}>&#xe689;</i> 待评价 </span>
                    </div>
                } else {
                    if (!this.state.isA) {
                        pinjia = <div className="index_ds_states">
                            已评价：<Rate disabled defaultValue={d.Points} style={{ color: "#ff6600" }} />
                        </div>
                    }
                }


                items.push(
                    <div className="index_ds_item" key={i}>
                        <div className="index_ds_header">
                            <div className="index_ds_time">
                                {timeStr}
                                <span className="origin" style={{ fontSize: '16px', marginLeft: '10px' }}>{classState}</span>
                            </div>
                            {pinjia}
                        </div>

                        <div className="index_b_lesson_item">
                            <Link to={{ pathname: '/Main/Index/ScheduleDtail/' + d.LessonId }}>
                                <div className="index_b_lesson_img">
                                    <img src={d.FilePath} alt="" />
                                </div>
                            </Link>
                            <div className="index_b_le_text">
                                <span className="lesson_level">{d.LevelName}</span>
                                <span>{d.FileTittle}</span>
                                <p className="lesson_dec">{d.Describe}</p>
                            </div>
                            <div className="lesson_user">
                                <div className='jiangbeibox' style={isjianBeiShow}><span className="jiangbeigeishu">本节课获得{d.GiftCount}个：</span>{stuArr}</div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        let tchimgurl = '';
        if(this.state.teacherFileUrl == ""){
            if(this.state.teacherGender == 1){
                tchimgurl = '../images/tch_boy.jpg';
            }else{
                tchimgurl = '../images/tch_girl.jpg';
            }
        }else{
            tchimgurl = this.state.teacherFileUrl
        }
        return (
            <div>
                <ul className="index_panelbox">
                    <li>
                        {items}
                    </li>
                </ul>
                <div className="testTing" style={isShowz} >
                    <div className="pingjiaBox" style={isShows}>
                        <div className="teacherPhotoBox">
                            <div className="teacherPhoto">
                                <img src={tchimgurl} alt="" />
                            </div>
                            <p>{this.state.teacherName}</p>
                        </div>
                        <span className='closeX' onClick={this.pingjiaHide.bind(this)}>&times;</span>
                        <div className="starBox"><Rate defaultValue={0} style={{ color: "red" }} onChange={this.handleChange} value={this.state.value} /></div>
                        <textarea name="" id="" cols="30" rows="10" maxLength="100" style={textError} placeholder="输入课后评价（100字以内）" onChange={(e) => this.valueChange(e.target.value)} value={this.state.describe.value}></textarea>
                        <p>完成评价获得5积分</p>
                        <a href="javascript:;" className="susBtn" onClick={(e) => this.GradSubmit(e)}>完成</a>
                    </div>
                    <div className="pingjiaSucBox" style={pingjiaSuc}>
                        <span className='closeX' onClick={this.pingjiaHides.bind(this)}>&times;</span>
                        <div className="smilebox"><img src="../images/smile.png" /></div>
                        <p className="zongfen">评价成功 {this.state.value}</p>
                        <div className="pingjiaStar">
                        <Rate disabled value={this.state.value} style={{ color: "#f26721" }} />
                        </div>
                        <p className="pingjiaword">{this.state.describe.value}</p>
                        <p className="fenxiang">快去分享吧！分享后获10积分</p>
                        <ul className="pingjiaSucTip">
                            <li style={{marginRight:'109px'}}>进入hi翻公众号<span className="one">1</span></li>
                            <li style={{marginRight:'125px'}}>点击本次上课结束通知<span className="two">2</span></li>
                            <li>去分享<span className="three">3</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}