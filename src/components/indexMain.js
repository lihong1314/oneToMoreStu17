import React, { Component } from 'react';
import { Link } from 'react-router';
import IndexPerson from './indexPerson';
import IndexBanner from './indexBanner';
import IndexDshang from './indexDshang';
import IndexSuccess from './indexSuccess';
import CourseGrad from './CourseGrad';//学员定级
import LessonUdone from './LessonUdone';//待上课程
import Panel from './panel';
import LessonCompleted from './LessonCompleted';//最近结束 
window.gradFlag = true;

export default class IndexMain extends Component {
    constructor() {
        super();
        this.state = {
            isReate: false,//定级
            isBuy: 1,
            isShow: false, //灰色背景
            isGradeSucShow: false,//定级成功
            user: {
                Name: 'Student',
                HeadImg: '',
                Gender: '',
                Age: '',
                EName: '',
                TotalPoints: 0,//学员积分
                GiftCount: 0,//奖杯
                AccumulateCount: 0,//累积上课次数
                LateCount: 0,//迟到
                AbsentCount: 0,//缺勤次数
                ClassHour: 0,//剩余课时
                ExpireTime: '---',//有效期
                UserCategory: 0,//用户级别,0：普通,1:付费
                IsAbout: 0//是否约课 ,1：已约,0:无                
            },
            tuijian: {
                BdId: 0,//单元id
                BookingId: 0,//教材id
                Describe: '',//单元简介
                FilePath: '',//单元图片地址
                ImageId: 0,//图片id
                LevelName: '',//单元等级
                UnitName: '',//单元名称
            },
            stayCourse: [],//待上课程
            isTuijian: 0,
            recentlyConcluded: [],//最近结束
            isShow2: false,
            isCircleOfFriends:0,
            isPerfectData:0,
            isGradeShow:true
        };
    }
    openClick(val) {
        switch (val) {
            case '2': this.setState({
                isShow2: true
            });
                break;
        }
        fetch("http://learnapi.gogo-talk.com:8333/api/HomePage/GetIntegralState",//是否完善资料与分享朋友圈
        {
            method: "GET",
            headers: {
                'Authorization': window.localStorage.getItem('Tonken')
            }
        })
        .then(res => res.json())
        .then(json => {
            if (json.result == 1) {
                const newUser = json.data;
                this.setState({
                    isPerfectData: json.data.PerfectData,
                    isCircleOfFriends: json.data.CircleOfFriends
                })
            }
        })
    }
    CloseClick(val) {
        switch (val) {
            case '2': this.setState({
                isShow2: false
            });
                break;
        }
    }
   
