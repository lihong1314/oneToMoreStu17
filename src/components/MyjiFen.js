// jifen_copy.jpg
import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { Link, hashHistory } from 'react-router';
import { Spin, Switch, Alert } from 'antd';
import Panel from './panel';
import { Pagination } from 'antd';

let b_img = require('../images/login_r_img.png');

export default class MyJiFen extends React.Component {
    constructor() {
        super();
        this.state = {
            isShow3: false,
            isShow2: false,
            isShow1: false,
            isShow4: false,
            jifenArr: [],
            jifenTip: '',
            current: 1,
            total: 0,
            pageSize: 10,
            isPagination: true,
            num: 0,
            isCircleOfFriends:0,
            isPerfectData:0
        }
    }
    openClick(val) {
        switch (val) {
            case '1': this.setState({
                isShow1: true
            });
                break;
            case '2': this.setState({
                isShow2: true
            });
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
                break;
            case '3': this.setState({
                isShow3: true
            });
                break;
        }
    }
    onChange = (page) => {
        fetch(`http://learnapi.gogo-talk.com:8333/api/Lesson/GetClassHourPage?pageIndex=${page}&pageSize=${this.state.pageSize}`,
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
                        classArr: newUser
                    })
                }
            })
        this.setState({
            current: page
        });
    }
    CloseClick(val) {
        switch (val) {
            case '1': this.setState({
                isShow1: false
            });
                break;
            case '2': this.setState({
                isShow2: false
            });
                break;
            case '3': this.setState({
                isShow3: false
            });
                break;
        }
    }
    DuiHuanSuc() {
        fetch(`http://learnapi.gogo-talk.com:8333/api/GiveCouponIntegral/Exchange`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    , 'Authorization': window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                if (json.result == 1) {
                    let zonFen = this.state.num;
                    let br = <br />
                    this.refs.jifentip.innerHTML = "兑换成功<br>已充值到我的课时"
                    this.setState({
                        isShow4: true
                    })
                    let that = this;
                    setTimeout(function () {
                        that.setState({
                            isShow4: false,
                            num: zonFen - 300
                        })
                        this.refs.jifentip.innerHTML = ""
                    }, 1500)
                } else {
                    this.setState({
                        isShow4: true,
                        jifenTip: json.msg
                    })
                    let that = this;
                    this.refs.jifentip.innerHTML = json.msg
                    setTimeout(function () {
                        that.setState({
                            isShow4: false
                        })
                    }, 1500)
                }

            })

    }
    componentWillMount() {
        fetch(`http://learnapi.gogo-talk.com:8333/api/HomePage/GetStudentAllScore`,
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
                        num: json.data[0]
                    })
                }
            })
        fetch(`http://learnapi.gogo-talk.com:8333/api/HomePage/GetScoreList?pageIndex=${this.state.current}&pageSize=${this.state.pageSize}`,
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
                        jifenArr: json.data,
                        total: json.total
                    })
                    if (this.state.total <= 10) {
                        this.setState({
                            isPagination: false
                        })
                    }
                }
            })
    }
    onChange = (page) => {
        fetch(`http://learnapi.gogo-talk.com:8333/api/HomePage/GetScoreList?pageIndex=${page}&pageSize=${this.state.pageSize}`,
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
                        jifenArr: json.data
                    })
                }
            })
        this.setState({
            current: page
        });
    }
    render() {
        const { isShow3, isShow2, isShow1, isShow4, jifenArr, jifenTip, isPagination } = this.state;
        let isShowGuizi = isShow3 ? { display: 'block', height: document.documentElement.clientHeight + 'px' } : { display: 'none', height: document.documentElement.clientHeight + 'px' }
        let isShowHuoqu = isShow2 ? { display: 'block', height: document.documentElement.clientHeight + 'px' } : { display: 'none', height: document.documentElement.clientHeight + 'px' }
        let isShowDuihuan = isShow1 ? { display: 'block', height: document.documentElement.clientHeight + 'px' } : { display: 'none', height: document.documentElement.clientHeight + 'px' }
        let isShowDuihuanSuc = isShow4 ? { display: 'block', height: document.documentElement.clientHeight + 'px' } : { display: 'none', height: document.documentElement.clientHeight + 'px' }
        let items = [];
        let sum = 0;
        let isPaginationShow = isPagination ? { display: 'flex' } : { display: 'none' };
        if (jifenArr.length == 0 || jifenArr == null) {
            items.push(
                <tr>
                    <td>暂无积分明细</td>
                </tr>
            )
        } else {
            jifenArr.map((d, i) => {
                let type;
                if (d.Types == 1) {
                    type = '+';
                } else if (d.Types == 2) {
                    type = '-';
                }
                sum += d.TotalPoints
                items.push(
                    <tr key={i}>
                        <td style={{ textAlign: 'left', textIndent: '20px' }}>{d.SourceName}</td>
                        <td>
                            <span className="g_origin">{type}{d.Points}</span>
                        </td>
                        <td style={{ textAlign: 'right', paddingRight: '20px' }}>
                            <span className="g_f9">{d.CreateTime}</span>
                        </td>
                    </tr>
                )
            })
        }

        return (
            <div>
                <Panel border="orange">
                    <div className="b_panel" style={{ paddingBottom: '0', borderBottom: '1px solid #ccc' }}>
                        <div className="b_m_time_head">
                            我的积分
                    </div>
                        <div className="myjifenbox">
                            <p><i><img src="../images/jifen.png"></img></i>{this.state.num}<span>积分</span></p>
                            <ul>
                                <li className="word" onClick={this.openClick.bind(this, '1')}>积分兑换</li>
                                <li><span>|</span></li>
                                <li className="word" onClick={this.openClick.bind(this, '2')}>如何获取</li>
                                <li><span>|</span></li>
                                <li className="word" onClick={this.openClick.bind(this, '3')}>积分规则</li>
                            </ul>
                        </div>
                    </div>
                </Panel>
                <Panel>
                    <div className="b_panel" style={{ paddingBottom: '0', borderBottom: '1px solid #ccc' }}>
                        <div className="b_m_time_head">
                            积分明细
                        </div>
                    </div>
                    <table className="lesson_jl">
                        {items}

                    </table>
                    <div className="paginationBox" style={isPaginationShow}>
                        <Pagination current={this.state.current} onChange={this.onChange} total={this.state.total} />
                    </div>
                </Panel>
                {/* 积分规则 */}
                < div className="testTing" style={isShowGuizi} >
                    <div className="wins w_center w_jifen_gz">
                        <div className="closeX" onClick={this.CloseClick.bind(this, '3')}>
                            &times;
                        </div>
                        <div className="w_jifen_head">
                            积分规则
                        </div>
                        <div className="win_body" style={{ marginBottom: '20px' }}>
                            <ul className="guize">
                                <li style={{ textIndent: '0' }}>
                                    一、积分获取：
                                </li>
                                <li>
                                    1、首次分享朋友圈：第一次分享‘了解报名页面’，获得100积分。
                                </li>
                                <li>
                                    2、首次完善资料：第一次完善资料性别、中文名称、英文名称、出生日期视为完善资料，获得50积分。
                                </li>
                                <li>
                                    3、首次设定密码：第一次设定密码成功后，获得30积分。
                                </li>
                                <li>
                                    4、上课结束评价外教：课程结束后，点击微信通知或页面上评价按钮进行评价，评价成功后，获得5积分。
                                </li>
                                <li>
                                    5、上课结束分享：课程结束后评价成功后，点击去分享，分享到朋友圈或好友，获得10积分。
                                </li>
                                <li>
                                    注：关注hi翻外教课堂‘邀请活动信息’或其他活动信息，可拿更多积分
                                </li>
                            </ul>
                            <ul className="guize">
                                <li style={{ textIndent: '0' }}>
                                    二、兑换规则
                                </li>
                                <li>
                                    1、目前积分只可兑换课时：
                                </li>
                                <li>
                                    · 课时——请查看‘积分兑换页’查看积分并进行兑换。
                                </li>
                                <li>
                                    · 其他——请参考其他推出的新兑换礼品。
                                </li>
                                <li>
                                    2、兑换后会扣减“兑换积分”，兑换的礼品及兑换积分不能退回；不能折算为现金、也不能再次兑换为积分；兑换的课时，请到‘我的课时’查看课时明细。
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* 如何获取 */}
                < div className="testTing" style={isShowHuoqu} >
                    <div className="wins w_center w_jifen_gz" style={{ padding: '18px 14px' }}>
                        <div className="closeX" onClick={this.CloseClick.bind(this, '2')}>
                            &times;
                </div>
                        <div className="w_jifen_head">
                            如何获取
                </div>
                        <div className="win_body" style={{ marginBottom: '20px' }}>
                            <ul className="huoqu">
                                <li>
                                    <span>首次分享朋友圈</span><i style={{ marginLeft: '-9px' }}>+100积分</i>
                                    {
                                        this.state.isCircleOfFriends == 0 ? <button style={{ border: '1px solid #999', color: '#999' }}>未完成</button>
                                            :
                                            <button>已完成</button>
                                    }

                                </li>
                                <li>
                                    <span>首次完善资料</span><i>+50积分</i>
                                    {
                                        this.state.isPerfectData == 0 ? <button style={{ border: '1px solid #999', color: '#999' }}>未完成</button>
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
                                    <span>上课结束评价外教</span><i style={{ marginLeft: '-34px' }}>+5积分</i><button>不限次数</button>
                                </li>
                            </ul>
                            <p style={{ marginTop: '20px', lineHeight: '24px', color: '#b8b8b8', fontSize: '14px' }}>参与邀请活动，赠送积分哦！</p>
                            <a style={{ lineHeight: '24px', color: '#ff6600', fontSize: '14px' }} target="_blank" href='http://www.gogo-talk.com:9338/active.html'>点击去参与》</a>
                        </div>
                    </div>
                </div>
                {/* 积分兑换 */}
                < div className="testTing" style={isShowDuihuan} >
                    <div className="wins w_center w_jifen_gz">
                        <div className="closeX" onClick={this.CloseClick.bind(this, '1')}>
                            &times;
                        </div>
                        <div className="win_body" style={{ marginTop: '20px' }}>
                            <img src="../images/jifenkai.png" />
                        </div>
                        <div className="win_footer">
                            {
                                this.state.num >= 300 ?
                                    <a className="b_btn" onClick={this.DuiHuanSuc.bind(this)} style={{ width: '202px', height: '44px', lineHeight: '44px', fontSize: '20px' }}>
                                        300积分/兑换
                            </a>
                                    :
                                    <span className="b_btn" style={{ background: '#ccc', width: '202px', height: '44px', lineHeight: '44px', fontSize: '20px' }}>
                                        300积分/兑换
                            </span>
                            }

                            <p>当前剩余{this.state.num}积分</p>
                        </div>
                    </div>
                </div>
                {/* 兑换成功 */}
                < div className="testTing" style={isShowDuihuanSuc} >
                    <div className="yy" ref="yys" style={{ textAlign: 'center', lineHeight: '60px' }}>
                        <h5 ref="jifentip" style={{ lineHeight: '30px' }}></h5>
                    </div>
                </div>
            </div>
        )
    }
}