import React, { Component } from 'react';
import { Link } from 'react-router';
import Panel from './panel';
import { Avatar } from 'antd';
import { Rate, Icon } from 'antd';
import Counter from './Counter';

export default class LessonUdoneReact extends Component {
    constructor() {
        super();
        //初始状态
        this.state = {
            dataArr: [],
            yesLength: 0,
            nowLessonId: null,
            DemandId:0,
            serverTime:null
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        fetch("http://learnapi.gogo-talk.com:8333/api/HomePage/GetNotMyLess",//未完成
            {
                method: "GET",
                headers: {
                    Authorization: window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                if (json.result == 1) {

                    this.setState({
                        dataArr: json.data
                    })

                }
            })
        fetch("http://learnapi.gogo-talk.com:8333/api/HomePage/GetCompleteMyLess",//已完成
            {
                method: "GET",
                headers: {
                    Authorization: window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                if (json.result == 1) {
                    this.setState({
                        yesLength: json.total
                    })
                }
            })
            fetch(`http://learnapi.gogo-talk.com:8333/api/HomePage/GetSystemTime`,
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    serverTime:json.data.SysDateTime
                })
            })
    }
    handleClick(v, v1) {
        this.refs.yyMengtai.style.display = "block";
        this.refs.yy.style.display = "block";
        this.setState({
            DemandId:v1
        })
        // let time = new Date();
        // let lessonTime = new Date(v);
        // let timeCha = lessonTime.getTime() - time.getTime();
        // let leftsecond = parseInt(timeCha / 1000);
        // let day1 = Math.floor(leftsecond / (60 * 60 * 24));
        // let hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
        // let minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
        // let second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
        // this.setState({
        //     nowLessonId:v1
        // })
        // if (timeCha >= 7200000) {
        //     this.refs.yys.style.zIndex = '-1'
        //     this.refs.yy.style.display = "block";
        //     this.refs.yys.style.display = 'none';
        // }
        // else {
        //     this.refs.yys.style.display = 'block';
        //     this.refs.yy.style.display = "none";
        //     this.refs.yyPrompts.style.display = "none";
        // }

    }
    handleClickG() {
        this.refs.yyMengtai.style.display = "none";
    }
    handleClickNo() {
        this.refs.yyMengtai.style.display = "none"
    }
    handleClickChaO() {
        this.refs.yyMengtai.style.display = "none";
    }
    handleClickCha() {
        this.refs.yyMengtai.style.display = "none"
    }
    handleClickQxyy() {
        fetch(`http://learnapi.gogo-talk.com:8333/api/Demands/CancelLesson?DemandId=${this.state.DemandId}`,
            {
                method: "GET",
                headers: {
                    'Authorization': window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                if (json.result == 1) {
                    this.refs.yyPrompts.style.display = "block";
                    this.refs.yy.style.display = 'none'
                    setTimeout(() => {
                        this.refs.yyMengtai.style.display = "none";
                        this.refs.yyPrompts.style.display = "none";
                        this.refs.yy.style.display = 'block';
                        window.history.go(0);
                    }, 2000)
                } else if (json.result == -3) {
                    this.refs.yyPrompts.style.display = "none";
                    this.refs.keshitip.style.display = 'block';
                    this.refs.yyMengtai.style.display='none';
                    this.refs.yy.style.display = 'none'
                    this.refs.keshitipword.innerHTML = json.msg;
                    window.frames[0].postMessage(JSON.stringify({ token: window.localStorage.getItem('Tonken') }), "*");
                } else if (json.result == -88) {
                    this.refs.yyPrompts.style.display = "none";
                    this.refs.yuketip.style.display = 'block';
                    this.refs.yyMengtai.style.display='none';
                    this.refs.yy.style.display = 'none'
                    this.refs.yeketipword.innerHTML = json.msg
                }
                else {
                    this.refs.yyPrompts.style.display = "none";
                    this.refs.errortip.style.display = "block";
                    this.refs.errortipword.innerHTML = json.msg;
                    this.refs.yyMengtai.style.display = "none";
                    this.refs.yy.style.display = 'none'
                    setTimeout((that) => {
                        this.refs.errortip.style.display = "none";

                    }, 1500)
                }
            })
    }
    yekeCloseClick() {
        this.refs.yukebiao.style.display = 'none';
    }
    yuketipClick() {
        this.refs.yuketip.style.display = 'none';
        window.history.go(0);
    }
    keshitipClick() {
        this.refs.keshitip.style.display = "none";
    }

    render() {
        let dataObj = this.state.dataArr;
        let b_img = require('../images/tu1.png');
        let userImg = { marginLeft: '10px' };
        let items = [];
        if (dataObj.length == 0) {
            items = <li>
                <div className="index_ds_item" >
                    <div className="index_imgbox">
                        <img src="../images/noSuc_none.png" alt="" />
                    </div>
                    <p>没有待上课程，赶快去预约一节吧！</p>
                </div>
            </li>
        } else {
            dataObj.map((d, i) => {
                //console.log(d.StartTime)
                let arr = d.StartTime.split(/[- : \/]/);
                //let time = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
                let time = new Date(d.StartTime);
                let nowTime = new Date(this.state.serverTime);
                const week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日', '今天'];

                var weekStr = ''
                if (time.getDay() - 1 == nowTime.getDay() - 1) {
                    weekStr = week[7];
                } else {
                    weekStr = week[time.getDay() - 1];
                }
                let mon = (time.getMonth() + 1);
                mon = mon < 10 ? '0' + mon : mon;
                let day = time.getDate();
                day = day < 10 ? '0' + day : day;
                let h = time.getHours();
                h = h < 10 ? '0' + h : h;
                let ms = time.getMinutes();
                ms = ms < 10 ? '0' + ms : ms;
                let timeStr = mon + '月' + day + '日（' + weekStr + '） ' + h + ":" + ms;

                let stuArr = [];
                for (let j = 0; j < d.StudentList.length; j++) {
                    let srcImg = '';
                    if(d.StudentList[j].StudentImg != ''){
                        stuArr.push(<Avatar src={d.StudentList[j].StudentImg} style={userImg} key={j} />)
                    }else{
                        if(d.StudentList[j].Gender == 1){
                            stuArr.push(<Avatar src='../images/boy.png' style={userImg} key={j} />)
                        }else{
                            stuArr.push(<Avatar src='../images/girl.png' style={userImg} key={j} />)
                        } 
                    }
                }

                let timeCha = time.getTime() - nowTime.getTime();

                let isOpen = '';
                let enterClass = '';
                let leftsecond = parseInt(timeCha / 1000);
                let day1 = Math.floor(leftsecond / (60 * 60 * 24));
                let hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
                let minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
                let second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
                if (timeCha < 600000 && timeCha >= 0) {
                    enterClass = 'b_btn';
                    isOpen = <div className="index_ds_states">
                        <i className="iconfont" style={{ color: "#ff001c", marginRight: '9px' }}>&#xe675;</i>
                        即将开课：
                        <Counter value={second} initM={minute} step='1' />
                    </div>

                }  else if (timeCha < 0) {
                    isOpen = <div className="index_ds_states">正在上课</div>;
                    enterClass = 'b_btn';
                } else if (timeCha >= 14400000) {
                    isOpen = <div className="index_ds_states" style={{ color: '#ff6600', cursor: 'pointer' }} onClick={this.handleClick.bind(this, d.StartTime, d.DemandId)}>取消预约</div>;
                    enterClass = 'b_btn b_grey';
                } else if (timeCha < 14400000 && timeCha >= 600000) {
                    isOpen = <div className="index_ds_states" style={{ cursor: 'pointer' }} onClick={this.handleClick.bind(this, d.StartTime, d.DemandId)}>取消预约</div>;
                    enterClass = 'b_btn b_grey';
                }


                items.push(
                    <li key={i}>
                        <div className="index_ds_item" >
                            <div className="index_ds_header">
                                <div>
                                    <div className="index_ds_time">
                                        {/*今日（周一）12:00*/}
                                        {timeStr}
                                    </div>
                                    {isOpen}
                                </div>
                            </div>
                            <div className="index_b_lesson_item">
                                <Link to={{ pathname: '/Main/Index/ScheduleDtailNo/' + d.LessonId }}>
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
                                    {stuArr}
                                    <a href={"/stuLessonRoom.html?lessonId=" + d.LessonId + "&type=lesson"} target="_blank" className={enterClass}>进入教室</a>
                                </div>
                            </div>
                        </div>
                    </li>
                );
            })
        }




        return (
            <Panel>
                <ul className="lessonList_nav_box">
                    <li>
                        <Link activeClassName="active" ref="weiwanchen" to="/Main/Index/LessonList">
                            未完成（{dataObj.length}）
                        </Link>
                    </li>
                    <li className="l_Line"></li>
                    <li>
                        <Link activeClassName="active" ref="yeswanchen" to="/Main/Index/LessonList/CompletedReact">
                            已结束（{this.state.yesLength}）
                        </Link>
                    </li>
                </ul>
                <div className="Lesson_b_box">
                    <ul className="index_panelbox">
                        {items}
                    </ul>
                </div>
                <div className="yy_mengtai" ref="yyMengtai">
                    <div className="yy" ref="yy">
                        <h5 className="yyTitle">确定取消本次预约</h5>
                        <input className="yyipt yyipts" type="button" ref="no" value="暂不取消" onClick={this.handleClickG.bind(this)} />
                        <input className="yyipt" type="button" ref="ok" value="确定" onClick={this.handleClickQxyy.bind(this)} />
                        <span className="closeX" onClick={this.handleClickChaO.bind(this)}>&times;</span>
                    </div>
                    <div className="bnyy" ref="yys">
                        <h5 className="yyTitle">开课前4小时内不可取消课程</h5>
                        <input className="yyipt bnqx" type="button" value="知道了" onClick={this.handleClickNo.bind(this)} />
                        <span className="closeX" onClick={this.handleClickChaO.bind(this)}>&times;</span>
                    </div>
                    <div className="yys" ref="yyPrompts" style={{ textAlign: 'center', lineHeight: '60px' }}>
                        <h5 className="yyTitle">已取消预约</h5>
                    </div>
                </div>
                <div className="yy_mengtai" ref="yuketip">
                    <div className="bnyy" style={{ display: 'block' }}>
                        <h5 className="yyTitle" ref="yeketipword" style={{ width: '272px', margin: '0 auto', marginBottom: '15px', lineHeight: '26px' }}>您已在该时间预约了其他课程</h5>
                        <input className="yyipt bnqx" type="button" value="知道了" onClick={this.yuketipClick.bind(this)} />
                        <span className="closeX" onClick={this.yuketipClick.bind(this)}>&times;</span>
                    </div>
                </div>
                {/* 课时不足提示 */}
                <div className="yy_mengtai" ref="keshitip">
                    <div className="bnyy" style={{ display: 'block' }}>
                        <h5 className="yyTitle" ref='keshitipword'>您的课时不足，暂时不能预约</h5>
                        <a className="yyipt bnqx" href="http://www.gogo-talk.com:9338/CourseBuy.html" target="_blank">立即购买 </a>
                        <span className="closeX" onClick={this.keshitipClick.bind(this)}>&times;</span>
                    </div>
                </div>
                <div className="yy_mengtai" ref="errortip">
                    <div className="yy_mengtai3" style={{ display: 'block' }}>
                        <div className="yy" style={{ textAlign: 'center', lineHeight: '60px' }}>
                            <h5 ref="errortipword">预约成功</h5>
                        </div>
                    </div>
                </div>
            </Panel>
        )
    }
}

