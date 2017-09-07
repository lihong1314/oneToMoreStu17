import React, { Component } from 'react';
import { Link } from 'react-router';
import Panel from './panel';
import LessonUdone from './LessonUdone';//未完成
import LessonCompleted from './LessonCompleted';//已完成 

export default class LessonListNav extends Component {
    constructor() {
        super();
        this.state = {
            yesCouse: {// 已完成
                dataArr: [],
                flag: false,
                length:0
            },
            noCouse: {//未完成
                dataArr: [],
                flag: false,
                length:0
            },
            noClick:false
        };
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
                    const {yesCouse ,noCouse} = this.state   
                    this.setState({
                        noCouse: {
                            dataArr: json.data,
                            flag: true,
                            length:json.total
                        },
                        yesCouse:{
                            dataArr:[],
                            flag:false,
                            length:0
                        }
                    })
                    this.refs.weiwanchen.className = 'active';
                }else{
                    const {yesCouse ,noCouse} = this.state   
                    this.setState({
                        noCouse: {
                            dataArr: [],
                            flag: true,
                            length:0
                        },
                        yesCouse:{
                            flag:false,
                            length:yesCouse.length
                        }
                    })
                    this.refs.yeswanchen.className= '';
                    this.refs.weiwanchen.className = 'active';
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
                    const {yesCouse ,noCouse} = this.state                    
                    this.setState({
                        yesCouse: {
                            length:json.total
                        },
                        noCouse:{
                            dataArr: noCouse.dataArr,
                            flag: true,
                            length:noCouse.length
                        }
                    })
                    this.refs.weiwanchen.className = '';
                } else{
                    const {yesCouse ,noCouse} = this.state   
                    this.setState({
                        yesCouse: {
                            dataArr: [],
                            flag: true,
                            length:0
                        },
                        noCouse:{
                            flag:false,
                            length:noCouse.length
                        }
                    })
                    this.refs.weiwanchen.className= '';
                    this.refs.yeswanchen.className = 'active';
                } 
            })
    }
    noSucClick(){
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
                    const {yesCouse ,noCouse} = this.state   
                    this.setState({
                        noCouse: {
                            dataArr: json.data,
                            flag: true,
                            length:json.total
                        },
                        yesCouse:{
                            dataArr:[],
                            flag:false,
                            length:yesCouse.length
                        }
                    })
                    this.refs.yeswanchen.className= '';
                    this.refs.weiwanchen.className = 'active';
                }else{
                    const {yesCouse ,noCouse} = this.state   
                    this.setState({
                        noCouse: {
                            dataArr: [],
                            flag: true,
                            length:0
                        },
                        yesCouse:{
                            flag:false,
                            length:yesCouse.length
                        }
                    })
                    this.refs.yeswanchen.className= '';
                    this.refs.weiwanchen.className = 'active';
                } 
            })
    }
    yesSucClick() {
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
                    const {yesCouse ,noCouse} = this.state                    
                    this.setState({
                        yesCouse: {
                            dataArr: json.data,
                            flag: true,
                            length:json.total
                        },
                        noCouse:{
                            dataArr:[],
                            flag:false,
                            length:noCouse.length
                        }
                    })
                    this.refs.yeswanchen.className= 'active';
                    this.refs.weiwanchen.className = '';
                } else{
                    const {yesCouse ,noCouse} = this.state   
                    this.setState({
                        yesCouse: {
                            dataArr: [],
                            flag: true,
                            length:0
                        },
                        noCouse:{
                            flag:false,
                            length:noCouse.length
                        }
                    })
                    this.refs.weiwanchen.className= '';
                    this.refs.yeswanchen.className = 'active';
                } 
            })
    }
    render() {
        const { yesCouse,noCouse} = this.state
        let yesShow = yesCouse.flag ? <LessonCompleted data={yesCouse.dataArr} /> : '';
        let noShow = noCouse.flag ? <LessonUdone data={noCouse.dataArr} /> : '';

        return (
            // <Panel>
            //     <ul className="lessonList_nav_box">
            //         <li>
            //             <a className="" ref="weiwanchen" onClick={this.noSucClick.bind(this)}>
            //                 未完成（{noCouse.length}）
            //             </a>
            //             {/* <Link className="active" ref="weiwanchen" to="/Main/Index/LessonList/Undone">
            //                 未完成（{noCouse.length}）
            //             </Link> */}
            //         </li>
            //         <li className="l_Line"></li>
            //         <li>
            //             <a className="" ref="yeswanchen" onClick={this.yesSucClick.bind(this)}>
            //                 已结束（{yesCouse.length}）
            //             </a>
            //             {/* <Link className="active" ref="yeswanchen" to="/Main/Index/LessonList/Completed">
            //                 已结束（{yesCouse.length}）
            //             </Link> */}
            //         </li>
            //     </ul>
            //     <div className="Lesson_b_box">
            //         {yesShow}
            //         {noShow}
            //     </div>
            // </Panel>
            <Panel>
            <ul className="lessonList_nav_box">
                <li>
                    <Link className="active" ref="weiwanchen" to="/Main/Index/LessonList/UndoneReact">
                        未完成（{noCouse.length}）
                    </Link>
                </li>
                <li className="l_Line"></li>
                <li>
                    <Link className="active" ref="yeswanchen" to="/Main/Index/LessonList/CompletedReact">
                        已结束（{yesCouse.length}）
                    </Link>
                </li>
            </ul>
           
        </Panel>
        )
    }
}