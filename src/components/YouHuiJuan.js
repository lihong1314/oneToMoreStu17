import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import Button from './Button';
import Panel from './panel';
import YouHuiJuanListNo from './YouHuiJuanListNo';
import YouHuiJuanListYes from './YouHuiJuanListYes';
import YouHuiJuanListNoUser from './YouHuiJuanListNoUser';

export default class youhuijuan extends Component {
    constructor() {
        super();
        this.state = {
            isNo: true,
            isYes: false,
            isGuoqi: false,
            noArr: [],
            yesArr: [],
            gouqiArr: [],
            expiredCount: 0,
            notUserCount: 0,
            useCount: 0
        }
    }
    noClick(val) {
        switch (val) {
            case 'no':
                fetch(`http://learnapi.gogo-talk.com:8333/api/GiveCouponIntegral/GetCouponListStudent?status=0`,//未使用
                    {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                            , 'Authorization': window.localStorage.getItem('Tonken')
                        }
                    })
                    .then(res => res.json())
                    .then(json => {
                        this.setState({
                            isNo: true,
                            isYes: false,
                            isGuoqi: false,
                            noArr: json.data
                        })
                    })
                break;
            case 'yes':
                fetch(`http://learnapi.gogo-talk.com:8333/api/GiveCouponIntegral/GetCouponListStudent?status=1`,//已使用
                    {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                            , 'Authorization': window.localStorage.getItem('Tonken')
                        }
                    })
                    .then(res => res.json())
                    .then(json => {
                        this.setState({
                            isNo: false,
                            isYes: true,
                            isGuoqi: false,
                            yesArr: json.data
                        })
                    })
                break;
            case 'noUser':
                fetch(`http://learnapi.gogo-talk.com:8333/api/GiveCouponIntegral/GetCouponListStudent?status=2`,//已过期
                    {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                            , 'Authorization': window.localStorage.getItem('Tonken')
                        }
                    })
                    .then(res => res.json())
                    .then(json => {
                        this.setState({
                            isNo: false,
                            isYes: false,
                            isGuoqi: true,
                            gouqiArr: json.data
                        })
                    })
                break;
        }
    }
    componentDidMount() {
        fetch(`http://learnapi.gogo-talk.com:8333/api/GiveCouponIntegral/GetCouponListStudent?status=0`,//未使用
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    , 'Authorization': window.localStorage.getItem('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isNo: true,
                    isYes: false,
                    isGuoqi: false,
                    expiredCount: json.ExpiredCount,
                    notUserCount: json.NotUserCount,
                    useCount: json.UseCount,
                    noArr: json.data
                })
            })
    }
    render() {
        let no = this.state.isNo ? <YouHuiJuanListNo data={this.state.noArr} /> : '';
        let noClass = this.state.isNo ? 'active' : '';
        let yes = this.state.isYes ? <YouHuiJuanListYes data={this.state.yesArr} /> : '';
        let yesClass = this.state.isYes ? 'active' : '';
        let guoqi = this.state.isGuoqi ? <YouHuiJuanListNoUser data={this.state.gouqiArr} /> : '';
        let guoqiClass = this.state.isGuoqi ? 'active' : '';
        return (

            <Panel border="orange">
                <div className="b_panel" style={{ paddingBottom: '0', borderBottom: '0px' }}>
                    <div className="b_m_time_head">
                        我的优惠劵
                    </div>
                </div>
                <div className="wlh_youhuijianBox">
                    <ul>
                        <li className={noClass} onClick={this.noClick.bind(this, 'no')}>未使用({this.state.notUserCount})</li>
                        <li className={yesClass} onClick={this.noClick.bind(this, 'yes')}>已使用({this.state.useCount})</li>
                        <li className={guoqiClass} onClick={this.noClick.bind(this, 'noUser')}>已过期({this.state.expiredCount})</li>
                    </ul>
                    <div className="youhui-conbox">
                        {no}
                        {yes}
                        {guoqi}
                    </div>
                </div>
            </Panel>
        )
    }
}