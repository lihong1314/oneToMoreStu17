import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
require('../styles/LoginWeCode.css');
import LoadCode from './loadCode';

export default class PwdLogin extends Component {
    constructor() {
        super();
        //初始状态
        this.state = {
            OpenId: window.localStorage.getItem('openId'),
            form: {
                pw1: {
                    valid: false,
                    value: '',
                    error: ''
                },
                pw2: {
                    valid: false,
                    value: '',
                    error: ''
                }
            },
            loading: false
        };
    }
    handleValueChange(field, value, type = 'string') { //监控input值的改变

        const { form } = this.state;

        const newFieldObj = { value, valid: true, error: '' };
        let PhoneReg = /^[0-9a-zA-Z]{6,}$/;
        switch (field) {
            case 'pw1': {
                if (!PhoneReg.test(newFieldObj.value)) {
                    newFieldObj.error = '请输入6位或6位以上字母或数字';
                    newFieldObj.valid = false;
                } else if (value.length === 0) {
                    newFieldObj.error = '密码不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'pw2': {
                if (this.state.form.pw1.value != newFieldObj.value) {
                    newFieldObj.error = '请与新密码一致';
                    newFieldObj.valid = false;
                } else if (newFieldObj.value.length <= 0) {
                    newFieldObj.error = '密码不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
        }

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
        if (!form.pw1.valid || !form.pw2.valid) {
            alert('请填写正确的信息后重试');
            return;
        }
        this.setState({
            loading: true
        })
        fetch(`http://learnapi.gogo-talk.com:8333/api/Register/GetOpenId?RandomNuber=${this.props.params.random}`,
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(json => {
                if (json.result == 2) {
                    fetch("http://learnapi.gogo-talk.com:8333/api/Register/ChangePwdByWeChat",
                        {
                            method: "POST",
                            headers: {
                                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                "Authorization": window.localStorage.getItem('Tonken')
                            },
                            body: 'OldPwd=' + form.pw1.value + '&NewPwd=' + form.pw2.value
                        })
                        .then(res => res.json())
                        .then(json => {
                            if (json.result == 1) {
                                this.setState({
                                    OpenId: window.localStorage.getItem('openId'),
                                    form: {
                                        pw1: {
                                            valid: false,
                                            value: '',
                                            error: ''
                                        },
                                        pw2: {
                                            valid: false,
                                            value: '',
                                            error: ''
                                        }
                                    },
                                    loading: false
                                })
                                hashHistory.push('/BackPwdSuccess');
                            }

                        })
                }

            })


    }
    render() {
        var text = this.state.liked ? '获取验证码' : this.state.count + '秒后重发';
        // var loadType = this.state.loading ? 'loading' : '';
        var loadType = true;
        let Phone = this.state.form.pw1.valid;//Phone的状态
        let Pwd = this.state.form.pw2.valid;//Phone的状态
        const { form } = this.state;

        var PhoneClass = !Phone && form.pw1.error ? 'b_from_label _from_label err_from' : 'b_from_label _from_label';
        var PwdClass = !Pwd && form.pw2.error ? 'b_from_label _from_label err_from' : 'b_from_label _from_label';
        var btnClass = (form.pw1.valid && form.pw2.valid) ? 'login_btn' : 'disabled';
       
        return (
            <div className="login_c_c">
                <div className="pwd_login_box" style={{ margin: '0 auto' }}>
                    {/* { err_from} */}
                    <div className={PhoneClass}>
                        <span className="fl input_msg">
                            {
                                !Phone && form.pw1.error != '' ? <img src="../images/ps1_red.png" style={{ verticalAlign: 'middle' }} alt="" /> : <img src="../images/ps1_grey.png" style={{ verticalAlign: 'middle' }} alt="" />
                            }
                        </span>
                        <input type="password" onChange={(e) => this.handleValueChange('pw1', e.target.value)} placeholder="输入6位或6位以上字母或数字" className="b_from_input _from_input" />
                        {/* <span className="b_red bit">*</span> */}
                        <p className="form_vail b_red">
                            {
                                !Phone && form.pw1.error != '' ? <span className="iconfont icon-cuowu"></span> : ''
                            }

                            {this.state.form.pw1.error}
                        </p>
                    </div>

                    <div className={PwdClass}>
                        <span className="fl input_msg">
                            {
                                !Pwd && form.pw2.error != '' ? <img src="../images/ps2_red.png" style={{ verticalAlign: 'middle' }} alt="" /> : <img src="../images/ps2_grey.png" style={{ verticalAlign: 'middle' }} alt="" />
                            }
                        </span>
                        <input type="password" onChange={(e) => this.handleValueChange('pw2', e.target.value)} placeholder="与新密码一致" className="b_from_input _from_input" />
                        <p className="form_vail b_red">
                            {
                                !Pwd && form.pw2.error != '' ? <span className="iconfont icon-cuowu"></span> : ''
                            }

                            {this.state.form.pw2.error}
                        </p>
                    </div>

                    {/*登录按钮  */}
                    <a href="javascript:;" className={btnClass} onClick={(e) => this.handleSubmit(e)}>
                        确认
                    </a>

                </div>
            </div>
        )
    }
}