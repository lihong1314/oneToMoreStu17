
import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';

export default class AllPanel extends Component {
    render() {
        return (
            <div className="g_all_panel">
                <div className="g_all_head">
                    {
                        this.props.head
                    }
                </div>
                <div className="g_all_body">
                    {
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}