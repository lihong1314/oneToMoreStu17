import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';


export default class youhuijuan extends Component {
    constructor() {
        super();
        this.state={
            youhuijianData:{
                CouponName:'',
                Days:0,
                Description:''
            }
        }
        this.xiangClick = this.xiangClick.bind(this);
    }
    xiangClick(v) {
        fetch(`http://learnapi.gogo-talk.com:8333/api/GiveCouponIntegral/GetCouponDetails?CouponId=${v}`,//未使用
        {
            method: "GET",
            headers: { 'Authorization': window.localStorage.getItem('Tonken')
            }
        })
        .then(res => res.json())
        .then(json => {
            if(json.result == 1){
                this.setState({
                    youhuijianData:json.data[0]
                })
                this.refs.youhuijuanS.style.display = "block";
            }            
        })
        
    }
    keshitipClick() {
        this.refs.youhuijuanS.style.display = "none";
    }
    render() {
        let {youhuijianData} = this.state;
        let noArr = this.props.data;
        let items = [];
        if (noArr.length == 0 || noArr == null) {
            items.push(
                <div className="youhui_block youhui_guoqi" style={{ width: '100%' }}>
                    <p style={{ textAlign: 'center', lineHeight: '130px', margin: '0 auto' }}>暂无优惠劵</p>
                </div>
            )
        } else {
            noArr.map((d, i) => {
                let time = d.valid.split('-');
                items.push(
                    <div className="youhui_block youhui_guoqi" key={i} onClick={this.xiangClick.bind(this,d.CouponId)}>
                        <div className="youhui-top">
                            <p className="youhui-title">优惠劵</p>
                            <h2><span>¥</span>{d.Amount}</h2>
                        </div>
                        <div className="youhui-bottom">
                            <p className="youhui-desc">{d.Description}</p>
                            <p>有效期：</p>
                            <p>{time[0]+'.'+time[1]+'.'+time[2]+'-'+time[3]+'.'+time[4]+'.'+time[5]}</p>
                            <img src="../images/guoqi.png" />
                        </div>
                    </div>
                )
            })
        }
        return (
            <div className="youhui-conbox">
                {items}
                <div className="yy_mengtai" ref="youhuijuanS">
                    <div className="bnyy youhuijuanXQ" style={{ display: 'block', paddingTop: '20px', height: 'auto', paddingBottom: '15px' }}>
                        <h5 className="yyTitle">优惠券详情</h5>
                        <p>优惠说明：{youhuijianData.CouponName}</p>
                        <p>有效日期：{youhuijianData.Days}</p>
                        <p>使用须知：</p>
                        <p>
                            {youhuijianData.Description}
                        </p>
                        <span className="closeX" onClick={this.keshitipClick.bind(this)}>&times;</span>
                    </div>
                </div>
            </div>
        )
    }
}