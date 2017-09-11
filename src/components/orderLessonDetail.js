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
            datas: null,
            days: null,
            isShow: false,
            time: '',
            data: '',
            lessonId: '',
            isSuc: false,
            isYue: false,
            dateArr: [],
            isActive: 0,
            DemandId: 0,
            serverTime:null
        }
        this.yuyueClick = this.yuyueClick.bind(this);
    }
    yuyueClick(v1, v2, v3) {//加入
        let id = location.href.substring(location.href.lastIndexOf("/") + 1);
        this.setState({
            isShow: true,
            time: v1.replace('T', " "),
            data: v2,
            lessonId: v3,
            isYue: true
        })


    }
    handleClickO(v1, v2, v3) {//切换日期
        this.setState({
            days: v1,
            isActive: v3
        });
        let ret = {};//定义数组  
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = unescape(c);
        });
        const { dateArr } = this.state;
        fetch(`http://learnapi.gogo-talk.com:8333/api/Demands/GetLessonRoom?LessonTime=${this.state.dateArr[v3].time}&BDEId=${ret.uid}&BookingId=${ret.bid}`,
            {
                method: "GET",
                headers: {
                    'Authorization': window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    datas: json.data
                });

            })
    }

    componentWillMount() {
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
                //获取两周的时间
                let nowDate = new Date(json.data.SysDateTime.replace(/-/g,'/'));
                let dataArrs = [];
                const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
                for (let i = 0; i < 14; i++) {
                    let futDate = new Date(nowDate);
                    futDate.setDate(nowDate.getDate() + i)

                    let m = (futDate.getMonth() + 1) < 10 ? '0' + (futDate.getMonth() + 1) : (futDate.getMonth() + 1);
                    let d = futDate.getDate() < 10 ? '0' + futDate.getDate() : futDate.getDate();
                    let timeStr = futDate.getFullYear() + "-" + m + "-" + d;
                    let dateStr = m + "-" + d;
                    dataArrs.push({
                        data: dateStr,
                        week: weekArr[futDate.getDay()],
                        time: timeStr,
                        val: i
                    });
                }
                this.setState({
                    dateArr: dataArrs,
                    days: dataArrs[0].time
                })

                let ret = {};//定义数组  
                location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
                    ret[b] = unescape(c);
                });
        
                fetch(`http://learnapi.gogo-talk.com:8333/api/Demands/GetLessonRoom?LessonTime=${dataArrs[0].time}&BDEId=${ret.uid}&BookingId=${ret.bid}`,
                    {
                        method: "GET",
                        headers: {
                            'Authorization': window.localStorage.getItem('Tonken')
                        }
                    })
                    .then(res => res.json())
                    .then(json => {
                        if (json.result == 1) {
                            this.setState({
                                datas: json.data
                            });
                        }
                    })
        
        
                fetch(`http://learnapi.gogo-talk.com:8333/api/Demands/ClassBookDetails?BdeId=${ret.uid}&bookingId=${ret.bid}`,
                    {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                            , 'Authorization': window.localStorage.getItem('Tonken')
                        }
                    })
                    .then(res => res.json())
                    .then(json => {
                        if (json.result == 1) {
                            this.setState({
                                DemandId: json.data[0].DemandId
                            })
                        }
                    })
            })
    }
    GradSubmit() {
        this.setState({
            isShow: false
        });

    }
    yekeCloseClick() {
        this.refs.yukebiao.style.display = 'none';
    }
    yuketipClick() {
        this.refs.yuketip.style.display = 'none';
    }
    keshitipClick() {
        this.refs.keshitip.style.display = "none";
        this.setState({
            isShow: false
        })
    }
    yuyueSucClick() {//预约
        // 约课状态返回：
        // 1 成功
        // -1 课时不足
        // -2 课时有效期已过
        // -3 未购买课时
        // -4 剩余课时已被占用
        let ret = {};//定义数组  
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = unescape(c);
        });
        fetch(`http://learnapi.gogo-talk.com:8333/api/Demands/JoinLessonRoom?LessonTime=${this.state.time}&BDEId=${ret.uid}&BookingId=${ret.bid}&LessonId=${this.state.lessonId}`,
            {
                method: "GET",
                headers: {
                    'Authorization': window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                if (json.result == 1) {
                    this.setState({
                        isSuc: true,
                        isYue: false,
                        datas: json.data
                    })
                    let that = this;
                    this.refs.yys.innerHTML = json.msg;
                    setTimeout((that) => {
                        this.setState({
                            isSuc: false,
                            isShow: false
                        })
                        window.history.go(0);
                    }, 1500)

                } else if (json.result == -6) {//已在别地房间加入

                } else if (json.result == -4) {//剩余课时已被占用
                    this.setState({
                        isSuc: true,
                        isYue: false
                    })
                    let that = this;
                    this.refs.yys.innerHTML = json.msg;
                    setTimeout((that) => {
                        this.setState({
                            isSuc: false,
                            isShow: false
                        })

                    }, 1500);
                } else if (json.result == -3) {//未购买课时
                    this.setState({
                        isYue: false
                    })
                    this.refs.keshitip.style.display = 'block';
                    window.frames[0].postMessage(JSON.stringify({ token: window.localStorage.getItem('Tonken') }), "*");
                } else if (json.result == -2) {//课时有效期已过
                    this.setState({
                        isSuc: true,
                        isYue: false
                    })
                    let that = this;
                    this.refs.yys.innerHTML = json.msg;
                    setTimeout((that) => {
                        this.setState({
                            isSuc: false,
                            isShow: false
                        })

                    }, 1500);
                } else if (json.result == -1) {//课时不足
                    this.setState({
                        isYue: false
                    })
                    this.refs.keshitip.style.display = 'block';
                } else if (json.result == 0) {
                    this.setState({
                        isSuc: true,
                        isYue: false
                    })
                    let that = this;
                    this.refs.yys.innerHTML = json.msg;
                    setTimeout((that) => {
                        this.setState({
                            isSuc: false,
                            isShow: false
                        })
                        window.history.go(0);
                    }, 1500);
                }

            })
    }

    render() {

        let dataObj = this.state.datas;
        let items = [];
        console.log('yuyueTime:' + this.state.yuyueTime)
        if (dataObj == null || dataObj.length == 0) {
            items.push(
                <p style={{ lineHeight: '78px', textAlign: 'center' }}>没有开课信息</p>
            )
        } else {
            dataObj.map((d, i) => {
                let str = d.StartTime.replace('T', " ");
                let time = new Date(str.replace(/-/g,'/'));
                let h = time.getHours();
                let m = time.getMinutes();

                let timePiont = (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m);
                let btn;
                let isShow;
                if (d.scount <= 0) {
                    isShow = { display: 'none' }
                } else {
                    isShow = { display: 'block' }
                }
                if (this.state.DemandId != 0) {
                    btn = <span className="class_ordered class_ordegrey" key={i}>加入</span>
                } else {
                    let now = new Date(this.state.serverTime.replace(/-/g,'/'));
                    let classTime = new Date(this.state.StartTimes.replace(/-/g,'/'));
                    let timeCha = classTime.getTime() - now.getTime();
                    if (timeCha < 600000) {
                        btn = <span className="class_ordered class_ordegrey" key={i}>加入</span>
                    } else {
                        btn = <span className="class_ordered wordBtn" key={i} onClick={this.yuyueClick.bind(this, d.StartTime, timePiont, d.LessonId)} >加入</span>
                        
                    }
                }

                items.push(
                    <ul className="class_item_content" key={i} style={isShow}>
                        <li className="joinTime">{timePiont} 开课</li>
                        <li className="joinset">剩余席位：{d.scount}</li>
                        <li>{btn}</li>
                    </ul>
                );
            })
        }
        const { dateArr } = this.state;
        let dataArrs = [];
        dateArr.map((d, i) => {//两周时间
            let activeClass = "";
            let selectClass = ''
            let borderNo = i == 0 ? { borderLeft: '0px' } : {}
            if (d.week == '周六' || d.week == '周日') {
                activeClass = 'date_item mo'
            } else {
                activeClass = 'date_item'
            }
            if (this.state.isActive == i) {
                selectClass = 'active'
            } else {
                selectClass = ''
            }
            dataArrs.push(
                <div key={i} onClick={this.handleClickO.bind(this, d.time, d.data, i)} ref="dayO" className={activeClass + ' ' + selectClass} style={borderNo}>
                    <span className="date_day">{d.week}</span>
                    <span className="date_date">{d.data}</span>
                </div>
            )
        })

        let yuyueSucClass = this.state.isSuc ? { display: 'block' } : { display: 'none' };
        let isShowYue = this.state.isYue ? { display: 'block' } : { display: 'none' };
        let isShowz = this.state.isShow ? { display: 'block', height: document.documentElement.clientHeight + 'px' } : { display: 'none', height: document.documentElement.clientHeight + 'px' }
        return (
            <div className="OrderLessonDetail" style={{ borderTop: '6px solid #ffc000' }}>
                <Breadcrumb>
                    <Link to="/Main/Index/YueLesson" style={{ color: "#ff6600" }}><i className="iconfont" style={{ fontSize: '24px', position: 'relative', top: '3px' }}>&#xe648;</i>返回</Link>
                </Breadcrumb>
                <div className="b_lesson_detail">
                    <LessonItemUdone btnText="进入教室" isShow="false" />
                </div>
                <div className="order_main">
                    <div className="order_date">
                        {dataArrs}
                    </div>
                    <div className="order_class" style={{ border: '0px', marginTop: '20px' }}>
                        {/* <ul className="class_item_title">
                            <li>开课时间 <i className="iconfont">&#xe621;</i></li>
                            <li>房间数 <i className="iconfont">&#xe6f6;</i></li>
                            <li>剩余席位 <i className="iconfont">&#xe607;</i></li>
                            <li>消耗课时 <i className="iconfont">&#xe63a;</i></li>
                            <li>操作</li>
                        </ul> */}
                        <div className="joinbox">
                            {items}
                        </div>
                    </div>
                    <div className="testTing" style={isShowz} >
                        <div className="yy_mengtai2" ref="yy_mengtais" style={isShowYue} >
                            <div className="yy" ref="yys">
                                <h5>本次预约消耗1课时，确定预约？</h5>
                                <div>
                                    <button onClick={(e) => this.yuyueSucClick(e)}>确定</button>
                                </div>
                                <span className="closeX" onClick={(e) => this.GradSubmit(e)}>&times;</span>
                            </div>
                        </div>
                        <div className="yy_mengtai3" style={yuyueSucClass}>
                            <div className="yy" ref="yys" style={{ textAlign: 'center', lineHeight: '60px' }}>
                                <h5>预约成功</h5>
                            </div>
                        </div>
                    </div>
                    {/* 预约提示 */}
                    <div className="yy_mengtai" ref="yuketip">
                        <div className="bnyy" style={{ display: 'block' }}>
                            <h5 className="yyTitle" ref="yeketipword">您已在该时间预约了其他课程</h5>
                            <input className="yyipt bnqx" type="button" value="知道了" onClick={this.yuketipClick.bind(this)} />
                            <span className="closeX" onClick={this.yuketipClick.bind(this)}>&times;</span>
                        </div>
                    </div>
                    {/* 课时不足提示 */}
                    <div className="yy_mengtai" ref="keshitip">
                        <div className="bnyy" style={{ display: 'block' }}>
                            <h5 className="yyTitle">您的课时不足，暂时不能预约</h5>
                            <a className="yyipt bnqx" href="http://hifan.gogo-talk.com/CourseBuy.html" target="_blank" style={{ display: 'block' }}>立即购买 </a>
                            <span className="closeX" onClick={this.keshitipClick.bind(this)}>&times;</span>
                        </div>
                    </div>
                    <iframe src="http://hifan.gogo-talk.com/auth.html" style={{ display: 'none', height: '1px', width: '1px' }}></iframe>
                </div>
            </div >
        )
    }
}