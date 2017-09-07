import React, { Component } from 'react';
import { Link } from 'react-router';
import { Breadcrumb } from 'antd';
import { Rate } from 'antd';

import LessonCompleted from './LessonCompleted';//最近结束 
export default class OrderLessonDetail extends Component {
    constructor() {
        super();
        this.state = {
            appraise: [],
            teacherId: null,
            teacherImg: '',
            teacherName: '',
            lessArr:[],
            teacherGender:0
        }
    }
    componentWillMount() {
        const lessonid = this.props.params.id;
        fetch(`http://learnapi.gogo-talk.com:8333/api/HomePage/GetCompleteLessonInfo?lessonId=${lessonid}`,//课后评价信息
            {
                'method': "GET",
                headers: {
                    Authorization: window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                if (json.result == 1) {
                    this.setState({
                        appraise: json.data
                    })
                } else {
                }
            })
        fetch(`http://learnapi.gogo-talk.com:8333/api/HomePage/GetLessonDeatil?lessonId=${lessonid}`,//课程详情
            {
                'method': "GET",
                headers: {
                    Authorization: window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                if (json.result == 1) {
                    this.setState({
                        lessArr: json.data,
                        teacherId: json.data[0].TeacherId,
                        teacherImg: json.data[0].TeacherImg,
                        teacherName: json.data[0].TeacherName,
                        teacherGender:json.data[0].TeacherGender
                    })
                } else {
                }
            })
    }
    BackClick() {
        window.history.go(-1);
    }
    render() {
        const { appraise, teacherImg, teacherName ,lessArr,teacherGender} = this.state;
        let items = [];
        appraise.map((d, i) => {
            let imgurl = '';
            if(d.HeadImg == ""){
                if(d.Gender ==1){
                    imgurl = '../images/boy.png';
                }else{
                    imgurl = '../images/girl.png';
                }
            }else{
                imgurl = d.HeadImg
            }
            items.push(
                <li key={i}>
                    <div className="stuPhotoBox">
                        <img src={imgurl} alt="" />
                        </div>
                    <div className="stuComponent">
                        <h2>{d.EName}<span>{d.EvaluateTime == '' ? '--':d.EvaluateTime}</span></h2>
                        <div className="index_ds_states">
                            <Rate disabled defaultValue={d.Points} style={{ color: "red" }} />
                        </div>
                        <p>{d.EvaluateContent==""?'这个学员很懒，没课后评价。':d.EvaluateContent}</p>
                    </div>
                </li>
            )
        })

        let tchimgurl = '';
        if(teacherImg == ""){
            if(teacherGender == 1){
                tchimgurl = '../images/tch_boy.jpg';
            }else{
                tchimgurl = '../images/tch_girl.jpg';
            }
        }else{
            tchimgurl = teacherImg
        }
        return (
            <div className="OrderLessonDetail" style={{ borderTop: '6px solid #ffc000' }}>
                <Breadcrumb >
                    <a style={{ color: "#ff6600" }} onClick={this.BackClick.bind(this)}><i className="iconfont" style={{ fontSize: '24px', position: 'relative', top: '3px' }}>&#xe648;</i>返回</a>
                </Breadcrumb>
                <div className="b_lesson_detail" style={{ padding: '0px' }}>
                    <LessonCompleted data={lessArr} />
                </div>
                <div className="order_main" style={{ marginTop: '10px', border: '1px solid #ccc' }}>
                    <div className="teacherConBox">
                        <div className="teacherPhoto">
                            <img src={tchimgurl} alt="" />
                        </div>
                        <p>{teacherName}</p>
                    </div>
                    <ul className="componentBox">
                        {items}
                    </ul>
                </div>
            </div >
        )
    }
}