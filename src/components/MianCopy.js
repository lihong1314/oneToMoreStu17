import React, { Component } from 'react';
import IndexPerson from './indexPerson';
import IndexBanner from './indexBanner';
import IndexDshang from './indexDshang';
import IndexSuccess from './indexSuccess';


export default class IndexMain extends Component {
    constructor() {
        super();
        this.state = {
            isBuy:1
        };
    }
    componentDidMount() {
        fetch("http://learnapi.gogo-talk.com:8082/api/Register/GetImageUrl",
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(json => {
                if(json.res == 1){
                    this.setState({
                            isBuy:2
                        })
                    
                }
                    
            })
    }
    render() {
        return (
            <div>
                <div style={{width:'100%',height:'100%',background:'rgba(" 0,0,0,0.6 ")',position:'fixed',top:'0',left:'0',bottom:'0',textAlign:'center'}}>
                        <Link to="/Main/Index">
                            <img src="./images/MainDingji.png" alt=""/>
                        </Link>
                    </div>
                {/* <!--  学生信息  --> */}
                <div className="panel p_stu_info">
                    <div className="stuImgMsg fl">
                        <div className="head_top_bg"></div>
                        <div className="stuHead">
                            <img src="images/bg_nav_top.png" alt="" />
                        </div>
                        <p>
                            Runsun
                        </p>
                        <p>
                            <span>5</span>岁
                            <span></span>
                        </p>
                    </div>
                    <div className="_stu_r_img fr">
                        <img src="images/stu_right.png" alt="" />
                    </div>
                    <div className="stuMsg">
                        <ul>
                            <li>
                                <span  className="icon_b_mian">
                                    <img src="images/stu_icon_1.png" alt="" />
                                </span>
                                积分：
                                <span className="red b_stu_info_num">18</span>
                                <span className="g_help">
                                    如何获得
                                </span>
                            </li>
                            <li>
                                <span className="icon_b_mian">
                                    <img src="images/stu_icon_2.png" alt="" />
                                </span>
                                奖杯：
                                <span className="origin b_stu_info_num">40</span>
                            </li>
                            <li>
                                <span  className="icon_b_mian">
                                    <img src="images/stu_icon_3.png" alt="" />
                                </span>
                                剩余课时
                                <span className="blue b_stu_info_num" style={{marginLeft:'8px'}}>30</span>，
                                有效期至：
                                <span>2018-04-05</span>
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
                                    <p className="s_red">35次</p>
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
                                    <p className="s_red">35次</p>
                                    <p>累计上课</p>
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
                                    <p className="s_red">35次</p>
                                    <p>累计上课</p>
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
                <div className="panel p_baoming">
                    {/* <!--按钮  --> */}
                    <a href="http://www.gogo-talk.com:9338/CourseBuy.html" target="_blank" className="bm_btn">
                        立即报名
                    </a>
                </div>
                {/* <!--  分享 --> */}
                <div className="panel p_fenxiang">
                    {/* <!--按钮  --> */}
                    <a href="http://www.gogo-talk.com:9338/CourseBuy.html" target="_blank" className="fenxiang_btn">
                        
                    </a>
                </div>
                {/* <!--推荐  --> */}
                <div className="panel p_tuijian">
                    <div className="p_tuijian_title">
                        <span>
                            <img src="" alt="" />
                        </span>
                        推荐预约
                    </div>
                    <div className="p_tuijian_item">
                        <div className="level_box">
                            <div className="p_level">
                                G2
                            </div>
                            Reader: Cat School - 绘本：猫咪学校
                        </div>
                        <p className="p_level_dec">
                            to introduce onesslf ; to exchange greeting
                        </p>
                        <a href="#" className="b_btn">
                            立即预约
                        </a>
                    </div>
                </div>
                
            </div>
        )
    }
}