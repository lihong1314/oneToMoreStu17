import React, { Component } from 'react';
import { Link } from 'react-router';
import Button from './Button';
import { Avatar } from 'antd';
import { Rate, Icon } from 'antd';
import CourseGrad from './CourseGrad';//学员定级
//单元详情
export default class LessonItemUdone extends Component {
    constructor() {
        super();
        this.state = {
            datas: null,
            lessonid: null,
            dateArr: [],
            isActive: 0,
            isActive2: null,
            days: '',
            timeobj1: [],
            timeobj2: [],
            timeobj3: [],
            time: '',
            serverTime: null
        }
    }
    componentDidMount() {
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
                //console.log(json);
                //let times = json.data.SysDateTime.replace('T', ' ');
                this.setState({
                    serverTime: json.data.SysDateTime
                })
                //获取两周的时间
                let nowDate = new Date(json.data.SysDateTime);
                let dataArrs = [];
                const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
                for (let i = 1; i < 14; i++) {
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
                fetch(`http://learnapi.gogo-talk.com:8333/api/Demands/ClassBookDetails?BdeId=${ret.uid}&BookingId=${ret.bid}`,//获取课程详情
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
                            var now = new Date(json.data[0].Time);
                            var yT = new Date(json.data[0].StartTime);
                            // if (yT.getTime() - now.getTime() <= 0) {
                            //     this.setState({
                            //         levels: json.data[0].LevelName,
                            //         FileTittles: json.data[0].FileTittle,
                            //         Describes: json.data[0].Describe,
                            //         StartTimes: '',
                            //         imgUrl: json.data[0].FilePath,
                            //         lessonid: json.data[0].LessionId
                            //     })
                            // } else {
                            //     alert(1)
                            //     this.setState({
                            //         levels: json.data[0].LevelName,
                            //         FileTittles: json.data[0].FileTittle,
                            //         Describes: json.data[0].Describe,
                            //         StartTimes: json.data[0].StartTime,
                            //         imgUrl: json.data[0].FilePath,
                            //         lessonid: json.data[0].LessionId
                            //     })
                            // }
                            this.setState({
                                levels: json.data[0].LevelName,
                                FileTittles: json.data[0].FileTittle,
                                Describes: json.data[0].Describe,
                                StartTimes: json.data[0].StartTime,
                                imgUrl: json.data[0].FilePath,
                                lessonid: json.data[0].LessionId,
                                demandId: json.data[0].DemandId
                            })
        
                        }
                    })
            })
    }
    handleClick() {//取消约课
        this.refs.yyMengtai.style.display = "block";
        this.refs.yy.style.display = "block";
        // let time = new Date();
        // let lessonTime = new Date(this.state.StartTimes);
        // let timeCha = lessonTime.getTime() - time.getTime();
        // let leftsecond = parseInt(timeCha / 1000);
        // let day1 = Math.floor(leftsecond / (60 * 60 * 24));
        // let hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
        // let minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
        // let second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);

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
    handleClickCha() {
        this.refs.yyMengtai.style.display = "none"
    }
    handleClickQxyy() {
        let id = location.href.substring(location.href.lastIndexOf("/") + 1);
        fetch(`http://learnapi.gogo-talk.com:8333/api/Demands/CancelLesson?DemandId=${this.state.demandId}`,
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
                    this.refs.keshitipword.innerHTML = json.msg;
                } else if (json.result == -88) {
                    this.refs.yyPrompts.style.display = "none";
                    this.refs.yuketip.style.display = 'block';
                    this.refs.yy.style.display = 'none';
                    this.refs.yeketipword.innerHTML = json.msg
                }else if(json.result == -1){//课时不足

                }
                else {
                    this.refs.yyPrompts.style.display = "none";
                    this.refs.errortip.style.display = "block";
                    this.refs.errortipword.innerHTML = json.msg;
                    this.refs.yyMengtai.style.display = "none";
                    setTimeout((that) => {
                        this.refs.errortip.style.display = "none";

                    }, 1500)
                }
            })
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
    yuyueClick() {//预约
        this.refs.yukebiao.style.display = 'block';

        fetch(`http://learnapi.gogo-talk.com:8333/api/Demands/GetTch_Lesson?LessonTime=${this.state.days}`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    , 'Authorization': window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                if (json.result == 1) {
                    let obj = json.data;
                    this.setState({
                        timeobj1: json.data[0],
                        timeobj2: json.data[1],
                        timeobj3: json.data[2]
                    })
                }
            })
    }
    yekeCloseClick() {
        this.refs.yukebiao.style.display = 'none';
        this.setState({
            isActive2: null
        })
    }
    yuketipClick() {
        this.refs.yuketip.style.display = 'none';
        window.history.go(0);
    }
    yekeSucClick() {//预约确定

        let ret = {};//定义数组  
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = unescape(c);
        });
        fetch(`http://learnapi.gogo-talk.com:8333/api/Demands/ReserveLessonRoom?BookingId=${ret.bid}&BDEId=${ret.uid}&LessonTime=${this.state.days + ' ' + this.state.time}`,//预约课程
            {
                method: "GET",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    , 'Authorization': window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                if (json.result == 1) {
                    this.refs.yukebiao.style.display = 'none';
                    this.refs.yuketip.style.display = 'block';
                    this.refs.yeketipword.innerHTML = json.msg;
                } else if (json.result == -3) {
                    this.refs.yukebiao.style.display = 'none';
                    this.refs.keshitip.style.display = 'block';
                    window.frames[0].postMessage(JSON.stringify({ token: window.localStorage.getItem('Tonken') }), "*");
                }else if(json.result == -1){//课时不足
                    this.refs.yukebiao.style.display = 'none';
                    this.refs.keshitip.style.display = 'block';
                } 
                else {
                    this.refs.yukebiao.style.display = 'none';
                    this.refs.yuketip.style.display = 'block';
                    this.refs.yeketipword.innerHTML = json.msg;
                }
            })
    }
    keshitipClick() {
        this.refs.keshitip.style.display = "none";
        this.refs.yukebiao.style.display = 'none';
    }
    handleClickO(v1, v2, v3) {//根据日期获取时间
        this.setState({
            days: v1,
            isActive: v3,
            isActive2: null
        });
        fetch(`http://learnapi.gogo-talk.com:8333/api/Demands/GetTch_Lesson?LessonTime=${v1}`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    , 'Authorization': window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                if (json.result == 1) {
                    let obj = json.data;
                    this.setState({
                        timeobj1: json.data[0],
                        timeobj2: json.data[1],
                        timeobj3: json.data[2]
                    })
                }
            })

    }
    timeClick(v, v2) {
        this.setState({
            isActive2: v,
            time: v2
        })
    }
    render() {
        let b_img = require('../images/tu1.png');
        let userImg = { marginLeft: '10px' };
        let { btnText, isShow } = this.props;
        let { dateArr, timeobj1, timeobj2, timeobj3 } = this.state;
        //let yuyueShow = this.state.StartTimes == '' ? { display: 'none' } : { display: 'block' }
        let yuyuebtn;
        if (this.state.StartTimes == "") {
            yuyuebtn = <div className="indexCanaleyuyue" >
                <span style={{ fontSize: '14px' }}>点击预约，可自主选择预约开课时间</span>
                <span onClick={this.yuyueClick.bind(this)} style={{ background: '#ff6600', fontSize: '16px', color: "#fff", borderRadius: '50px' }}>预约</span>
            </div>
        } else if (this.state.lessonid != 0 && this.state.StartTimes != "") {
            let now = new Date(this.state.serverTime);
            let classTime = new Date(this.state.StartTimes);
            let timeCha = classTime.getTime() - now.getTime();
            if (timeCha < 600000) {
                yuyuebtn = <div className="indexCanaleyuyue" style={{ width: '314px' }}>
                    <span>已加入&#x2000;{this.state.StartTimes}&#x2000;的课程</span>
                    <a href={"/stuLessonRoom.html?lessonId=" + this.state.lessonid + "&type=lesson"} target="_blank" className='b_btn' style={{marginLeft:'20px'}}>进入教室</a>
                </div>
            } else {
                yuyuebtn = <div className="indexCanaleyuyue" style={{ width: '314px' }}>
                    <span>已加入&#x2000;{this.state.StartTimes}&#x2000;的课程</span>
                    <span onClick={this.handleClick.bind(this)}>取消预约</span>
                </div>
            }

        } else if (this.state.lessonid == 0 && this.state.StartTimes != "") {
            yuyuebtn = <div className="indexCanaleyuyue" style={{ width: '458px' }}>
                <span>已预约课程：{this.state.StartTimes} ，快邀请小伙伴一起加入吧！</span>
                <span onClick={this.handleClick.bind(this)}>取消预约</span>
            </div>
        }

        let dataArrs = [];
        dateArr.map((d, i) => {//两周时间
            let activeClass = "";
            let selectClass = ''
            if (d.week == '周六' || d.week == '周日') {
                activeClass = 'week'
            } else {
                activeClass = ''
            }
            if (this.state.isActive == i) {
                selectClass = 'active'
            } else {
                selectClass = ''
            }
            dataArrs.push(
                <li key={i} onClick={this.handleClickO.bind(this, d.time, d.data, i)} className={activeClass + ' ' + selectClass}>
                    <p>{d.week}</p>
                    <p>{d.data}</p>
                </li>
            )
        })

        let zao = [];
        let keynum = 0;
        timeobj1.map((d, i) => {
            keynum++;
            let timeClass = '';
            let selectClass = "";
            if (d.Status == 0) {
                timeClass = '';
            } else if (d.Status == 1) {
                timeClass = 'grey';
            }
            if (this.state.isActive2 == keynum) {
                selectClass = 'active'
            } else {
                selectClass = ''
            }
            zao.push(
                <li className={timeClass + ' ' + selectClass} key={keynum} onClick={this.timeClick.bind(this, keynum, d.Time)}>
                    {d.Time}
                </li>
            )
        })
        let zhong = [];
        timeobj2.map((d, i) => {
            keynum++;
            let timeClass = '';
            let selectClass = "";
            if (d.Status == 0) {
                timeClass = '';
            } else if (d.Status == 1) {
                timeClass = 'grey';
            }
            if (this.state.isActive2 == keynum) {
                selectClass = 'active'
            } else {
                selectClass = ''
            }
            zhong.push(
                <li className={timeClass + ' ' + selectClass} key={keynum} onClick={this.timeClick.bind(this, keynum, d.Time)}>
                    {d.Time}
                </li>
            )
        })
        let wan = [];
        timeobj3.map((d, i) => {
            keynum++;
            let timeClass = '';
            let selectClass = "";
            if (d.Status == 0) {
                timeClass = '';
            } else if (d.Status == 1) {
                timeClass = 'grey';
            }
            if (this.state.isActive2 == keynum) {
                selectClass = 'active'
            } else {
                selectClass = ''
            }
            wan.push(
                <li className={timeClass + ' ' + selectClass} key={keynum} onClick={this.timeClick.bind(this, keynum, d.Time)}>
                    {d.Time}
                </li>
            )
        })


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
                                预约课程
                            </div>
                    }
                </div>
                <div className="index_b_lesson_item">
                    <div className="index_b_lesson_img">
                        <img src={this.state.imgUrl} alt="" />
                    </div>
                    <div className="index_b_le_text">
                        <span className="lesson_level">
                            {this.state.levels}
                        </span>
                        <span>
                            {this.state.FileTittles}
                        </span>
                        <p className="lesson_dec">
                            {this.state.Describes}
                        </p>
                    </div>
                    {yuyuebtn}
                    {/* <div className="indexCanaleyuyue" style={yuyueShow}>
                        
                        <span>已预约&#x2000;
                            {this.state.StartTimes}&#x2000;
                            的课程</span>
                        <span onClick={this.handleClick.bind(this)}>取消预约</span>
                    </div> */}
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
                    {/* 预约时间表 */}
                    <div className="yy_mengtai" ref="yukebiao">
                        <div className="yukebiaobox">
                            <h5 className="yyTitle">预约</h5>
                            <span className="closeX" onClick={this.yekeCloseClick.bind(this)}>&times;</span>
                            <p className="tip" >选择日期</p>
                            <ul className="rilibox">
                                {dataArrs}
                            </ul>
                            <p className="tip" style={{ marginBottom: '20px' }}>选择时间</p>
                            <ul className="timebox shangwu">
                                {zao}
                            </ul>
                            <ul className="timebox zhongwu">
                                {zhong}
                            </ul>
                            <ul className="timebox wanshang">
                                {wan}
                            </ul>
                            <p style={{ fontSize: '16px', color: '#ff6600', marginTop: '20px' }}>同一时间下满4位小伙伴预约即可开班成功，开班后系统会及时通知您。</p>
                            {
                                this.state.isActive2 == null ? <button className="shue" style={{ background: "#ccc", border: '1px solid #ccc', pointerEvents: 'none' }}>确定</button>
                                    :
                                    <button className="shue" onClick={this.yekeSucClick.bind(this)}>确定</button>
                            }

                        </div>
                    </div>
                    <CourseGrad />
                    {/* 预约提示 */}
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
                            <a className="yyipt bnqx" href="http://hifan.gogo-talk.com/CourseBuy.html" target="_blank" style={{ display: 'block' }}>立即购买 </a>
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
                    <iframe src="http://hifan.gogo-talk.com/auth.html" style={{ display: 'none', height: '1px', width: '1px' }}></iframe>
                </div>

            </div>
        )
    }
}