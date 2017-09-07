import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { Link, hashHistory } from 'react-router';
import { Spin, Switch, Alert } from 'antd';

let b_img = require('../images/login_r_img.png');

export default class Register extends React.Component {
    constructor() {
        super();
        //初始状态
        this.state = {
            OpenId: window.localStorage.getItem('openId'),
            form: {
                Phone: {
                    valid: false,
                    value: '',
                    error: ''
                },
                Code: {
                    valid: false,
                    value: '',
                    error: ''
                },
                Pwd: {
                    valid: false,
                    value: '',
                    error: ''
                }
            },
            count: 60,//重新获取验证码的时间s，当liked为false时显示
            liked: true,//获取验证码的状态，为true时显示"获取验证码"
            loading: false,
            btn: false
        };
    }
    handleClick(e) {
        if (this.state.liked && this.state.form.Phone.valid) {
            this.timer = setInterval(() => {
                var count = this.state.count;
                this.setState({
                    liked: false
                });

                count -= 1;
                this.setState({
                    count: count,
                    btn: true
                });
                if (count < 1) {
                    this.setState({
                        liked: true,
                        btn: false
                    });
                    count = 60;
                    clearInterval(this.timer);
                }


            }, 1000);
            this.handleSendCode(e);
        }

    }
    handleValueChange(field, value, type = 'string') { //监控input值的改变

        const { form } = this.state;

        const newFieldObj = { value, valid: true, error: '' };
        let PhoneReg = /^1[0-9]{10}$/;
        var CodeReg = /^\d{4}$/;
        var PwdReg = /^[0-9a-zA-Z]{6,}$/;
        switch (field) {
            case 'Phone': {
                if (!PhoneReg.test(newFieldObj.value)) {
                    newFieldObj.error = '请输入正确的手机号';
                    newFieldObj.valid = false;
                } else if (value.length === 0) {
                    newFieldObj.error = '手机号不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'Pwd': {
                if (!PwdReg.test(newFieldObj.value)) {
                    newFieldObj.error = '请输入6位或6位以上字母或数字';
                    newFieldObj.valid = false;
                } else if (newFieldObj.value.length <= 0) {
                    newFieldObj.error = '密码不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'Code': {
                if (!CodeReg.test(newFieldObj.value)) {
                    newFieldObj.error = '验证码格式不正确';
                    newFieldObj.valid = false;
                }
                break;
            }
        }

        // if (form.Phone.valid && form.Code.valid && form.Pwd.valid) {
        //     this.setState({
        //         btn: true
        //     });
        // } else {
        //     this.setState({
        //         btn: false
        //     });
        // }

        this.setState({
            form: {
                ...form,
                [field]: newFieldObj
            }
        });
    }
    handleSubmit = (e) => {//提交表单
        e.preventDefault();
        const { OpenId, form } = this.state;//序列化

        this.setState({
            loading: true
        })
        fetch("http://learnapi.gogo-talk.com:8333/api/Register/UserRegister?Phone=" + form.Phone.value + "&OpenId=" + OpenId + "&Code=" + form.Code.value + "&Password=" + form.Pwd.value,
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(json => {
                if (json.result == 1 || json.result == 2) {
                    window.localStorage.setItem('Tonken', json.data.userToken);
                    hashHistory.push('/RegSuccess');
                    this.setState({
                        form: {
                            Phone: {
                                valid: false,
                                value: '',
                                error: ''
                            },
                            Code: {
                                valid: false,
                                value: '',
                                error: ''
                            },
                            Pwd: {
                                valid: false,
                                value: '',
                                error: ''
                            }
                        }
                    })
                } else if (json.result == 0) {
                    hashHistory.push('/RegSuccess');
                }

            })
    }
    handleSendCode = (e) => {
        e.preventDefault();
        fetch("http://learnapi.gogo-talk.com:8333/api/Register/SendPhoneCode?Phone=" + this.state.form.Phone.value,
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(json => {
                // hashHistory.push('/RegSuccess');
            })
    }
    render() {
        var text = this.state.liked ? '获取验证码' : this.state.count + 's';
        // var loadType = this.state.loading ? 'loading' : '';
        var loadType = true;
        var classType = (!this.state.btn) ? 'fr getMobileCode' : 'disabled2';
        let Code = this.state.form.Code.valid;//Code的状态
        let Pwd = this.state.form.Pwd.valid;//Pwd的状态
        let Phone = this.state.form.Phone.valid;//Phone的状态
        const { form } = this.state;

        var PhoneClass = !Phone && form.Phone.error ? 'b_from_label _from_label err_from' : 'b_from_label _from_label';
        var CodeClass = !Code && form.Code.error ? 'b_from_label _from_label register_from err_from' : 'b_from_label _from_label register_from';
        var PwdClass = !Pwd && form.Pwd.error ? 'b_from_label _from_label err_from' : 'b_from_label _from_label';
        var btnClass = (form.Phone.valid && form.Code.valid && form.Pwd.valid) ? 'login_btn' : 'disabled';
        return (
            <div className="login_c_c">
                <div className="login_l_img fl">
                    <img src={b_img} alt="" />
                </div>
                <div className="fr register" style={{ float: 'right', width: '564px' }} >
                    {/*步骤  */}
                    <div className="b_from_buzhou">
                        <div className="fl b_from_bu">
                            <div className="b_from_bu_num">
                                1
                            </div>
                        </div>
                        <div className="b_from_buzhou_line"></div>
                        <div className="fr b_from_bu">
                            <div className="b_from_bu_num active">
                                2
                            </div>
                        </div>
                    </div>
                    <div className={PhoneClass}>
                        <span className="fl input_msg">
                            <span className="iconfont icon-p-shouji"></span>
                        </span>
                        <input type="text" onChange={(e) => this.handleValueChange('Phone', e.target.value)} placeholder="输入11位手机号" className="b_from_input _from_input" />
                        <span className="b_red bit">*</span>
                        <p className="form_vail b_red">
                            {
                                !Phone && form.Phone.error != '' ? <span className="iconfont icon-cuowu"></span> : ''
                            }
                            {this.state.form.Phone.error}
                        </p>
                    </div>

                    <div className={CodeClass}>

                        <input type="text" onChange={(e) => this.handleValueChange('Code', e.target.value)} placeholder="输入4位验证码" className="b_from_input code_from_input" />
                        <span className={classType} onClick={(e) => this.handleClick(e)}>
                            {text}
                        </span>
                        <span className="b_red bit">*</span>
                        <p className="form_vail b_red">
                            {
                                !Code && form.Code.error != '' ? <span className="iconfont icon-cuowu"></span> : ''
                            }

                            {this.state.form.Code.error}
                        </p>
                    </div>

                    <div className={PwdClass}>
                        <span className="fl input_msg">
                            <span className="iconfont icon-mima"></span>
                        </span>
                        <input type="password" onChange={(e) => this.handleValueChange('Pwd', e.target.value)} placeholder="请输入6位或6位以上字母或数字" className="b_from_input _from_input" />
                        <p className="form_vail b_red">
                            {
                                !Pwd && form.Pwd.error != '' ? <span className="iconfont icon-cuowu"></span> : ''
                            }

                            {this.state.form.Pwd.error}
                        </p>
                    </div>

                    {/*登录按钮  */}
                    <a href="javascript:;" className={btnClass} onClick={(e) => this.handleSubmit(e)}>
                        确认注册
                    </a>
                </div>
            </div>
        )
    }
}
