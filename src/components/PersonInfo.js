import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import AllPanel from './AllPanel'
import UserHeader from './UserHeader'
export default class PersonInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            haoma: null,
            sex: null,
            Ename: 'Student',
            birs: null,
            yeal: null,
            mon: null,
            days: null,
            newPhone: null,
            newpass: null,
            oldpass: null,
            imaUrl: '',
            yanZhenFlag: false,
            num1: 60,
            yanZhenFlag2: false,
            num2: 60,
            Enameflag:false,
            yzmflag:false,
            yzIptflag:false,
            yzIptflag:false,
            oldpasssflag:false,
            newpasssflag:false,
            qdpasssflag:false,
            sexflag:true,
            birthdayflag:true
        };
    }
    componentDidMount() {
        var selects = document.getElementsByTagName("select");//通过标签名获取select对象
        var date = new Date();
        var nowYear = date.getFullYear();//获取当前的年
        for (var i = nowYear - 100; i <= nowYear; i++) {
            var optionYear = document.createElement("option");
            optionYear.innerHTML = i;
            optionYear.value = i;
            selects[0].appendChild(optionYear);
        }
        for (var i = 1; i <= 12; i++) {
            var optionMonth = document.createElement("option");
            if (i < 10) {
                optionMonth.innerHTML = "0" + i;
                optionMonth.value = "0" + i;
            } else {
                optionMonth.innerHTML = i;
                optionMonth.value = i;
            }
            selects[1].appendChild(optionMonth);
        }
        getDays(selects[1].value, selects[0].value, selects);
        // 获取某年某月存在多少天
        function getDaysInMonth(month, year) {
            var days;
            if (month == "01" || month == "03" || month == "05" || month == "07" || month == "08" || month == "10" || month == "12") {
                days = 31;
            } else if (month == "04" || month == "06" || month == "09" || month == "11") {
                days = 30;
            } else {
                if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {     // 判断是否为润二月
                    days = 29;
                } else {
                    days = 28;
                }
            }
            return days;
        }
        function setDays() {
            var selects = document.getElementsByTagName("select");
            var year = selects[0].options[selects[0].selectedIndex].value;
            var month = selects[1].options[selects[1].selectedIndex].value;
            getDays(month, year, selects);
        }
        function getDays(month, year, selects) {
            var days = getDaysInMonth(month, year);
            selects[2].options.length = 0;
            for (var i = 1; i <= days; i++) {
                var optionDay = document.createElement("option");
                if (i < 10) {
                    optionDay.innerHTML = "0" + i;
                    optionDay.value = "0" + i;
                } else {
                    optionDay.innerHTML = i;
                    optionDay.value = i;
                }

                selects[2].appendChild(optionDay);
            }
        }
        fetch('http://learnapi.gogo-talk.com:8333/api/HomePage/GetStudentInfo',//获取个人信息
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    , Authorization: window.localStorage.getItem('Tonken')
                },
            })
            .then(res => res.json())
            .then(json => {
                if (json.result == 1) {
                    if (json.data.EName == "" || json.data.EName == '未完善' || json.data.EName == null) {
                        this.refs.ENames.value = "Student";
                    } else {
                        this.refs.ENames.value = json.data.EName;
                    }

                    var Mobiles = json.data.Mobile.substring(0, 3) + "****" + json.data.Mobile.substring(7);

                    this.refs.PhoneNum.value = Mobiles;
                    this.refs.zyIpt.value = Mobiles;
                    if (json.data.Gender == 1) {
                        this.refs.boy.checked = true;
                        this.setState({
                            sex: 1
                        })
                    } else if (json.data.Gender == 0) {
                        this.refs.girl.checked = true;
                        this.setState({
                            sex: 0
                        })
                    }
                    this.refs.seleF.value = json.data.Birthday.substring(0, 4);
                    this.refs.seleS.value = json.data.Birthday.substring(5, 7);
                    this.refs.seleT.value = json.data.Birthday.substring(8, 10);
                    // if(json.data.HeadImg==null){
                    //     this.refs.userImg.src="../images/bg_nav_top.png";
                    // }else{
                    //     this.refs.userImg.src="http://localhost:8000/images/"+json.data.HeadImg
                    // }
                    this.setState({
                        haoma: json.data.Mobile,
                        yeal: this.refs.seleF.value,
                        mon: this.refs.seleS.value,
                        days: this.refs.seleT.value,
                        imaUrl: json.data.HeadImg,
                        sex: json.data.Gender
                    })
                }
            });
    }
    handleClick() {
        this.setState({
            yanZhenFlag: true
        })
        let num = this.state.num1;
        let that = this;
        setInterval(function () {
            num--;
            if (num == -1) {
                num = 60;
                that.setState({
                    num1: 60,
                    yanZhenFlag: false
                })
            }
            that.setState({
                num1: num
            })
        }, 1000)
        fetch(`http://learnapi.gogo-talk.com:8333/api/HomePage/SendChangePwdSMS?cell=${this.state.haoma}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    , Authorization: window.localStorage.getItem('Tonken')
                },
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);

            })
    }
    handleClickS() { //发送验证码
        let phone = this.refs.zyIpts.value;
        if (phone == '') {
            this.refs.zyIpts.style.border = "1px solid #f26721";
            return false;
        } else {
            this.setState({
                yanZhenFlag2: true
            })
        }
        let num = this.state.num2;
        let that = this;

        let phoneS = /^1[34578]\d{9}$/;
        if (!phoneS.test(phone)) {
            this.refs.zyIpts.style.border = "1px solid #f26721";
            num = 60;
            that.setState({
                num2: 60,
                yanZhenFlag2: true
            })
            return false;
        } else {
            this.refs.zyIpts.style.border = "1px solid #cdcdcd";
            setInterval(function () {
                num--;
                if (num == -1) {
                    num = 60;
                    that.setState({
                        num2: 60,
                        yanZhenFlag2: false
                    })
                }
                that.setState({
                    num2: num
                })
            }, 1000)
        }
        fetch(`http://learnapi.gogo-talk.com:8333/api/HomePage/SendSMSCode?cell=${this.state.newPhone}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    , Authorization: window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
            })
    }
    handleBtn() {
        let yzms = this.refs.yzm.value;
        if (yzms == '') {
            this.refs.yzm.style.border = "1px solid #f26721";
            return false;
        }
        fetch(`http://learnapi.gogo-talk.com:8333/api/HomePage/ExistMobilCode?cell=${this.state.haoma}&&code=${yzms}&&type=0`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    , Authorization: window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                if (json.result == 1) {
                    this.refs.Prompts.style.display = "none";
                    this.refs.yz.style.display = 'none';
                    this.refs.yzs.style.display = "block";
                    this.refs.zyIpts.value = '';
                    this.refs.zyIpts.style.border='1px solid #cdcdcd';
                    this.refs.yzms.value = '';
                    this.refs.yzms.style.border='1px solid #cdcdcd';
                } else {
                    this.refs.Prompts.style.display = "block";
                    this.refs.PromptsTip1.innerHTML = json.msg;
                    let that = this;
                    setTimeout(function () {
                        that.refs.Prompts.style.display = 'none';
                        that.refs.yzm.value = "";
                    }, 1000)
                }
            })
    }
    handleBtnS() {
        var mengtai = document.getElementById("mengtai");
        var cha = document.getElementById("cha");
        let yzmss = this.refs.yzms.value;
        let zyIpts = this.refs.zyIpts.value;

        if (yzmss == "" || zyIpts == "") {
            this.refs.yzms.style.border = "1px solid #f26721";
            this.refs.zyIpts.style.border = "1px solid #f26721";
            return false;
        }

        let Mobiles = this.refs.zyIpts.value.substring(0, 3) + "****" + this.refs.zyIpts.value.substring(7);
        this.refs.PhoneNum.value = Mobiles;

        cha.style.display = 'none';

        fetch(`http://learnapi.gogo-talk.com:8333/api/HomePage/ExistMobilCode?cell=${this.state.newPhone}&&code=${yzmss}&&type=1`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    , Authorization: window.localStorage.getItem('Tonken')
                },
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.result == 1) {
                    this.refs.yzs.style.display = 'none';
                    this.refs.Prompts.style.display = "block";
                    this.refs.PromptsTip1.innerHTML = json.msg;
                    setTimeout(() => {
                        this.refs.Prompts.style.display = "none";
                        mengtai.style.display = "none";
                    }, 2000);
                } else {
                    this.refs.yzs.style.display = 'block';
                    this.refs.Prompts.style.display = "block";
                    this.refs.PromptsTip1.innerHTML = json.msg;
                    setTimeout(() => {
                        this.refs.Prompts.style.display = "none";
                    }, 2000);
                }
            })
    }
    handlbcxg() {

        var ENames = this.refs.ENames.value;
        if (ENames == "") {
            this.refs.ENames.style.border = "1px solid #f26721";
            return false;
        } else {
            this.setState({
                yeal: this.refs.seleF.value,
                mon: this.refs.seleS.value,
                days: this.refs.seleT.value
            });
        }

        fetch("http://learnapi.gogo-talk.com:8333/api/HomePage/UpdateStudentInfo",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: window.localStorage.getItem('Tonken')
                },
                body: JSON.stringify({
                    EName: ENames,
                    Birthday: this.state.yeal + "/" + this.state.mon + "/" + this.state.days,
                    Gender: this.state.sex,
                    HeadImg: '',
                    StudyTime: 0,
                    StudyWeekTime: 0,
                    StudyEnglishChannel: 0,
                    IsJoinEnglishTest: 0
                })
            })
            .then(res => res.json())
            .then(json => {
                if (json.result == 1) {
                    this.refs.mengtaiBaocun.style.display = 'block';
                    this.refs.PromptBaocun.style.display = 'block';
                    this.refs.PromptsTipBaocun.innerHTML = json.msg;
                    setTimeout(() => {
                        this.refs.mengtaiBaocun.style.display = 'none';
                        this.refs.PromptBaocun.style.display = 'none';
                    }, 1000)
                } else {
                    this.refs.mengtaiBaocun.style.display = 'block';
                    this.refs.PromptBaocun.style.display = 'block';
                    this.refs.PromptsTipBaocun.innerHTML = json.msg;
                    setTimeout(() => {
                        this.refs.mengtaiBaocun.style.display = 'none';
                        this.refs.PromptBaocun.style.display = 'none';
                    }, 1000)
                }

            })
    }
    handlexgF() {//修改手机号 -- 原
        this.refs.mengtai.style.display = "block";
        this.refs.yz.style.display = "block";
        this.refs.yzm.value = "";
        this.refs.yzs.style.display = 'none';
        this.refs.yzm.style.border='1px solid #cdcdcd';
    }
    handlexgS() {
        this.refs.mengtaiS.style.display = "block";
        this.refs.mtyz.style.display = 'block';
        this.refs.oldpasss.value = '';
        this.refs.newpasss.value = '';
        this.refs.qdpasss.value = '';
        this.refs.oldpasss.style.border = "1px solid #cdcdcd";
        this.refs.newpasss.style.border = "1px solid #cdcdcd";
        this.refs.qdpasss.style.border = "1px solid #cdcdcd";

    }
    handleChangeF() {
        this.setState({
            yeal: this.refs.seleF.value,
            Enameflag:true
        })
    }
    handleChangeS() {
        this.setState({
            mon: this.refs.seleS.value,
            Enameflag:true
        })
    }
    handleChangeT() {
        this.setState({
            days: this.refs.seleT.value,
            Enameflag:true
        })
    }
    handleChangeFo() {//手机号change
        let yzmss = this.refs.zyIpts.value;
        let yzmT = /^\d{11}$/;
        if (!yzmT.test(yzmss)) {
            this.refs.zyIpts.style.border = "1px solid #f26721";
            //this.refs.zyIptsError.style.display = 'block';
            //this.refs.zyIptsError.style.marginLeft = '96px';
           // this.refs.zyIptsError.style.marginTop = '5px';
            this.setState({
                yzIptflag:false
            })
        } else {
            this.refs.zyIpts.style.border = "1px solid #cdcdcd";
            //this.refs.zyIptsError.style.display = 'none';
            this.setState({
                newPhone: this.refs.zyIpts.value,
                yzIptflag:true
            })
        }
    }
    sexF() {
        this.setState({
            sex: 1,
            Enameflag:true
        })
    }
    sexS() {
        this.setState({
            sex: 0,
            Enameflag:true
        })
    }
    yanZhenChange() {
        let yzms = this.refs.yzm.value;
        let yzmT = /^\d{4}$/;
        if (!yzmT.test(yzms)) {
            this.refs.yzm.style.border = "1px solid #f26721";
            //this.refs.yzmError.style.display = 'inline-block';
            this.setState({
                yzmflag:false
            })
        } else {
            this.refs.yzm.style.border = "1px solid #cdcdcd";
            //this.refs.yzmError.style.display = 'none';
            this.setState({
                yzmflag:true
            })
        }
    }
    psChange() { //验证密码
        let oldpass = this.refs.oldpasss.value;
        let newpassT = /^[a-zA-Z0-9]{6,18}$/;
        if (!newpassT.test(oldpass) || oldpass == '') {
            this.refs.oldpasss.style.border = "1px solid #f26721";
            //this.refs.oldpasssError.style.display = 'inline-block';
            this.setState({
                oldpasssflag:false
            })
            return false;
        } else {
            //this.refs.oldpasssError.style.display = 'none';
            this.refs.oldpasss.style.border = "1px solid #cdcdcd";
            this.setState({
                oldpasssflag:true
            })
        }
    }
    psNewChange() { //验证新密码
        let newpass = this.refs.newpasss.value;
        let newpassT = /^[a-zA-Z0-9]{6,18}$/;
        if (!newpassT.test(newpass)) {
            this.refs.newpasss.style.border = "1px solid #f26721";
            //this.refs.newpasssError.style.display = 'inline-block';
            this.setState({
                newpasssflag:false
            })
            return false;
        } else {
            this.refs.newpasss.style.border = "1px solid #cdcdcd";
            //this.refs.newpasssError.style.display = 'none';
            this.setState({
                newpasssflag:true
            })
        }
    }
    psNew2Change() {//验证新密码2
        if (this.refs.qdpasss.value != this.refs.newpasss.value ||this.refs.qdpasss.value =="") {
            this.refs.qdpasss.style.border = "1px solid #f26721";
            //this.refs.mtyzIptError.style.display = 'inline-block';
            this.setState({
                qdpasssflag:false
            })
            return false;
        } else {
            this.refs.qdpasss.style.border = "1px solid #cdcdcd";
            //this.refs.mtyzIptError.style.display = 'none';  
            this.setState({
                qdpasssflag:true
            })          
        }
    }
    handleqdxg() {
        if (this.refs.newpasss.value == '') {
            this.refs.newpasss.style.border = "1px solid #f26721";
            return false;
        }
        if (this.refs.oldpasss.value == '') {
            this.refs.oldpasss.style.border = "1px solid #f26721";
            return false;
        }
        if (this.refs.qdpasss.value == '') {
            this.refs.qdpasss.style.border = "1px solid #f26721";
            return false;
        }
        this.setState({
            newpass: this.refs.newpasss.value,
            oldpass: this.refs.oldpasss.value
        });
        fetch(`http://learnapi.gogo-talk.com:8333/api/HomePage/ChangePwdByOldPwd`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                    , Authorization: window.localStorage.getItem('Tonken')
                },
                // body:`OldPwd=${this.state.oldpass}&NewPwd=${this.state.newpass}`
                body: JSON.stringify({
                    OldPwd: this.refs.oldpasss.value,
                    NewPwd: this.refs.newpasss.value
                })
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.result == 1) {
                    this.refs.Prompt.style.display = "block";
                    this.refs.mtyz.style.display = 'none';
                    this.refs.PromptsTip.innerHTML = json.msg;
                    let that = this;
                    let t1 = setInterval(function () {
                        that.refs.Prompt.style.display = "none";
                        that.refs.mengtaiS.style.display = "none";
                        clearInterval(t1);
                    }, 1500)
                } else {
                    this.refs.Prompt.style.display = "block";
                    this.refs.PromptsTip.innerHTML = json.msg;
                    let that = this;
                    let t2 = setInterval(function () {
                        that.refs.Prompt.style.display = "none";
                        clearInterval(t2);
                    }, 1500)
                }
                this.refs.newpasss.value = '';
                this.refs.oldpasss.value = '';
                this.refs.qdpasss.value = '';
            })

    }
    setFiles() {
        // let img=this.refs.headimg.value;


    }
    yanZhenChange2() {
        let yzms = this.refs.yzms.value;
        let yzmT = /^\d{4}$/;
        if (!yzmT.test(yzms) || yzms == '') {
            this.refs.yzms.style.border = "1px solid #f26721";
            //this.refs.yzmsError.style.display = 'inline-block';
            this.setState({
                yzIptflag:false
            })
        } else {
            this.refs.yzms.style.border = "1px solid #cdcdcd";
            //this.refs.yzmsError.style.display = 'none';
            this.setState({
                yzIptflag:true
            })
        }
    }
    handleClickChaO() {
        let mengtai = document.getElementById("mengtai");
        mengtai.style.display = "none"
    }
    handleClickChaT() {
        let mengtai = document.getElementById("mengtaiS");
        mengtai.style.display = "none"
    }
    NameChange() {
        var ENames = this.refs.ENames.value;
        var ENameT = /^[A-Za-z]+$/;
        if (!ENameT.test(ENames)) {
            this.refs.ENames.style.border = "1px solid #f26721";
            //this.refs.ENamesError.style.display = 'inline-block';
            this.setState({
                Enameflag:false
            })
            return false;
        } else {
            this.refs.ENames.style.border = "1px solid #cdcdcd";
            //this.refs.ENamesError.style.display = 'none';
            this.setState({
                Enameflag:true
            })
        }
    }
    render() {
        let stuPhoto;
        if (this.state.imaUrl == null || this.state.imaUrl == "") {
            if (this.state.sex == 1) {
                stuPhoto = '../images/boy.png'
            } else {
                stuPhoto = '../images/girl.png'
            }
        } else {
            stuPhoto = this.state.imaUrl
        }
        return (
            <AllPanel head="个人基本信息">
                <div className="person_item">
                    <laber className="lab"><span className="labTitle">&#x3000;*英文名：</span>
                        <input ref="ENames" type="text" onBlur={this.NameChange.bind(this)} className="ipt" maxLength="20" />
                        {/* <span className="inpurError" ref="ENamesError">只能输入英文字母</span> */}
                    </laber>
                    <laber className="lab">
                        <span className="labTitle">*手机账号：</span>
                        <input ref="PhoneNum" type="text" className="ipt" maxLength="11" readOnly="true" />
                        <span className="xiugai" onClick={this.handlexgF.bind(this)}>修改</span>
                    </laber>
                    <laber className="lab"><span className="labTitle">*修改密码：</span><input type="text" className="ipt" value="*************" maxLength="18" readOnly="true" /><span className="xiugai" onClick={this.handlexgS.bind(this)}>修改</span></laber>
                    <laber className="lab"><span className="labTitle">&#x3000;&#x3000;&#x2000;头像：</span>
                        <UserHeader imgUrl={stuPhoto} />
                    </laber>
                    <laber className="lab"><span className="labTitle">&#x3000;&#x3000;*性别：</span>
                        <input onClick={this.sexF.bind(this)} type="radio" name="sex" className="rdos" value="1" ref="boy" />
                        <label>男&#x3000;</label>
                        <input onClick={this.sexS.bind(this)} type="radio" name="sex" className="rdos" value="0" ref="girl" />
                        <label >女</label>
                    </laber>
                    <br />
                    <laber className="lab"><span className="labTitle">&#x3000;&#x3000;*生日：</span>
                        <select ref="seleF" className="selects" onChange={this.handleChangeF.bind(this)}>
                        </select>
                        <span>&#x3000;年&#x3000;</span>
                        <select ref="seleS" className="selects" onChange={this.handleChangeS.bind(this)}>
                        </select>
                        <span>&#x3000;月&#x3000;</span>
                        <select ref="seleT" className="selects" onChange={this.handleChangeT.bind(this)}>
                        </select>
                        <span>&#x3000;日&#x3000;</span>
                    </laber>
                    <div className="mengtai" ref="mengtaiBaocun">
                        <div className="Prompt" ref="PromptBaocun">
                            <h5 ref="PromptsTipBaocun">手机号已更改！</h5>
                        </div>
                    </div>
                    {
                        this.state.Enameflag?<laber className="lab"><input className="zyhbtn" ref="bcxg" type="button" value="保存修改" onClick={this.handlbcxg.bind(this)} /></laber>
                        :
                        <laber className="lab"><input className="zyhbtn" ref="bcxg" type="button" value="保存修改" style={{background:"#ccc"}}/></laber>
                    }
                    
                </div>
                <div className="mengtai" ref="mengtai" id="mengtai">
                    <div className="yz" ref="yz">
                        <p className="yz_phone">验证原手机号：</p>
                        <div className="yz_shuru">
                            <lable className="yz_lab">
                                <span className="yz_yzm">验证原手机号：</span>
                                <input type="text" ref="zyIpt" className="yzIpt" maxLength="11" />
                                {
                                    this.state.yanZhenFlag ?
                                        <span className="yz_span">{this.state.num1}s后重新发送</span>
                                        :
                                        <span className="yz_span" onClick={this.handleClick.bind(this)}>点击获取短信验证码</span>
                                }
                            </lable>
                            <lable className="yz_lab">
                                <span className="yz_yzm">请输入验证码：</span>
                                <input type="text" ref="yzm" className="yzIpt" maxLength="4" onChange={this.yanZhenChange.bind(this)} placeholder='请输入4位验证码 ' />
                                {/* <span className="inpurError" ref="yzmError">验证码输入有误</span> */}
                            </lable>

                        </div>
                        {
                            this.state.yzmflag ? <input type="button" onClick={this.handleBtn.bind(this)} value="确定" className="yz_btn" />
                            :
                            <input type="button" value="确定" className="yz_btn" style={{background:"#ccc"}}/>
                        }
                        
                        <div className="closeX" onClick={this.handleClickChaO.bind(this)}>&times;</div>
                        <div className="Prompt" ref="Prompt">
                            <h5 ref="PromptsTip">手机号已更改！</h5>
                        </div>
                    </div>
                    <div className="yzs" ref="yzs">
                        <p className="yz_phone">绑定新手机号：</p>
                        <div className="yz_shuru">
                            <lable className="yz_lab">
                                <span className="yz_yzm">输入新手机号：</span>
                                <input type="text" ref="zyIpts" className="yzIpt" placeholder="请输入11位新手机号" onChange={this.handleChangeFo.bind(this)} maxLength="11" />
                                {
                                    this.state.yanZhenFlag2 ?
                                        <span className="yz_span">{this.state.num2}s后重新发送</span>
                                        :
                                        <span className="yz_span" onClick={this.handleClickS.bind(this)}>点击获取短信验证码</span>
                                }
                                {/* <span className="inpurError" ref="zyIptsError">手机号输入有误</span> */}
                            </lable>
                            <lable className="yz_lab">
                                <span className="yz_yzm">请输入验证码：</span>
                                <input type="text" ref="yzms" className="yzIpt" onChange={this.yanZhenChange2.bind(this)} placeholder="请输入4位验证码" maxLength="4" />
                                {/* <span className="inpurError" ref="yzmsError">验证码输入有误</span> */}
                            </lable>
                        </div>
                        {
                            this.state.yzIptflag && this.state.yzIptflag ?<input type="button" onClick={this.handleBtnS.bind(this)} value="确定" className="yz_btn" />
                            :<input type="button" style={{background:"#ccc"}} value="确定" className="yz_btn" />
                        }
                        
                        <div className="closeX" onClick={this.handleClickChaO.bind(this)}>&times;</div>
                    </div>
                    <div className="Prompt" ref="Prompts">
                        <h5 ref="PromptsTip1">手机号已更改！</h5>
                    </div>
                </div>
                <div className="mengtaiS" ref="mengtaiS" id="mengtaiS">
                    <div className="mtyz" ref="mtyz">
                        <p className="mtyz_phone" style={{ color: "#C40016" }}>修改密码：</p>
                        <div className="mtyz_shuru">
                            <lable className="mtyz_lab">
                                <span className="mtyz_yzm">请输入旧密码：</span>
                                <input type="password" ref="oldpasss" className="mtyzIpt" maxLength="18" onChange={this.psChange.bind(this)} placeholder="请输入原始密码" />
                                {/* <span className="inpurError" ref="oldpasssError">密码输入有误</span> */}
                            </lable>
                            <lable className="mtyz_lab"><span className="mtyz_yzm">请输入新密码：</span>
                                <input type="password" ref="newpasss" className="mtyzIpt" maxLength="18" onChange={this.psNewChange.bind(this)} placeholder="设置新密码（6~18位）" />
                                {/* <span className="inpurError" ref="newpasssError">密码输入有误</span>                 */}
                            </lable>
                            <p className="mtP">长度6-18位，数字、字母组成。</p>
                            <lable className="mtyz_lab"><span className="mtyz_yzm">请确认新密码：</span>
                            <input type="password" onChange={this.psNew2Change.bind(this)} placeholder="请与新密码一致" ref="qdpasss" className="mtyzIpt" maxLength="18" />
                            {/* <span className="inpurError" ref="mtyzIptError">密码输入有误</span>   */}
                            </lable>
                        </div>
                        {
                            this.state.oldpasssflag&&this.state.newpasssflag&&this.state.qdpasssflag ? <input type="button" onClick={this.handleqdxg.bind(this)} value="确定修改" className="mtyz_btn" />
                            :<input type="button" style={{background:'#ccc'}} value="确定修改" className="mtyz_btn" />
                        }
                        
                        <div className="closeX" onClick={this.handleClickChaT.bind(this)}>&times;</div>
                    </div>
                    <div className="Prompt" ref="Prompt">
                        <h5 ref="PromptsTip"></h5>
                    </div>
                </div>
            </AllPanel>
        )
    }
}