    handleReate(flag) {
        
        if (flag) {
            fetch("http://learnapi.gogo-talk.com:8333/api/HomePage/GetOrdinaryStudentInfo",//获取学员信息，判断是否是付费用户
                {
                    method: "GET",
                    headers: {
                        'Authorization': window.localStorage.getItem('Tonken')
                    }
                })
                .then(res => res.json())
                .then(json => {
                    if (json.result == 1) {
                        const newUser = json.data;
                        this.setState({
                            isBuy: 2,
                            user: newUser
                        })
                    }
                })
            fetch("http://learnapi.gogo-talk.com:8333/api/HomePage/GetRecommendedCourses",//推荐预约
                {
                    method: "GET",
                    headers: {
                        Authorization: window.localStorage.getItem('Tonken')
                    }
                })
                .then(res => res.json())
                .then(json => {
                    if (json.result == 1) {
                        const newTuijian = json.data;
                        if (newTuijian == null) {
                            this.setState({
                                tuijian: [],
                                isTuijian: 1 //已定级
                            })
                        } else {
                            this.setState({
                                tuijian: newTuijian,
                                isTuijian: json.result
                            })
                        }

                    } else {
                        this.setState({
                            isTuijian: json.result
                        })
                    }
                })

            fetch("http://learnapi.gogo-talk.com:8333/api/HomePage/GetNotMyLess",//待上课程
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
                            stayCourse: json.data
                        })
                    } else {

                    }
                })

            fetch("http://learnapi.gogo-talk.com:8333/api/Lesson/GetLatelyClassInfo",//最近结束
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
                            recentlyConcluded: json.data
                        })
                    } else {

                    }
                })
        }
    }
    gradeFn(){
        window.gradFlag = false;
        this.setState({
            isGradeShow:window.gradFlag
        })
    }
    componentWillMount() {
        
        this.setState({
            isGradeShow:window.gradFlag
        })
        fetch("http://learnapi.gogo-talk.com:8333/api/HomePage/GetRecommendedCourses",//推荐预约
            {
                method: "GET",
                headers: {
                    Authorization: window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                if (json.result == 1) {// 1定级  -2未定级 -3有预约课程
                    this.setState({
                        isReate: false,
                        isShow: false, //灰色背景
                        isGradeSucShow: false//定级成功
                    })

                }else if(json.result == -2){//未定级,isReate为true
                    this.setState({
                        isReate: true,
                        isShow: false, //灰色背景
                        isGradeSucShow: false//定级成功
                    })                   
                }
            })
        if (!this.state.isReate) {            
            fetch("http://learnapi.gogo-talk.com:8333/api/HomePage/GetOrdinaryStudentInfo",//获取学员信息，判断是否是付费用户
                {
                    method: "GET",
                    headers: {
                        'Authorization': window.localStorage.getItem('Tonken')
                    }
                })
                .then(res => res.json())
                .then(json => {
                    if (json.result == 1) {
                        const newUser = json.data;
                        this.setState({
                            isBuy: 2,
                            user: newUser
                        })
                    }
                })
            fetch("http://learnapi.gogo-talk.com:8333/api/HomePage/GetRecommendedCourses",//推荐预约
                {
                    method: "GET",
                    headers: {
                        Authorization: window.localStorage.getItem('Tonken')
                    }
                })
                .then(res => res.json())
                .then(json => {
                    if (json.result == 1) {
                        const newTuijian = json.data;
                        if (newTuijian == null) {
                            this.setState({
                                tuijian: [],
                                isTuijian: 1 //已定级
                            })
                        } else {
                            this.setState({
                                tuijian: newTuijian,
                                isTuijian: json.result
                            })
                        }

                    } else {
                        this.setState({
                            isTuijian: json.result
                        })
                    }
                })

            fetch("http://learnapi.gogo-talk.com:8333/api/HomePage/GetNotMyLess",//待上课程
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
                            stayCourse: json.data
                        })
                    } else {

                    }
                })

            fetch("http://learnapi.gogo-talk.com:8333/api/Lesson/GetLatelyClassInfo",//最近结束
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
                            recentlyConcluded: json.data
                        })
                    } 
                })
        }
    }

    render() {
        const { user, tuijian, stayCourse } = this.state;
        let tuijianClass = this.state.isTuijian == 1 ? 'panel p_tuijian' : 'panel p_tuijian p_tuijian_none';
        let baomingClass = user.UserCategory == 0 ? 'panel p_baoming' : 'panel p_baoming p_baoming_none';
        let fenxiangClass = user.UserCategory == 0 ? 'panel p_fenxiang' : 'panel p_fenxiang p_fenxiang_none';
        let daiShangClass = user.UserCategory == 1 ? 'panel p_tuijian' : 'panel p_tuijian p_tuijian_none';
        let sex = user.Gender == 1 ? <i className="iconfont">&#xe694;</i> : <i className="iconfont">&#xe692;</i>;
        let sexClass = user.Gender == 1 ? 'sexBoy' : 'sexGirl';
        let stuPhoto;
        
        if(user.HeadImg == null|| user.HeadImg == ""){
            if(user.Gender == 1){
                stuPhoto='../images/boy.png'
            }else{
                stuPhoto='../images/girl.png'
            }
        }else{
            stuPhoto = user.HeadImg
        }
        let level=null;
        switch(tuijian.LevelName){
            case 'A0':level=1;
            break;
            case 'A1':level = 2;
            break;
            case 'A2':level = 3;
            break;
            case 'B1':level = 4;
            break;
        }
        
        let tuijianCon;
        if(tuijian.length == 0 || tuijian == null){
            tuijianCon = ''
        }else{
            tuijianCon = <div className={tuijianClass}>
            <div className="p_tuijian_title">
                <span>
                    <img src="../images/title_bg.jpg" alt="" />
                </span>
                推荐预约
            </div>
            <div className="p_tuijian_item">
                <div className="level_box">
                    <div className="p_level">
                        {tuijian.LevelName}
                    </div>
                    {tuijian.UnitName}
                </div>
                <p className="p_level_dec">
                    {tuijian.Describe}
                </p>
                <Link to={{ pathname: "/Main/Index/LessonDetail", query: { uid: tuijian.BdId, bid: tuijian.BookingId, levels: level } }} className="b_btn" style={{width:'109px',height:'32px',lineHeight:'32px',fontSize:'14px',marginTop:'20px'}}>
                    立即预约
                </Link>
                {/* <a href='javascript:;' className="b_btn">
                    立即预约
                </a> */}
            </div>
        </div>
        }
        let isShowHuoqu = this.state.isShow2 ? { display: 'block', height: document.documentElement.clientHeight + 'px' } : { display: 'none', height: document.documentElement.clientHeight + 'px' }
        return (
            <div>

                {/* <!--  学生信息  --> */}
                <div className="panel p_stu_info">
                    <div className="stuImgMsg fl">
                        <div className="head_top_bg"></div>
                        <div className="stuHead">
                            <img src={stuPhoto} alt="" />
                        </div>
                        <p>
                            {user.EName == '' || user.EName == '未完善'? 'Student' : user.EName}
                        </p>
                        <p>
                            <span>{user.Age}</span>岁
                            <span className={sexClass}>{sex}</span>
                        </p>
                    </div>
                    <div className="_stu_r_img fr" style={{marginRight:'100px',paddingTop:'20px'}}>
                        <img src="images/stu_right.png" alt="" />
                    </div>
                    <div className="stuMsg">
                        <ul>
                            <li>
                                <span className="icon_b_mian">
                                    <img src="images/stu_icon_1.png" alt="" />
                                </span>
                                积分：
                                <span className="red b_stu_info_num">{user.TotalPoints}</span>
                                <a className="g_help" style={{fontSize:'14px',marginLeft:'8px'}} onClick={this.openClick.bind(this, '2')}>
                                    如何获取
                                </a>
                            </li>
                            <li>
                                <span className="icon_b_mian">
                                    <img src="images/stu_icon_2.png" alt="" />
                                </span>
                                奖杯：
                                <span className="origin b_stu_info_num">{user.GiftCount}</span>
                            </li>
                            <li>
                                <span className="icon_b_mian">
                                    <img src="images/stu_icon_3.png" alt="" />
                                </span>
                                剩余课时
                                <span className="blue b_stu_info_num" style={{ marginLeft: '8px', textDecoration: 'underline',marginRight:'11px' }}>{user.ClassHour}</span>
                                {
                                    user.ClassHour > 0?
                                    <p>有效期至：
                                    <span className="g_help">{user.ExpireTime}</span>
                                    </p>
                                    :
                                    ''
                                }                                
                            </li>
                        </ul>
                    </div>
                    <ul className="stu_sum_box clearFix">
                        <li>
                            <div className="stu_item_sum stu_item1">
                                <div className="stu_item_bg fr">
                                    <img src="images/icon_qiche1.png" alt="" />
                                </div>
                                <div className="stu_item_left fl">
                                    <span className="iconfont icon-gongzuotongji"></span>
                                </div>
                                <div className="stu_item_text">
                                    <p className="s_red">{user.AccumulateCount}次</p>
                                    <p>累计上课</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="stu_item_sum stu_item2">
                                <div className="stu_item_bg fr">
                                    <img src="images/icon_qiche2.png" alt="" />
                                </div>
                                <div className="stu_item_left fl">
                                    <span className="iconfont icon-iconchidao"></span>
                                </div>
                                <div className="stu_item_text">
                                    <p className="s_red">{user.LateCount}次</p>
                                    <p>上课迟到</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="stu_item_sum stu_item3">
                                <div className="stu_item_bg fr">
                                    <img src="images/icon_qiche3.png" alt="" />
                                </div>
                                <div className="stu_item_left fl">
                                    <span className="iconfont icon-queke"></span>
                                </div>
                                <div className="stu_item_text">
                                    <p className="s_red">{user.AbsentCount}次</p>
                                    <p>上课缺席</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                {/* <!-- line  --> */}
                <div className="line">
                    <img src="images/line.png" alt="" />
                </div>
                {/* <!--报名  --> */}
                <div className={baomingClass}>
                    {/* <!--按钮  --> */}
                    <a href="http://www.gogo-talk.com:9338/CourseBuy.html" target="_blank" className="bm_btn" style={{top:'187px'}}>
                        立即报名
                    </a>
                </div>
                {/* <!--  分享 --> */}
                <div className={fenxiangClass}>
                    {/* <!--按钮  --> */}
                    <a href="http://www.gogo-talk.com:9338/active.html" target="_blank" className="fenxiang_btn">

                    </a>
                </div>

                {/* <!--待上课程  --> */}
                <div className={daiShangClass}>
                    <div className="p_tuijian_title">
                        <span>
                            <img src="../images/title_bg.jpg" alt="" />
                        </span>
                        待上课程 ({stayCourse.length})
                    </div>
                    <Panel border='orange'>
                        <LessonUdone data={this.state.stayCourse} />
                    </Panel>
                </div>
                {/* <!--最近结束  --> */}
                <div className={daiShangClass}>
                    <div className="p_tuijian_title">
                        <span>
                            <img src="../images/title_bg.jpg" alt="" />
                        </span>
                        最近结束
                    </div>
                    <Panel border='red'>
                        <LessonCompleted data={this.state.recentlyConcluded} />
                    </Panel>
                </div>
                {/* <!--推荐  --> */}
                {tuijianCon}
                
                <CourseGrad show={this.state.isGradeShow} gradeFns={this.gradeFn.bind(this)}/>
                {/* 如何获取 */}
                < div className="testTing" style={isShowHuoqu} >
                    <div className="wins w_center w_jifen_gz" style={{padding:'18px 14px'}}>
                        <div className="closeX" onClick={this.CloseClick.bind(this, '2')}>
                            &times;
                        </div>
                        <div className="w_jifen_head">
                            如何获取
                        </div>
                        <div className="win_body">
                            <ul className="huoqu">
                                <li>
                                    <span>首次分享朋友圈</span><i style={{marginLeft:'-9px'}}>+100积分</i>
                                    {
                                        this.state.isCircleOfFriends == 0 ?<button style={{border:'1px solid #999',color:'#999'}}>未完成</button>
                                        :
                                        <button>已完成</button>
                                    }
                                    
                                </li>
                                <li>
                                    <span>首次完善资料</span><i>+50积分</i>
                                    {
                                        this.state.isPerfectData == 0 ?<button style={{border:'1px solid #999',color:'#999'}}>未完成</button>
                                        :
                                        <button>已完成</button>
                                    }
                                </li>
                                <li>
                                    <span>首次设定密码</span><i>+30积分</i><button>已完成</button>
                                </li>
                                <li>
                                    <span>上课结束分享</span><i>+10积分</i><button>不限次数</button>
                                </li>
                                <li>
                                    <span>上课结束评价外教</span><i style={{marginLeft:'-34px'}}>+5积分</i><button>不限次数</button>
                                </li>
                            </ul>
                            <p style={{marginTop:'20px',lineHeight:'24px',color:'#b8b8b8',fontSize:'14px'}}>参与邀请活动，赠送积分哦！</p>
                            <a style={{lineHeight:'24px',color:'#ff6600',fontSize:'14px'}} target="_blank" href='http://www.gogo-talk.com:9338/active.html'>点击去参与》</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}