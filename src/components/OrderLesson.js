import React, { Component } from 'react';
import { Link } from 'react-router';
import Panel from './Panel';
import OrderLessonItem from './orderLessonItem';//课表列表
import CourseGrad from './CourseGrad';//学员定级

export default class OrderLesson extends Component {
    constructor() {
        super();
        this.state = {
            LevelsData: null,
            lessonMuch: null,
            zhuangtai: null,
            index: null,
            bookDate: null,//等级的数据
            numArr: null,
            isGradeShow:true
        };
    }
    componentDidMount() {
        var jsons;
        fetch('http://learnapi.gogo-talk.com:8333/api/HomePage/GetBookList',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: window.localStorage.getItem('Tonken')
                },
            })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    bookDate: json.data
                })
                if (json.data[json.data.length - 1].BookingTitle == "A1") {
                    this.refs.A0.className = "orderbtn orderbtn_red";
                    this.refs.A1.className = "orderbtn orderbtn_disabled";
                    //this.refs.A2.className = "orderbtn orderbtn_disabled";
                    //this.refs.B1.className = "orderbtn orderbtn_disabled";
                    this.setState({
                        zhuangtai: "A0"
                    })
                } else if (json.data[json.data.length - 1].BookingTitle == "A2") {
                    this.refs.A0.className = "orderbtn";
                    this.refs.A1.className = "orderbtn orderbtn_red";
                    //this.refs.A2.className = "orderbtn orderbtn_disabled";
                    //this.refs.B1.className = "orderbtn orderbtn_disabled";
                    this.setState({
                        zhuangtai: "A1"
                    })
                }
                //  else if (json.data[json.data.length - 1].BookingTitle == "A2") {
                //     this.refs.A0.className = "orderbtn";
                //     this.refs.A1.className = "orderbtn";
                //     this.refs.A2.className = "orderbtn orderbtn_red";
                //     this.refs.B1.className = "orderbtn orderbtn_disabled";
                //     this.setState({
                //         zhuangtai: "A2"
                //     })
                // } else if (json.data[json.data.length - 1].BookingTitle == "B1") {
                //     this.refs.A0.className = "orderbtn";
                //     this.refs.A1.className = "orderbtn";
                //     this.refs.A2.className = "orderbtn";
                //     this.refs.B1.className = "orderbtn orderbtn_red";
                //     this.setState({
                //         zhuangtai: "B1"
                //     })
                // }
                this.refs.Plevel.innerHTML = json.data[json.data.length - 1].BookingTitle;
                this.refs.pLevelDec.innerHTML = json.data[json.data.length - 1].Introduction;

                if (json.result == 1) {
                    this.setState({
                        LevelsData: json.data,
                        index: (json.data.length - 1)
                    })
                }
                fetch(`http://learnapi.gogo-talk.com:8333/api/HomePage/GetUnitBookList?bookingid=${json.data[json.data.length - 1].BookingId}`,//获取等级1的单元信息
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                            , 'Authorization': window.localStorage.getItem('Tonken')
                        },
                    })
                    .then(res => res.json())
                    .then(json => {
                        if (json.result == 1) {
                            this.setState({
                                lessonMuch: json.data
                            })
                        }
                    })
            })

        fetch(`http://learnapi.gogo-talk.com:8333/api/HomePage/GetBookOverInfo`,//获取等级1的单元信息
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    , 'Authorization': window.localStorage.getItem('Tonken')
                },
            })
            .then(res => res.json())
            .then(json => {
                if (json.result == 1) {
                    this.setState({
                        numArr: json.data
                    })

                    this.refs.yiwanchen.innerHTML = json.data[json.data.length - 1].UseCount;
                    this.refs.sum.innerHTML = json.data[json.data.length - 1].TotalCount;
                }
            })
    }
    handleClick() {//第一个等级单击事件

        if (0 <= this.state.index) {
            this.refs.A0.className = "orderbtn orderbtn_red";
            if(this.state.numArr.length==1){
                this.refs.A1.className = "orderbtn orderbtn_disabled";
            }else{
                this.refs.A1.className = "orderbtn";
            }
            
            this.refs.Plevel.innerHTML = this.state.bookDate[0].BookingTitle;
            this.refs.pLevelDec.innerHTML = this.state.bookDate[0].Introduction;
            this.refs.yiwanchen.innerHTML = this.state.numArr[0].UseCount;
            this.refs.sum.innerHTML = this.state.numArr[0].TotalCount;
            fetch(`http://learnapi.gogo-talk.com:8333/api/HomePage/GetUnitBookList?bookingid=1`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                        , 'Authorization': window.localStorage.getItem('Tonken')
                    },
                })
                .then(res => res.json())
                .then(json => {

                    if (json.result == 1) {
                        this.setState({
                            lessonMuch: json.data
                        })
                    }
                })
        }
    }
    handleClickSecond() {//第二个等级单击事件
        if (1 <= this.state.index) {
            this.refs.A0.className = "orderbtn";
            
            this.refs.A1.className = "orderbtn orderbtn_red";
            this.refs.Plevel.innerHTML = this.state.bookDate[1].BookingTitle;
            this.refs.pLevelDec.innerHTML = this.state.bookDate[1].Introduction;
            this.refs.yiwanchen.innerHTML = this.state.numArr[1].UseCount;
            this.refs.sum.innerHTML = this.state.numArr[1].TotalCount;
            fetch('http://learnapi.gogo-talk.com:8333/api/HomePage/GetUnitBookList?bookingid=2',
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                        , 'Authorization': window.localStorage.getItem('Tonken')
                    },
                })
                .then(res => res.json())
                .then(json => {
                    if (json.result == 1) {
                        this.setState({
                            lessonMuch: json.data
                        })
                    }
                })
        }
    }
    handleClickThird() {//第三个等级单击事件
        if (2 <= this.state.index) {
            this.refs.A0.className = "orderbtn";
            this.refs.A1.className = "orderbtn";
            this.refs.A2.className = "orderbtn orderbtn_red";
            this.refs.Plevel.innerHTML = this.state.bookDate[2].BookingTitle;
            this.refs.pLevelDec.innerHTML = this.state.bookDate[2].Introduction;
            this.refs.yiwanchen.innerHTML = this.state.numArr[2].UseCount;
            this.refs.sum.innerHTML = this.state.numArr[2].TotalCount;
            fetch('http://learnapi.gogo-talk.com:8333/api/HomePage/GetUnitBookList?bookingid=3',
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                        , 'Authorization': window.localStorage.getItem('Tonken')
                    },
                })
                .then(res => res.json())
                .then(json => {
                    if (json.result == 1) {
                        this.setState({
                            lessonMuch: json.data
                        })
                    }

                })
        }
    }
    handleClickFourth() {//第四个等级单击事件
        if (3 <= this.state.index) {
            this.refs.A0.className = "orderbtn";
            this.refs.A1.className = "orderbtn";
            this.refs.A2.className = "orderbtn";
            this.refs.B1.className = "orderbtn orderbtn_red";
            this.refs.Plevel.innerHTML = this.state.bookDate[3].BookingTitle;
            this.refs.pLevelDec.innerHTML = this.state.bookDate[3].Introduction;
            this.refs.yiwanchen.innerHTML = this.state.numArr[3].UseCount;
            this.refs.sum.innerHTML = this.state.numArr[3].TotalCount;
            fetch('http://learnapi.gogo-talk.com:8333/api/HomePage/GetUnitBookList?bookingid=4',
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                        , 'Authorization': window.localStorage.getItem('Tonken')
                    },
                })
                .then(res => res.json())
                .then(json => {
                    if (json.result == 1) {
                        this.setState({
                            lessonMuch: json.data
                        })
                    }
                })
        }
    }
    gradeFn(){
    }
    render() {
        // console.log(this.state.lessonMuch)
        let dataObj = this.state.lessonMuch;
        let items = [];
        if (dataObj == null) {

        } else {
            dataObj.map(function (d, i) {
                items.push(
                    <li key={i}>
                        <OrderLessonItem ibdeid={d.BDEId} bookingid={d.BookingId} reservation={d.IsReservation} complete={d.IsComplete} unlock={d.IsUnlock} level={d.Level} describe={d.Describe} filePath={d.FilePath} fileTittle={d.FileTittle} />
                    </li>
                );
            })
        }
        return (
            <div>
                {/* <!--推荐  --> */}
                <div className='panel p_tuijian'>
                    <div className="p_tuijian_title">
                        <span>
                            <img src="../images/title_bg.jpg" alt="" />
                        </span>
                        约课
                    </div>
                    <div className="p_tuijian_item">
                        <div className="level_box">
                            <div className="p_level" ref="Plevel">
                                A1
                            </div>
                        </div>
                        <p className="p_level_dec" ref="pLevelDec"></p>
                        <p>已完成<span ref="yiwanchen">0</span>课，共<span ref="sum">0</span>课</p>
                    </div>
                </div>
                {/* 约课  */}
                <ul className="order_name_nav" style={{display:'flex',justifyContent:'center'}}>
                    <li>
                        <a className="orderbtn orderbtn_disabled" ref="A0" onClick={this.handleClick.bind(this)}>
                            A1
                        </a>
                    </li>
                    <li>
                        <a className="orderbtn orderbtn_disabled" ref="A1" onClick={this.handleClickSecond.bind(this)}>
                            A2
                        </a>
                    </li>
                    {/* <li>
                        <a className="" ref="A2" onClick={this.handleClickThird.bind(this)}>
                            A2
                        </a>
                    </li>
                    <li>
                        <a className="" ref="B1" onClick={this.handleClickFourth.bind(this)}>
                            B1
                        </a>
                    </li> */}
                </ul>
                <ul className="order_lesson_box">
                    {items}
                </ul>
                <CourseGrad show={true} gradeFns={this.gradeFn}/>
            </div>
        )
    }
}