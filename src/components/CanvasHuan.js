import React, { Component } from 'react';
// 倒计时 for react
export default class CanvasHuan extends React.Component {
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
        this.drawCricle = this.drawCricle.bind(this);
        
    }

    drawCricle(cObj,sum,du) {
        //画进度外环
        cObj.beginPath();
        cObj.fillStyle = '#fe6402';
        cObj.moveTo(50,50);
        cObj.arc(50,50,50,-90*Math.PI/180,(Math.ceil(du*(360/sum))-90)*Math.PI/180);
        cObj.strokeStyle = "#ccc";
        cObj.stroke();
        cObj.closePath();
        cObj.fill();

        //内环
        cObj.beginPath();
        cObj.moveTo(50,50);
        cObj.fillStyle = '#fff';
        cObj.arc(50,50,35,0,360*Math.PI/180);
        cObj.strokeStyle = "#ccc";
        cObj.stroke();
        cObj.closePath();
        cObj.fill();
    }

    start(obj,sum,process) {
        var num = 0;
        let that = this
        var t=setInterval(function(){
            if(num == process){
                that.drawCricle(obj,sum,num);
                clearInterval(t);
                return false;
            }
            num++;
            if(num == process){
                clearInterval(t);
            }
            that.drawCricle(obj,sum,num);
        },6)
    }
    componentDidMount() {
        
        fetch("http://learnapi.gogo-talk.com:8333/api/Lesson/GetClassHour",
        {
            method: "GET",
            headers: {
                'Authorization': window.localStorage.getItem('Tonken')
            }
        })
        .then(res => res.json())
        .then(json => {
            if (json.result == 1) {
                const newUser = json.data;
                var c = document.getElementById('process');
                var cObj = c.getContext('2d');
        
                cObj.beginPath();
                cObj.moveTo(50,50);
                cObj.fillStyle = '#ccc';
                cObj.arc(50,50,50,0,360*Math.PI/180);
                cObj.closePath();
                cObj.fill();
                
                this.start(cObj,parseInt(newUser.usedClasshour)+ parseInt(newUser.StudentTimeCount),newUser.StudentTimeCount); 
                
            }
        })
              
    }
    render() {
        return (<canvas id="process" width="120" height="120" ></canvas>)
    }
}