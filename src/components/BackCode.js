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
                Phone: {
                    valid: false,
                    value: '',
                    error: ''
                }
            },
            imgCodeUrl: '',
            loading: false,
            randomNuber: 0
        };
    }
    handleValueChange(field, value, type = 'string') { //监控input值的改变

        const { form } = this.state;

        const newFieldObj = { value, valid: true, error: '' };
        let PhoneReg = /^1[0-9]{10}$/;
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
        }
        // console.log(this.state)
        this.setState({
            form: {
                ...form,
                [field]: newFieldObj
            }
        });
        if (PhoneReg.test(value)) {
            alert(1)
            fetch(`http://learnapi.gogo-talk.com:8333/api/Register/GetQRCodeByMobile?mobile=${value}`,
                {
                    method: "GET"
                })
                .then(res => res.json())
                .then(json => {
                    if (json.result == 1) {
                        this.setState({
                            imgCodeUrl: json.data,
                            randomNuber: json.msg
                        })
                        let Num = 0;
                        let testTimer = setInterval(() => {
                            Num++;
                            if (Num >= 60) {
                                return false;
                            }
                            fetch(`http://learnapi.gogo-talk.com:8333/api/Register/GetOpenId?RandomNuber=${this.state.randomNuber}`,
                                {
                                    method: "GET"
                                })
                                .then(res => res.json())
                                .then(json => {
                                    //hashHistory.push(`/BackPwd/${this.state.randomNuber}`);
                                    if (json.result == 2) {
                                        window.localStorage.setItem('Tonken', json.data.userToken);
                                        clearInterval(testTimer);
                                        this.setState({
                                            OpenId: window.localStorage.getItem('openId'),
                                            form: {
                                                Phone: {
                                                    valid: false,
                                                    value: '',
                                                    error: ''
                                                }
                                            },
                                            imgCodeUrl: '',
                                            loading: false,
                                            randomNuber: this.state.randomNuber
                                        })
                                        hashHistory.push(`/BackPwd/${this.state.randomNuber}`);

                                    }

                                })
                        }, 1000);

                    }

                })
        }



    }
    handleSubmit = (e) => {//提交表单
        e.preventDefault();
        const { OpenId, form } = this.state;//序列化
        if (!form.Phone.valid || !form.Pwd.valid) {
            alert('请填写正确的信息后重试');
            return;
        }
        this.setState({
            loading: true
        })
        // let data = new FormData('UserName=15711473935&Password=abc123');

        fetch("http://learnapi.gogo-talk.com:8333/api/Register/Login",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: 'UserName=' + form.Phone.value + '&Password=' + form.Pwd.value
            })
            .then(res => res.json())
            .then(json => {
                if (json.result == 2) {
                    window.localStorage.setItem('Tonken', json.data.userToken);
                    hashHistory.push('/Main/Index/Index');
                } else if (json.result == 0) {
                    hashHistory.push('/PwdLogin');
                }

            })
    }


    render() {
        var text = this.state.liked ? '获取验证码' : this.state.count + '秒后重发';
        // var loadType = this.state.loading ? 'loading' : '';
        var loadType = true;
        let Phone = this.state.form.Phone.valid;//Phone的状态
        const { form } = this.state;

        var PhoneClass = !Phone && form.Phone.error ? 'b_from_label _from_label err_from' : 'b_from_label _from_label';


        return (
            <div className="login_c_c">
                <div className="pwd_login_box" style={{ margin: '0 auto', height: 'auto' }}>
                    {/* { err_from} */}
                    <div className={PhoneClass}>
                        <span className="fl input_msg">
                            <span className="iconfont icon-p-shouji"></span>
                        </span>
                        <input type="text" onChange={(e) => this.handleValueChange('Phone', e.target.value)} placeholder="输入11位手机号" className="b_from_input _from_input" />
                        {/* <span className="b_red bit">*</span> */}
                        <p className="form_vail b_red">
                            {
                                !Phone && form.Phone.error != '' ? <span className="iconfont icon-cuowu"></span> : ''
                            }

                            {this.state.form.Phone.error}
                        </p>
                    </div>


                    <div className="imgBox">
                        <img src={this.state.imgCodeUrl} alt="" />
                        <p className="imgWord">微信扫码找回密码</p>
                    </div>

                </div>
            </div>
        )
    }
}