import React, { Component } from 'react';
import { Link } from 'react-router';
import Panel from './Panel';
import Button from './Button';
import { DatePicker } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;

export default class DeviceTesting extends Component {
    constructor() {
        super();
        this.state = {
            isShow: false,
            bgColor1: 0,
            bgColor2: 0,
            bgColor3: 0,
            bgColor4: 0,
            oneArr: [{ name: '一年以上', val: 1 }, { name: '1~2年', val: 2 }, { name: '2~3年', val: 3 }, { name: '3年以上', val: 4 }],
            twoArr: [{ name: '小于1小时', val: 1 }, { name: '1-2小时', val: 2 }, { name: '2-3小时', val: 3 }, { name: '大于3小时', val: 4 }],
            threeArr: [{ name: '在校学习', val: 1 }, { name: '自学', val: 2 }, { name: '在培训机构学习', val: 3 }, { name: '以上全部', val: 4 }],
            fourArr: [{ name: '是', val: 3 }, { name: '否', val: 0 }],
            date: {
                flag: true,
                val: ''
            },
            name: {
                flag: true,
                val: ''
            },
            gender: 1
        }

    }
    GradSubmit() {//定级
        const { oneArr, twoArr, threeArr, fourArr, bgColor1, bgColor2, bgColor3, bgColor4, date, name, gender } = this.state;


        fetch("http://learnapi.gogo-talk.com:8333/api/HomePage/GradeInvestigation",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: window.localStorage.getItem('Tonken')
                },
                body: JSON.stringify({
                    EName: name.val,
                    Birthday: date.val,
                    Gender: gender,
                    HeadImg: '',
                    StudyTime: oneArr[bgColor1].val,
                    StudyWeekTime: twoArr[bgColor2].val,
                    StudyEnglishChannel: threeArr[bgColor3].val,
                    IsJoinEnglishTest: fourArr[bgColor4].val
                })
            })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isShow: false
                })
            })
    }
    ChangeActive(index, val) {//单选列表
        switch (val) {
            case '1': this.setState({
                bgColor1: index
            })
                break;
            case '2': this.setState({
                bgColor2: index
            })
                break;
            case '3': this.setState({
                bgColor3: index
            })
                break;
            case '4': this.setState({
                bgColor4: index
            })
                break;
        }
    }
    componentWillMount() {
        this.setState({
            isShowz: this.props.isGrade == 1 ? false : true
        })
    }
    onChange(date1, dateString) {
        if (dateString == "") {
            this.setState({
                date: {
                    flag: false,
                    val: ''
                }
            })
        } else {
            this.setState({
                date: {
                    flag: true,
                    val: dateString
                }
            })
        }

    }
    changeValue(val) {//输入框
        const newFieldObj = { val, flag: true };
        let reg = /^[a-zA-Z]*$/;
        if (!reg.test(newFieldObj.val)) {
            newFieldObj.flag = false;
        }
        this.setState({
            name: newFieldObj
        })
    }
    changeSex(val) {
        console.log(val);
        this.setState({
            gender: val
        })
    }
    render() {
        let isShowz = this.state.isShow ? { display: 'block', height: document.documentElement.clientHeight + 'px' } : { display: 'none', height: document.documentElement.clientHeight + 'px' }
        //  className="click-active"
        let userName = this.state.name.flag;
        let userDate = this.state.date.flag;
        var userNameClass = userName ? '' : 'error';
        var userDateClass = userDate ? '' : 'error';

        const { oneArr, twoArr, threeArr, fourArr } = this.state;
        const style = {
            background: '#fff',
            border: '1px solid #f26721',
            padding: '0 30px',
            height: '30px',
            fontSize: '14px',
            color: '#000000',
            borderRadius: '0.851rem',
            boxSizing: 'border-box',
            marginRight: '22px',
            outline: 'none'
        }
        const styleActive = {
            background: '#f26721',
            border: '1px solid #f26721',
            padding: '0 30px',
            height: '30px',
            fontSize: '14px',
            color: '#fff',
            borderRadius: '0.851rem',
            boxSizing: 'border-box',
            marginRight: '22px',
            outline: 'none'
        }
        const { bgColor1, bgColor2, bgColor3, bgColor4 } = this.state;


        return (

            < div className="testTing" style={isShowz} >
                <div className="tesTingBox">
                    <div className="courseTitle">
                        <h2>课程分级调查</h2>
                        <p>我们需要对孩子的学习情况做一个简单的调查，以初步确定孩子的学习课程等级。</p>
                    </div>
                    <ul className="surveyBox">
                        <li>
                            <p>1. 孩子学习英语已有多久：</p>
                            <div className="btnbox">
                                {
                                    oneArr.map((item, index) => {
                                        return (
                                            <button key={index} type="button" style={bgColor1 == index ? styleActive : style} onClick={this.ChangeActive.bind(this, index, '1')}>{item.name}</button>
                                        )
                                    })
                                }
                            </div>
                        </li>
                        <li>
                            <p>2. 孩子每周学习英语时长：</p>
                            <div className="btnbox">
                                {
                                    twoArr.map((item, index) => {
                                        return (
                                            <button key={index} type="button" style={bgColor2 == index ? styleActive : style} onClick={this.ChangeActive.bind(this, index, '2')}>{item.name}</button>
                                        )
                                    })
                                }
                            </div>
                        </li>
                        <li>
                            <p>3. 孩子学习英语的主要途径：</p>
                            <div className="btnbox">
                                {
                                    threeArr.map((item, index) => {
                                        return (
                                            <button key={index} type="button" style={bgColor3 == index ? styleActive : style} onClick={this.ChangeActive.bind(this, index, '3')}>{item.name}</button>
                                        )
                                    })
                                }
                            </div>
                        </li>
                        <li>
                            <p>4. 孩子是否参加过校外英语测试：</p>
                            <div className="btnbox" style={{ justifyContent: 'flex-start' }}>
                                {
                                    fourArr.map((item, index) => {
                                        return (
                                            <button key={index} type="button" style={bgColor4 == index ? styleActive : style} onClick={this.ChangeActive.bind(this, index, '4')}>{item.name}</button>
                                        )
                                    })
                                }
                            </div>
                        </li>
                    </ul>
                    <div className="perfectInfor">
                        <div className="titlebox">
                            <h2>完善孩子信息</h2>
                        </div>
                        <ul>
                            <li className={userNameClass}>
                                <span>英文名</span>
                                <input type="text" name="studentName" onChange={(e) => this.changeValue(e.target.value)} maxLength="10" />
                            </li>
                            <li className={userDateClass}>
                                <span>生日</span>
                                {/*<input type="text" name="studentName" />*/}
                                <div className="sexbox">
                                    <DatePicker onChange={this.onChange.bind(this)} />
                                </div>
                            </li>
                            <li>
                                <span>性别</span>
                                <div className="sexbox">
                                    <input type="radio" name="sex" className="rdo" value="1" id="boy" onChange={(e) => this.changeSex(e.target.value)} />
                                    <label for="#boy">男</label>
                                    <input type="radio" name="sex" className="rdo" value="0" id="girl" onChange={(e) => this.changeSex(e.target.value)} />
                                    <label for="#girl">女</label>
                                </div>
                            </li>
                        </ul>
                        <a href="javascript:;" className="susBtn" onClick={(e) => this.GradSubmit(e)}>完成</a>
                    </div>
                </div>
            </div >
        )
    }
}