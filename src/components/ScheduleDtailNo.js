import React, { Component } from 'react';
import { Link } from 'react-router';
import { Breadcrumb } from 'antd';
import { Rate } from 'antd';

import LessonUdone from './LessonUdone';//待上课程 
export default class OrderLessonDetail extends Component {
    constructor() {
        super();
        this.state = {
            lessArr: [],
            dataArr: null,
            teacherImg: '',
            teacherName: '',
            teacherGender: 0
        }
    }
    componentWillMount() {
        const lessonid = this.props.params.id;

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
                        dataArr: json.data[0].StudentList,
                        teacherImg: json.data[0].TeacherImg,
                        teacherName: json.data[0].TeacherName,
                        teacherGender: json.data[0].TeacherGender
                    })
                } else {
                }
            })
    }
    BackClick() {
        window.history.go(-1);
    }
    render() {
        const { lessArr, dataArr, teacherImg, teacherGender, teacherName } = this.state;
        //console.log(dataArr.length)
        let items = [];
        if (dataArr == null) {
            items.push(
                <li key={0}>
                    <p>还没有学生约这节课</p>
                </li>
            )
        } else {
            dataArr.map((d, i) => {
                let imgurl = '';
                if (d.StudentImg == "") {
                    if (d.Gender == 1) {
                        imgurl = '../images/boy.png';
                    } else {
                        imgurl = '../images/girl.png';
                    }
                } else {
                    imgurl = d.StudentImg
                }
                items.push(
                    <li key={i}>
                        <div><img src={imgurl} style={{ height: '100%' }} /></div>
                        <p>{d.EName}</p>
                    </li>
                )
            })
        }
        let tchimgurl = '';
        if (teacherImg == "") {
            if (teacherGender == 1) {
                tchimgurl = '../images/tch_boy.jpg';
            } else {
                tchimgurl = '../images/tch_girl.jpg';
            }
        } else {
            tchimgurl = teacherImg
        }
        return (
            <div className="OrderLessonDetail" style={{ borderTop: '6px solid #ffc000' }}>
                <Breadcrumb >
                    <a style={{ color: "#ff6600" }} onClick={this.BackClick.bind(this)}><i className="iconfont" style={{ fontSize: '24px', position: 'relative', top: '3px' }}>&#xe648;</i>返回</a>
                </Breadcrumb>
                <div className="b_lesson_detail" style={{ padding: '0px',height:'203px',overflow:'hidden' }}>
                    <LessonUdone data={lessArr} />
                </div>
                <div className="order_main" style={{ marginTop: '10px', border: '1px solid #ccc' }}>
                    <div className="teacherConBox" style={{borderBottom:'1px solid #ccc'}}>
                        <div className="teacherPhoto">
                            <img src={tchimgurl} alt="" />
                        </div>
                        <p>{teacherName}</p>
                    </div>
                    <ul className="StudentBox">
                        {items}
                    </ul>
                </div>
            </div >
        )
    }
}