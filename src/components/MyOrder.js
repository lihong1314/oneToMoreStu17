import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { Link, hashHistory } from 'react-router';
import { Spin, Switch, Alert } from 'antd';
import { Pagination } from 'antd';

export default class MyOrder extends React.Component {
    constructor() {
        super();
        this.state = {
            datas: null,
            current: 1,
            total: 0,
            pageSize: 10,
            isPagination: true
        }
    }
    componentDidMount() {
        fetch(`http://learnapi.gogo-talk.com:8333/api/Order/GetOrderPage?pageIndex=${this.state.current}&pageSize=${this.state.pageSize}`,
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                if(json.result ==1){
                    window.frames[0].postMessage(JSON.stringify({token:window.localStorage.getItem('Tonken')}),"*");
                    this.setState({
                        datas: json.data,
                        total: json.total
                    })
                    if (this.state.total <= 10) {
                        this.setState({
                            isPagination: false
                        })
                    }
                }                
            })            
    }

    onChange = (page) => {
        fetch(`http://learnapi.gogo-talk.com:8333/api/Order/GetOrderPage?pageIndex=${page}&pageSize=${this.state.pageSize}`,
            {
                method: "GET",
                headers: {
                    'Authorization': window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                if (json.result == 1) {
                    this.setState({
                        datas: json.data
                    })
                }
            })
        this.setState({
            current: page
        });
    }
    handleclick1(){
        this.refs.yyMengtai.style.display = 'block';
    }
    handleClickG(){
        this.refs.yyMengtai.style.display = 'none';
    }
    handleclick(v) {
        fetch(`http://learnapi.gogo-talk.com:8333/api/Order/CancelOrder?orderId=${v}`,
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.result == 1) {
                    this.refs.yyMengtai.style.display = 'none';
                    this.refs.cancel.style.display = 'block';
                    this.refs.cancels.innerHTML = '已取消！'
                    setTimeout(() => {
                        this.refs.cancel.style.display = 'none';
                        window.history.go(0);
                    }, 2000)
                } else {
                    this.refs.yyMengtai.style.display = 'none';
                    this.refs.cancel.style.display = 'block';
                    this.refs.cancels.innerHTML = json.msg
                    setTimeout(() => {
                        this.refs.cancel.style.display = 'none';
                    }, 2000)
                }
            })

    }
    render() {
        let dataObj = this.state.datas;
        let items = [];
        if (dataObj == null || dataObj.length == 0) {
            items.push(
                <div className="order_item" key={0}>
                    <p style={{ textAlign: 'center', lineHeight: '160px' }}>还没有订单，赶快去购买课程吧！</p>
                </div>
            )
        } else {
            dataObj.map((d, i) => {
                if (d.Status == 0) {
                    items.push(
                        // <!-- 等待付款  -->
                        <div className="order_item wait_order">
                            <div className="order_item_header">
                                订单编号：<span>{d.OrderNUM}</span><span style={{ float: "right", marginRight: "20px" }}>{d.CreateTime}</span>
                            </div>
                            <div className="order_item_content">
                                <ul>
                                    <li>
                                        <p className="order_le_name">外教口语{d.Hours}课时</p>
                                        <p className="yuanjia">
                                            原价：<span>¥{d.AmountPayable}</span>
                                        </p>
                                    </li>
                                    <li>
                                        <p>实际支付：<span>¥{d.Prices}</span></p>
                                        <p className="yuanjia">
                                            优惠券抵现：<span>¥{d.Coupon == "" ? 0 : d.Coupon}</span>
                                        </p>
                                    </li>
                                    <li>
                                        <span className="wait_font">等待家长付款</span>
                                    </li>
                                    <li>
                                        <a target="_blank" href={`http://www.gogo-talk.com:9338/confirmOrderPay.html?&GoodsId=${d.GoodsId}&ClassHours=${d.Hours}&ExpireMou=${d.ExpDay}&GPrice=${d.Prices}&AmountPayable=${d.AmountPayable}&OrderNum=${d.OrderNUM}&GoodsName=${escape(d.GoodsName)}&coupon=${d.AmountPayable - d.Prices}&CouponId=${d.CouponId}&MyNum=${window.localStorage.getItem('Tonken')}`} className="pay_btn">
                                            去支付
                                        </a>
                                        <a href="javascript:;" ref="cancel" onClick={this.handleclick1.bind(this)} className="close_btn">
                                            取消订单
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="yy_mengtai" ref="yyMengtai">
                                <div className="yy" ref="yy">
                                    <h5 className="yyTitle">确定要取消这个订单吗？</h5>
                                    <input className="yyipt yyipts" type="button" ref="no" value="暂不取消" onClick={this.handleClickG.bind(this)} />
                                    <input className="yyipt" type="button" ref="ok" value="确定" onClick={this.handleclick.bind(this, d.OrderId)} />
                                    <span className="closeX" onClick={this.handleClickG.bind(this)}>&times;</span>
                                </div>
                            </div>
                            <div className="cancelmengtai" ref="cancel" id="cancel">
                                <div className="cancelPrompt" ref="cancelPrompt">
                                    <h5 ref='cancels'>已取消！</h5>
                                </div>
                            </div>
                        </div>
                    );
                }
                if (d.Status == 1) {
                    // <!-- 已支付  -->
                    items.push(
                        <div className="order_item yi_order">
                            <div className="order_item_header">
                                订单编号：<span>{d.OrderNUM}</span><span style={{ float: "right", marginRight: "20px" }}>{d.CreateTime}</span>
                            </div>
                            <div className="order_item_content">
                                <ul>
                                    <li>
                                        <p className="order_le_name">外教口语{d.Hours}课时</p>
                                        <p className="yuanjia">
                                            原价：<span>¥{d.AmountPayable}</span>
                                        </p>
                                    </li>
                                    <li>
                                        <p>实际支付：<span>¥{d.Prices}</span></p>
                                        <p className="yuanjia">
                                            优惠券抵现：<span>¥{d.Coupon == "" ? 0 : d.Coupon}</span>
                                        </p>
                                    </li>
                                    <li>
                                        <span className="order_grey">已支付</span>
                                    </li>
                                    <li>
                                        <span className="order_grey">--</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                }
                if (d.Status == 2) {
                    // <!-- 已取消  -->
                    items.push(
                        <div className="order_item guoqi_order">
                            <div className="order_item_header">
                                订单编号：<span>{d.OrderNUM}</span><span style={{ float: "right", marginRight: "20px" }}>{d.CreateTime}</span>
                            </div>
                            <div className="order_item_content">
                                <ul>
                                    <li>
                                        <p className="order_le_name">外教口语{d.Hours}课时</p>
                                        <p className="yuanjia">
                                            原价：<span>¥{d.AmountPayable}</span>
                                        </p>
                                    </li>
                                    <li>
                                        <p>实际支付：<span>¥{d.Prices}</span></p>
                                        <p className="yuanjia">
                                            优惠券抵现：<span>¥{d.Coupon == "" ? 0 : d.Coupon}</span>
                                        </p>
                                    </li>
                                    <li>
                                        <span className="order_grey">已取消</span>
                                    </li>
                                    <li>
                                        <span className="order_grey">--</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                }
                if (d.Status == 3) {
                    // <!-- 已过期  -->
                    items.push(
                        <div className="order_item close_order">
                            <div className="order_item_header">
                                订单编号：<span>{d.OrderNUM}</span><span style={{ float: "right", marginRight: "20px" }}>{d.CreateTime}</span>
                            </div>
                            <div className="order_item_content">
                                <ul>
                                    <li>
                                        <p className="order_le_name">外教口语{d.Hours}课时</p>
                                        <p className="yuanjia">
                                            原价：<span>¥{d.AmountPayable}</span>
                                        </p>
                                    </li>
                                    <li>
                                        <p>实际支付：<span>¥{d.Prices}</span></p>
                                        <p className="yuanjia">
                                            优惠券抵现：<span>¥{d.Coupon == "" ? 0 : d.Coupon}</span>
                                        </p>
                                    </li>
                                    <li>
                                        <span className="order_grey">已过期</span>
                                    </li>
                                    <li>
                                        <span className="order_grey">--</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                }

            })
        }
        let isPaginationShow = this.state.isPagination ? { display: 'flex' } : { display: 'none' };
        return (
            <div className="b_panel">
                <div className="order_header">
                    <h3 className="fl">
                        我的订单
                       </h3>
                    <ul className="order_dingdan_title">
                        <li>
                            金额
                            </li>
                        <li>
                            订单状态
                            </li>
                        <li>
                            操作
                            </li>
                    </ul>
                </div>
                <div className="order_item_box">
                    {items}
                </div>
                <div className="paginationBox" style={isPaginationShow}>
                    <Pagination current={this.state.current} onChange={this.onChange} total={this.state.total} />
                </div>
                <iframe src="http://http://www.gogo-talk.com:9338/auth.html" style={{display: 'none',height: '1px', width: '1px'}}></iframe>
            </div>
        )
    }
}
