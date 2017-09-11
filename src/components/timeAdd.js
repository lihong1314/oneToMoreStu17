import React, { Component } from 'react';
// 倒计时 for react
export default class Counter extends React.Component {
    // 定义属性
    static propTypes = {
        onStep: React.PropTypes.func,
        onComplete: React.PropTypes.func,
        value: React.PropTypes.number,
        step: React.PropTypes.number
    }


    //这里面的操作可以移动到componentWillMount()里面去
    constructor(...pa) {
        super(...pa);

        this.initValue = this.props.s;//秒
        this.initM = this.props.m;//分
        this.initH = this.props.h;//时
        this.state = { count: 0, mCount: 0, hCount:0 }
        this.interval = 0;
        this.step = this.props.step;
    }

    stop() {
        clearInterval(this.interval);
    }

    start() {
        this.stop();
        this.interval = setInterval(() => {
            var count = this.state.count + this.step;
            var countM = this.state.mCount;
            var countH = this.state.hCount;
            if (this.props.onStep) {
                this.props.onStep(count);
            }
            if (count >= 60) {
                countM = this.state.mCount + this.step;
                count = 0
                if (countM >= 60) {
                    countH = this.state.hCount + this.step;
                    countM = 0;
                    if (countH >= 25) {
                        this.props.onComplete && this.props.onComplete();
                        this.stop();
                    }
                }
            } //else {
            //     this.setState({ count:count,mCount: countM});
            // }
            this.setState({ count: count, mCount: countM , hCount: countH });

        }, 1000);
    }

    restart() {
        this.stop();
        this.setState({ count: this.initValue, mCount: this.initM, hCount: this.initH });
        this.start();
    }
    componentDidMount() {
        
        fetch(`http://learnapi.gogo-talk.com:8333/api/HomePage/GetSystemTime`,
        {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: window.localStorage.getItem('Tonken')
            }
        })
        .then(res => res.json())
        .then(json => {
            var now = new Date(json.data.SysDateTime.replace(/-/g,'/'));
            var nowH = now.getHours();
            var nowM = now.getMinutes();
            var nowS = now.getSeconds();
            this.setState({
                count: nowS, mCount: nowM, hCount: nowH
            })
            this.start();            
        })
    }
    componentWillUnmount() {
        this.stop();
    }

    render() {
        const {hCount , mCount , count} = this.state;
        return (<span>{hCount<10?'0'+hCount:hCount}:{mCount<10?'0'+mCount:mCount}:{count<10?'0'+count:count}</span>)
    }
}