import React, { Component } from 'react';
import { Link } from 'react-router';
import Panel from './Panel';
import Button from './Button';

export default class DeviceTesting extends Component {
    render() {
        let test1 = require('../images/icon_test1.png');
        let test2 = require('../images/icon_test2.png');
        return (
            <Panel border="orange">
                <p className="testTingTitle">设备检测</p>
                <div className="tesTingshibeiBox">
                    <ul>
                        <li style={{ marginRight: '56px' }}>
                            <div className="iconImgBlue">
                                <img src={test1} alt="" />
                            </div>
                            <Link to='/Main/Index/CheckZd' target="_blank">
                                <button className="test_btn test_btn_1">
                                    自动检测
                                </button>
                            </Link>

                        </li>
                        {/* <li>
                            <div className="iconImg" style={{paddingTop:'6px'}}>
                                <img src={test2} alt="" />
                            </div>
                            <a href={"/stuLessonRoom.html?&type=debug&r=1.4"} target="_blank">
                            <button className="test_btn test_btn_2">
                                人工检测
                           </button>
                           </a>
                        </li> */}
                    </ul>
                </div>
                
            </Panel>
        )
    }
}