import React, { Component } from 'react';
import IndexPerson from './indexPerson';
import IndexBanner from './indexBanner';
import IndexDshang from './indexDshang';
import IndexSuccess from './indexSuccess';
import CourseGrad from './CourseGrad';//学员定级
import LessonUdone from './LessonUdone';//进入教室
import Panel from './panel';


export default class IndexMain extends Component {
    constructor() {
        super();
        this.state = {
            isBuy: 1,
            user: {
                Name: 'student',
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
            stayCourse:[],
            isTuijian: 0
        };
    }
    componentWillMount() {
        fetch("http://learnapi.gogo-talk.com:8333/api/HomePage/GetOrdinaryStudentInfo",
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
                console.log(json);
                if (json.result == 1) {
                    const newTuijian = json.data;
                    this.setState({
                        tuijian: newTuijian,
                        isTuijian: json.result
                    })
                } else {
                    this.setState({
                        isTuijian: json.result
                    })

                }
            })

        fetch("http://learnapi.gogo-talk.com:8333/api/HomePage/GetNotMyLess",//有约课
            {
                method: "GET",
                headers: {
                    Authorization: window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.result == 1) {
                    
                    this.setState({
                        stayCourse:json.data
                    })
                } else {

                }
            })

    }
    render() {
        const { user, tuijian } = this.state;
        let tuijianClass = this.stateisTuijian != -3 ? 'panel p_tuijian p_tuijian_none' : 'panel p_tuijian';
        let baomingClass = user.UserCategory == 0 ? 'panel p_baoming' : 'panel p_baoming p_baoming_none';
        let fenxiangClass = user.UserCategory == 0 ? 'panel p_fenxiang' : 'panel p_fenxiang p_fenxiang_none';
        let sex = user.Gender == "男" ? <i className="iconfont">&#xe694;</i> : <i className="iconfont">&#xe692;</i>;
        let sexClass = user.Gender == "男" ? 'sexBoy' : 'sexGirl';
        let stuPhoto = user.HeadImg == null ? '../images/bg_nav_top.png' : user.HeadImg
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
                            {user.EName}
                        </p>
                        <p>
                            <span>{user.Age}</span>岁
                            <span className={sexClass}>{sex}</span>
                        </p>
                    </div>
                    <div className="_stu_r_img fr">
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
                                <a className="g_help" href="javascript:;">
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
                                <span className="blue b_stu_info_num" style={{ marginLeft: '8px', textDecoration: 'underline' }}>{user.ClassHour}</span>，
                                有效期至：
                                <span className="g_help">{user.ExpireTime}</span>
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
                    <a href="http://www.gogo-talk.com:9338/CourseBuy.html" target="_blank" className="bm_btn">
                        立即报名
                    </a>
                </div>
                {/* <!--  分享 --> */}
                <div className={fenxiangClass}>
                    {/* <!--按钮  --> */}
                    <a href="http://www.gogo-talk.com:9338/CourseBuy.html" target="_blank" className="fenxiang_btn">
                        
                    </a>
                </div>
                {/* <!--推荐  --> */}
                <div className={tuijianClass}>
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
                        <a href="javascript:;" className="b_btn">
                            立即预约
                        </a>
                    </div>
                </div>
                {/* <!--待上课程  --> */}
                <div className='panel p_tuijian'>
                    <div className="p_tuijian_title">
                        <span>
                            <img src="../images/title_bg.jpg" alt="" />
                        </span>
                        待上课程 (0)
                    </div>
                    <Panel border='orange'>
                        <LessonUdone  data={this.state.stayCourse}/>
                    </Panel>
                </div>
                <CourseGrad isGrade={this.state.user.UserCategory}/>
            </div>
        )
    }
}