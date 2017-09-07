import React, { Component } from 'react';
import { Link } from 'react-router';
//  
export default class OrderLessonItem extends Component {

    render() {
        let demoImg = this.props.filePath ? this.props.filePath : require('../images/show1.png');
        let lockImg = require('../images/icon_lock.png');
        let type = this.props.type;
        let fileTitle = this.props.fileTittle.split(' ')[1];
        let level;
        switch (this.props.level) {
            case 1: level = 'A1';
                break;
            case 2: level = 'A2';
                break;
            case 3: level = 'A3';
                break;
            case 4: level = 'B1';
                break;
        }


        let topImg;
        if (this.props.unlock == 0) {//未解锁
            topImg = <div>
                <img src={demoImg} className="lock" alt="" />
                <img src={lockImg} className="icon_lock" alt="" />
            </div>
        } else {// 已解锁
            if (this.props.reservation == 1) {//已预约
                if (this.props.complete == 1) {//已完成
                    topImg = <div>
                        <Link to={{ pathname: "/Main/Index/LessonDetail", query: { uid: this.props.ibdeid, bid: this.props.bookingid, levels: this.props.level } }}><img src={demoImg} alt="" /></Link>
                        <span className="yuyueImg"></span>
                    </div>
                } else {//未完成
                    topImg = <div>
                        <Link to={{ pathname: "/Main/Index/LessonDetail", query: { uid: this.props.ibdeid, bid: this.props.bookingid, levels: this.props.level } }}><img src={demoImg} alt="" /></Link>
                        <span className="yuyueImg"></span>
                    </div>
                }
            } else {//未预约
                if (this.props.complete == 1) {//已完成
                    topImg = <div>
                        <Link to={{ pathname: "/Main/Index/LessonDetail", query: { uid: this.props.ibdeid, bid: this.props.bookingid, levels: this.props.level } }}><img src={demoImg} alt="" /></Link>
                    </div>
                } else {//未完成
                    topImg = <div>
                        <Link to={{ pathname: "/Main/Index/LessonDetail", query: { uid: this.props.ibdeid, bid: this.props.bookingid, levels: this.props.level } }}><img src={demoImg} alt="" /></Link>
                        <span className="daiyuyueImg"></span>
                    </div>
                }
            }
        }
        let bottomImg;
        if (this.props.unlock == 0) {//未解锁
            bottomImg = <div>
                <span className="lesson_level lesson_wan">{level}</span>
                <span>{fileTitle}</span>
            </div>
        } else {// 已解锁
            if (this.props.reservation == 1) {//已预约

                if (this.props.complete == 1) {//已完成
                    // bottomImg = <div>
                    //     <span className="lesson_level lesson_yuyue">{level}</span>
                    //     <span>{fileTitle}</span>
                    //     <img className='yiwancheng' src="../images/yiwangcheng_icon.png" alt=""/>
                    // </div>
                    bottomImg = <div>
                        <span className="lesson_level lesson_yuyue">{level}</span>
                        <span>{fileTitle}</span>
                        <img className='yuyue' src="../images/duigou.png" alt="" />
                    </div>
                } else {//未完成
                    bottomImg = <div>
                        <span className="lesson_level lesson_wan">{level}</span>
                        <span>{fileTitle}</span>
                        <img className='yuyue' src="../images/duigou.png" alt="" />
                    </div>
                }
            } else {//未预约
                if (this.props.complete == 1) {//已完成
                    bottomImg = <div>
                        <span className="lesson_level lesson_wan">{level}</span>
                        <span>{fileTitle}</span>
                        <img className='yiwancheng' src="../images/yiwangcheng_icon.png" alt="" />
                    </div>
                } else {//未完成
                    bottomImg = <div>
                        <span className="lesson_level">{level}</span>
                        <span>{fileTitle}</span>
                    </div>
                }
            }
        }


        return (
            <div className='OrderLessonItem'>
                <div className="OrderLessonImg">
                    {topImg}
                </div>
                <div className="OrderLessonDec">
                    {bottomImg}
                </div>
            </div>
        )
    }
}