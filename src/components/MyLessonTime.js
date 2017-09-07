import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { Link, hashHistory } from 'react-router';
import { Spin, Switch, Alert } from 'antd';
import Panel from './panel';
import { Pagination } from 'antd';
import CanvasHuan from './CanvasHuan';

// 我的课时

export default class MyLessonTime extends React.Component {
    constructor() {
        super();
        this.state = {
            time: '---',
            usedClasshour: 0,
            StudentTimeCount: 0,
            classArr: [],
            current: 1,
            total:0,
            pageSize:10,
            isPagination:true,
            sum:0
        }
    }
    componentWillMount() {
        fetch("http://learnapi.gogo-talk.com:8333/api/Lesson/GetClassHour",
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
                        time: newUser.time,
                        usedClasshour: newUser.usedClasshour,
                        StudentTimeCount: newUser.StudentTimeCount,
                        sum:parseInt(newUser.usedClasshour)+ parseInt(newUser.StudentTimeCount)
                    })
                }
            })

        fetch(`http://learnapi.gogo-talk.com:8333/api/Lesson/GetClassHourPage?pageIndex=${this.state.current}&pageSize=${this.state.pageSize}`,
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
                        classArr: newUser,
                        total:json.total
                    })

                    if(this.state.total<=10){
                        this.setState({
                            isPagination:false
                        })
                    }
                }else{
                    this.setState({
                        isPagination:false
                    })
                }
            })
            
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
      getTokenClick(){
        window.frames[0].postMessage(JSON.stringify({token:window.localStorage.getItem('Tonken')}),"*");
    }
    render() {
        const { StudentTimeCount, time, usedClasshour, classArr,isPagination } = this.state;
        let items = [];
        let isPaginationShow = isPagination ? { display: 'flex'}:{display:'none'};
        if(classArr.length==0){
            items.push(
                <tr><td>还没有课时记录</td></tr>
            )
        }else{
            classArr.map((d, i) => {
                items.push(
                    <tr key={i}>
                        <td style={{width:'40%',textAlign:'left',paddingLeft:'20px'}}>{d.TypeName}</td>
                        <td>
                            <span className="g_origin">{d.Hours>0?'+'+d.Hours:d.Hours}</span>
                        </td>
                        <td style={{textAlign:'right',paddingRight:'20px'}}>
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
                            我的课时
                    </div>
                        <div className="order_item_box">
                            <div className="lesson_time_box fl">
                                <div className="fl lt_shengyu">
                                    <p className="g_origin g_f30">
                                        {StudentTimeCount}
                                    </p>
                                    <p className="g_f14">剩余课时</p>
                                </div>
                                <div className="fl ca_jindu">
                                    {/* <img src="../images/wlh_classhour.jpg" /> */}
                                    <CanvasHuan />
                                    {/*<canvas style='display:block' id="canvas" ref="canvas" width="120" height="120" /> */}
                                </div>
                                <div className="fl lt_shengyu">
                                    <p className="g_origin g_f30">
                                        {usedClasshour}
                                    </p>
                                    <p className="g_f14">已使用课时</p>
                                </div>
                            </div>
                            <div className="lesson_youxiao_box fr">
                                <p className="m_lesson_youxiaoqi">
                                    有效期：{time}
                                </p>
                                <p className="m_lesson_goumaikeshi" onClick={this.getTokenClick.bind(this)}>
                                    <a target="_blank" href="http://www.gogo-talk.com:9338/CourseBuy.html" className="b_btn" >购买课时</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </Panel>
                {/* <!--课时记录  --> */}
                <Panel>
                    <div className="b_panel">
                        <div className="b_m_time_head">
                            课时记录
                        </div>
                        <div className="order_item_box" style={{ padding: '0' }}>
                            <table className="lesson_jl">
                                {items}
                            </table>
                        </div>
                        <div className="paginationBox" style={isPaginationShow}>
                            <Pagination current={this.state.current} onChange={this.onChange} total={this.state.total} />
                        </div>
                    </div>
                </Panel>
            </div>
        )
    }
}