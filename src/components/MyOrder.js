import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { Link, hashHistory } from 'react-router';
import { Spin, Switch, Alert } from 'antd';

export default class MyOrder extends React.Component {
    constructor() {
        super();

    }

    render() {
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
                    {/* <!-- 等待付款  --> */}
                        <div className="order_item wait_order">
                        <div className="order_item_header">
                            订单编号：<span>1144312341341</span>
                        </div>
                        <div className="order_item_content">
                            <ul>
                                <li>
                                    <p className="order_le_name">外教口语750课时</p>
                                    <p className="yuanjia">
                                        原价：<span>￥1200.00</span>
                                    </p>
                                </li>
                                <li>
                                    <p>实际支付：<span>￥1100.00</span></p>
                                    <p className="yuanjia">
                                        原价：<span>￥1200.00</span>
                                    </p>
                                </li>
                                <li>
                                    <span className="wait_font">等待家长付款</span>
                                </li>
                                <li>
                                    <a href="#" className="pay_btn">
                                        去支付
                                        </a>
                                    <a href="#" className="close_btn">
                                        取消订单
                                        </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <!-- 已支付  --> */}
                        <div className="order_item yi_order">
                        <div className="order_item_header">
                            订单编号：<span>1144312341341</span>
                        </div>
                        <div className="order_item_content">
                            <ul>
                                <li>
                                    <p className="order_le_name">外教口语750课时</p>
                                    <p className="yuanjia">
                                        原价：<span>￥1200.00</span>
                                    </p>
                                </li>
                                <li>
                                    <p>实际支付：<span>￥1100.00</span></p>
                                    <p className="yuanjia">
                                        优惠券低限：<span>￥1200.00</span>
                                    </p>
                                </li>
                                <li>
                                    <span>已支付</span>
                                </li>
                                <li>
                                    <span>--</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <!-- 已取消  --> */}
                        <div className="order_item guoqi_order">
                        <div className="order_item_header">
                            订单编号：<span>1144312341341</span>
                        </div>
                        <div className="order_item_content">
                            <ul>
                                <li>
                                    <p className="order_le_name">外教口语750课时</p>
                                    <p className="yuanjia">
                                        原价：<span>￥1200.00</span>
                                    </p>
                                </li>
                                <li>
                                    <p>实际支付：<span>￥1100.00</span></p>
                                    <p className="yuanjia">
                                        原价：<span>￥1200.00</span>
                                    </p>
                                </li>
                                <li>
                                    <span className="wait_font">等待家长付款</span>
                                </li>
                                <li>
                                    <a href="#" className="pay_btn">
                                        去支付
                                        </a>
                                    <a href="#" className="close_btn">
                                        取消订单
                                        </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <!-- 已过期  --> */}
                        <div className="order_item close_order">
                        <div className="order_item_header">
                            订单编号：<span>1144312341341</span>
                        </div>
                        <div className="order_item_content">
                            <ul>
                                <li>
                                    <p className="order_le_name">外教口语750课时</p>
                                    <p className="yuanjia">
                                        原价：<span>￥1200.00</span>
                                    </p>
                                </li>
                                <li>
                                    <p>实际支付：<span>￥1100.00</span></p>
                                    <p className="yuanjia">
                                        原价：<span>￥1200.00</span>
                                    </p>
                                </li>
                                <li>
                                    <span className="wait_font">等待家长付款</span>
                                </li>
                                <li>
                                    <a href="#" className="pay_btn">
                                        去支付
                                        </a>
                                    <a href="#" className="close_btn">
                                        取消订单
                                        </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
