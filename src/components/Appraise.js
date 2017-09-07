import React, { Component } from 'react';
import { Link } from 'react-router';
import { Rate } from 'antd';

export default class DeviceTesting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            value: 0,
            count: null,
            describe:'',
            imgUrl:'',
            teacherName:''
        }
    }

    closeClick(){    
       this.setState({
           isShow:false
       })
    }
    handleChange = (value) => {
        this.setState({ value });
    }
    render() {
        this.state.isShow = this.props.isjianBeiShow;
        let isShowz = this.state.isShow ? { display: 'block', height: document.documentElement.clientHeight + 'px' } : { display: 'none', height: document.documentElement.clientHeight + 'px' }
        const { value } = this.state;
        return (
            <div className="testTing" style={isShowz} >
                <div className="pingjiaBox">
                    <div className="teacherPhotoBox">
                        <div className="teacherPhoto">
                            <img src="" alt="" />
                        </div>
                        <p>Flower</p>
                    </div>
                    <span className='closeX' onClick={this.closeClick.bind(this)}>&times;</span>
                    <div className="starBox"><Rate defaultValue={0} style={{ color: "red" }} onChange={this.handleChange} value={value} /></div>
                    <textarea name="" id="" cols="30" rows="10" maxLength="100" placeholder="输入课后评价（100字以内）"></textarea>
                    <p>完成评价获得2积分</p>
                    <a href="javascript:;" className="susBtn" onClick={(e) => this.GradSubmit(e)}>完成</a>
                </div>
            </div >
        )
    }
}