import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import AllPanel from './AllPanel';

export default class PersonInfo extends Component {
    render() {
        return (
            <AllPanel head="个人基本信息">
                <div className="person_item">
                    <label htmlFor=""></label>
                </div>
            </AllPanel>
        )
    }
}