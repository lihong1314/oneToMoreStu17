import React, { Component } from 'react';

export default class OrderLessonItem extends Component {
   
    render () {
        let demoImg = require('../images/show1.png');
        let lockImg = require('../images/icon_lock.png');
        let type = this.props.type;

        return (
            <div className="OrderLessonItem">
                <div className="OrderLessonImg">
                    
                    {
                        type == 'lock' ?
                            <div>
                                <img src={ demoImg } className="lock" alt=""/>
                                <img src={lockImg} className="icon_lock" alt=""/>
                            </div>
                        :
                            <img src={ demoImg } alt=""/>
                    }
                    {/*<span className="yuyueImg"></span>*/}
                    {/*<span className="daiyuyueImg"></span>*/}
                </div>
                <div className="OrderLessonDec">
                     <span className="lesson_level lesson_wan">G1</span>
                     <span>Lesson 1-1</span>
                     {/*<img className='yiwancheng' src="../images/yiwangcheng_icon.png" alt=""/>*/}
                     {/*<img className='yuyue' src="../images/duigou.png" alt=""/>*/}
                </div>
            </div>
        )
    }
}