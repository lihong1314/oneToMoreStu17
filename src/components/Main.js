// require('normalize.css/normalize.css');
require('../styles/reast.css');
require('../styles/style.css');
require('../fonts/iconfont.css');
import React, { Component } from 'react';
import { Router, IndexRoute, Route, Redirect, hashHistory } from 'react-router';

import LoginMobile from './loginMobile';//登录框
import BackPwd from './BackPwd';//修改密码
import BackCode from './BackCode';//修改密码，手机号生成二维码
import BackPwdSuccess from './BackPwdSuccess';//修改密码成功
import Register from './register';//注册
import weCode from './weCode';//二维码登录与注册
import PwdLogin from './PwdLogin';//密码登录
import CodeLogin from './CodeLogin';//验证码登录，好像没用
import RegisterSuccess from './RegisterSuccess';//注册成功

import Index from './index';//上导航
import IndexMain from './indexMain';//首页
import CourseGrad from './CourseGrad';//学员定级

import LessonList from './MyLessonMain';//课表
import LessonUdone from './LessonUdone';//进入教室
import LessonCompleted from './LessonCompleted';
import DeviceTesting from './DeviceTesting';//设备检测
import OrderLesson from './OrderLesson';//约课
import StudyCenter from './StudyCenter';
import PersonCenter from './PersonCenter';
import OrderLessonDetail from './orderLessonDetail';
import PersonMyOrder from './personMyOrder';


import OrderModal from './Alert';
import OrderModalSuccess from './AlertSuccess';
import MyLessonTime from './MyLessonTime';
import MyOrder from './MyOrder';
import PersonInfo from './PersonInfo';
import MyJiFen from './MyjiFen';
import YouHuiJuan from './YouHuiJuan';
import PinJia from './dingdan';
import DingJi from './MianCopy';


class AppComponent extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={LoginMobile}>
            <IndexRoute component={weCode}></IndexRoute>
            <Route path="/Register" component={Register} />
            <Route path="/PwdLogin" component={PwdLogin} />
            <Route path="/CodeLogin" component={CodeLogin} /> 
            <Route path="/RegSuccess" component={RegisterSuccess} /> 
            <Route path="/BackPwd/:random" component={BackPwd} /> 
            <Route path="/BackCode" component={BackCode} /> 
            <Route path="/BackPwdSuccess" component={BackPwdSuccess} /> 
        </Route>
        <Route path="/Main" component={Index}>
          <IndexRoute component={IndexMain}></IndexRoute>
          <Route path="/Main/Person" component={PersonCenter} >
            <IndexRoute component={PersonInfo} />
            <Route path="/Main/Person/PersonInfo" component={PersonInfo} />
            <Route path="/Main/Person/MyLessonTime" component={MyLessonTime} />
            <Route path="/Main/Person/MyOrder" component={MyOrder} />
            <Route path="/Main/Person/Integrai" component={MyJiFen} />
            <Route path="/Main/Person/Discount" component={YouHuiJuan} />  
          </Route>
          <Route path="/Main/BuyLesson" component={OrderLesson} />
          <Route path="/Main/Index" component={StudyCenter}>
            <IndexRoute component={IndexMain} />
            <Route path="/Main/Index/Index" component={IndexMain} />
            <Route path="/Main/Index/YueLesson" component={OrderLesson} />
            <Route path="/Main/Index/LessonDetail/:id" component={OrderLessonDetail} />
            <Route path="/Main/Index/OrderAlert" component={OrderModal} />
            <Route path="/Main/Index/OrderAlertSuccess" component={OrderModalSuccess} />
            <Route path="/Main/Index/PinJia" component={PinJia} />
            <Route path="/Main/Index/LessonList" component={LessonList} >
                <IndexRoute component={LessonUdone}></IndexRoute>
                <Route path="/Main/Index/LessonList/Completed" component={LessonCompleted} />
                <Route path="/Main/Index/LessonList/Undone" component={LessonUdone} />
            </Route>
            <Route path="/Main/Index/Check" component={DeviceTesting} />
            <Route path="/Main/Index/CourseGrad" component={CourseGrad} />
          </ Route>
        </Route>
        
       
      </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

