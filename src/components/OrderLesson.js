import React, { Component } from 'react';
import { Link } from 'react-router';
import Panel from './Panel';
import OrderLessonItem from './orderLessonItem';//课表列表

export default class OrderLesson extends Component {
    constructor() {
        super();
        this.state = {
            LevelsData: null
        };
    }
    componentDidMount() {
        fetch('http://learnapi.gogo-talk.com:8333/api/HomePage/GetBookList',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    , 'Authorization': window.localStorage.getItem('Tonken')
                },
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.result == 1) {
                    this.setState({
                        LevelsData: json.data
                    })
                }

            })
            fetch('http://learnapi.gogo-talk.com:8333/api/Lesson/GetLatelyClassInfo',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    , 'Authorization': window.localStorage.getItem('Tonken')
                },
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.result == 1) {
                    
                }

            })
    }
    render() {
        // let repoList = this.state.LevelsData.map((item) => {
        //     return (
        //         <li>
        //             <Link to="/Main/Index/YueLesson/`${item.BookingId}`" className="orderbtn">
        //                 { item.BookingTitle }
        //             </Link>
        //         </li>
        //     )
        // })
        // console.log(this.state.LevelsData);
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
                            <div className="p_level">
                                G2
                            </div>
                        </div>
                        <p className="p_level_dec">
                            to introduce onesslf ; to exchange greeting
                        </p>
                        <p>已完成3课，共15课</p>
                    </div>
                </div>
                {/* 约课  */}
                <ul className="order_name_nav">
                     <li>
                        <a className="orderbtn">
                            G1
                        </a>
                    </li>
                    <li>
                        <a className="orderbtn orderbtn_red">
                            G1
                        </a>
                    </li>
                    <li>
                        <a className="orderbtn orderbtn_disabled">
                            G1
                        </a>
                    </li>
                    <li>
                        <a className="orderbtn orderbtn_disabled">
                            G1
                        </a>
                    </li> 
                </ul>
                <ul className="order_lesson_box">
                    <li>
                        <Link to="/Main/Index/LessonDetail/1">
                            <OrderLessonItem />
                        </Link>
                    </li>
                    <li>
                        <OrderLessonItem />
                    </li>
                    <li>
                        <OrderLessonItem />
                    </li>
                    <li>
                        <OrderLessonItem />
                    </li>
                    <li>
                        <OrderLessonItem type="lock" />
                    </li>
                </ul>
            </div>
        )
    }
}